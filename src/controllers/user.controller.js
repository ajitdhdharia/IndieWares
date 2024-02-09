import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accesToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // add refresh token to user and save it to db
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accesToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating the refresh and access token"
    );
  }
};

// SignUp user
const signUp = asyncHandler(async (req, res, next) => {
  // get user details from the frontend
  const { username, email, firstname, lastname, password } = req.body;

  // validation - non empty - TODO separate validation file
  if (
    [username, email, firstname, lastname, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // check if user already exist - email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // create user object - create entry in db
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    firstname,
    lastname,
    password,
  });

  // remove password and refresh token field from created user
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // return res
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Is registerd succussfully"));
});

// Login user
const signIn = asyncHandler(async (req, res, next) => {
  // Get username and password
  const { username, password } = req.body;
  // Validate if username empty or not
  if (!username) {
    throw new ApiError(400, "Username is required");
  }

  // User exist or not
  const user = await User.findOne({ username: username.toLowerCase() }).select(
    "+password"
  ); // as we have 'select: false' in schema

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  // is password valid
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // generate access token and refresh token and save RT to db
  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // validate refresh token after access token expires
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  console.log("LoggedIn user", loggedInUser);

  // Sending cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User loggin in successfully"
      )
    );
});

// Logout user
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { signUp, signIn, logoutUser };

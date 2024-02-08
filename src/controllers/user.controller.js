import { asyncHandler } from "../utils/asyncHandler.js";

// SignUp user
const signUp = asyncHandler( async(req, res, next) => {
  res.status(200).json({
    message: "ok"
  })
});

export { signUp };

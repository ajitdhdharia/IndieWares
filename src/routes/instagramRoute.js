import express from "express";

const router = express.Router();

router.get("/auth", async (req, res) => {
  const code = req.query.code;
  if (code) {
    try {
      const response = await axios.post(
        `https://api.instagram.com/oauth/access_token`,
        {
          client_id: "YOUR_CLIENT_ID",
          client_secret: "YOUR_CLIENT_SECRET",
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:3000/auth",
          code: code,
        }
      );
      const accessToken = response.data.access_token;
      // Save the access token in the database or session
      res.redirect("/success"); // Redirect to a success page
    } catch (error) {
      res.send("Error during token exchange");
    }
  }
});

export default router;

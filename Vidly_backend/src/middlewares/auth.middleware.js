import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {

    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    //  console.log("Token Recieved", token);
      
    if (!token) {
      throw new ApiError(401, "Unauthorized request - Token missing");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
   // console.log("Decoded Token : ", decodedToken);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
  //  console.log("User Found", user);

    if (!user) {
      throw new ApiError(401, "Invalid Access Token - User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware Error: ", error.message);
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"

// extend the Request interface to include a user property
interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {

  // check if the Authorization header is present
  const authHeader = req.headers.authorization;

  // if the header is missing, return a 401 status code
  if (!authHeader) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  // split the header into an array and get the token
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    // if the token is valid, call the next middleware
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

import { body, validationResult } from "express-validator";
export const validateSignup = [
    body("firstName").trim().isLength({ min: 2 }).escape(),
    body("lastName").trim().isLength({ min: 2 }).escape(),
    body("email").isEmail().normalizeEmail(),
    body("phoneNumber").matches(/^\d{10,15}$/), // Example phone validation
   
];

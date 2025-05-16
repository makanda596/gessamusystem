import rateLimit from "express-rate-limit"

export const loginLimiter = rateLimit({
    windowMs:15*60*1000,
    limit:5,
    message:{
        success:false,
        message: "Too many login attempts. Please try again after 15 minutes."
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, 
})
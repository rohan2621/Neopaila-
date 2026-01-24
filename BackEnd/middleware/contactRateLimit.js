import rateLimit from "express-rate-limit";

export const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many messages. Try again later.",
});

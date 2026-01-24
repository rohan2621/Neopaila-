export const requireAdmin = (req, res, next) => {
  const role =
    req.auth?.sessionClaims?.metadata?.role ||
    req.auth?.sessionClaims?.publicMetadata?.role;

  if (role !== "admin") {
    return res.status(403).json({ error: "Admin access only" });
  }

  next();
};

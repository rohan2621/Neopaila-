import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const CLERK_FRONTEND_API = "fond-weasel-70";

const client = jwksClient({
  jwksUri: `https://${CLERK_FRONTEND_API}.clerk.accounts.dev/.well-known/jwks.json`,
  cache: true,
  rateLimit: true,
});

function getKey(header) {
  return new Promise((resolve, reject) => {
    client.getSigningKey(header.kid, (err, key) => {
      if (err) return reject(err);
      resolve(key.getPublicKey());
    });
  });
}

export const getUserIdFromToken = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(
        token,
        async (header, callback) => {
          try {
            const key = await getKey(header);
            callback(null, key);
          } catch (err) {
            callback(err);
          }
        },
        {
          algorithms: ["RS256"],
          issuer: `https://${CLERK_FRONTEND_API}.clerk.accounts.dev`,
        },
        (err, decoded) => {
          if (err) return reject(err);
          resolve(decoded);
        }
      );
    });

    return decoded.sub; // Clerk user ID
  } catch (err) {
    console.error("Token verification error:", err.message);
    return null;
  }
};

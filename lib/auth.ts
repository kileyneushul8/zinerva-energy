import { SignJWT, jwtVerify } from "jose"

// Use environment variables for secrets
const secretKey = process.env.JWT_SECRET_KEY || "your-fallback-secret-key"
const key = new TextEncoder().encode(secretKey)

export async function createToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, key)
    return payload
  } catch (error) {
    return null
  }
}


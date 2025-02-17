import { SignJWT, jwtVerify } from "jose"

// Use a hardcoded secret key (not recommended for production)
const secretKey = "your-secret-key-here"

// Convert secret to Uint8Array as required by jose
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


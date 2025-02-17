let SignJWT: any;
let jwtVerify: any;

// Dynamic import of jose
if (typeof window === 'undefined') {
  const jose = require('jose');
  SignJWT = jose.SignJWT;
  jwtVerify = jose.jwtVerify;
} else {
  import('jose').then((jose) => {
    SignJWT = jose.SignJWT;
    jwtVerify = jose.jwtVerify;
  });
}

// Use environment variables for secrets
const secretKey = process.env.JWT_SECRET_KEY || "your-fallback-secret-key"
const key = new TextEncoder().encode(secretKey)

export async function createToken(payload: any) {
  if (!SignJWT) {
    const jose = await import('jose');
    SignJWT = jose.SignJWT;
  }
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key)
}

export async function verifyToken(token: string) {
  try {
    if (!jwtVerify) {
      const jose = await import('jose');
      jwtVerify = jose.jwtVerify;
    }
    const { payload } = await jwtVerify(token, key)
    return payload
  } catch (error) {
    return null
  }
}


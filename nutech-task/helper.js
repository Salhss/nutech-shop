import * as jose from "jose";
const key = new TextEncoder().encode(
  "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
);

export async function generateToken(payload) {
  const alg = "HS256";

  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .sign(key);

  return jwt;
}

export async function verifyToken(token) {
  const { payload } = await jose.jwtVerify(token, key);
  return payload;
}

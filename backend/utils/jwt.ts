import jwt from "jsonwebtoken";
import config from "config";
import { DocumentType } from "@typegoose/typegoose";

type privateKeyNames = "accessTokenPrivateKey" | "refreshTokenPrivateKey";
type publicKeyNames = "accessTokenPublicKey" | "refreshTokenPublicKey";

export function signJwt(
  object: Object,
  keyName: privateKeyNames,
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt<T>(
  token: string,
  keyName: publicKeyNames
): DocumentType<T> | null {
  const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii"
  );

  try {
    const decoded = jwt.verify(token, publicKey) as DocumentType<T>;
    return decoded;
  } catch (error) {
    return null;
  }
}

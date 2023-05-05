export interface IDecodedGoogleToken {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string; // image url
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

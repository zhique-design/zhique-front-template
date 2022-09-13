import Cookies, { CookieGetOptions } from "universal-cookie";
import { parse } from "qs";

export const ACCESS_TOKEN = "access_token";
const cookies = new Cookies();

export function getAccessToken() {
  const privateRouter = window.location.pathname.startsWith("/console");
  const privateToken = parse(window.location.search) || {};
  return privateRouter
    ? privateToken.access_token
    : cookies.get(ACCESS_TOKEN, {
        path: "/",
      } as CookieGetOptions);
}

export function setAccessToken(token) {
  cookies.set(ACCESS_TOKEN, token, {
    path: "/",
  });
}

export function removeAccessToken() {
  cookies.remove(ACCESS_TOKEN, {
    path: "/",
  });
}

export function extractAccessTokenFromHash(hash) {
  if (hash) {
    const ai = hash.indexOf(ACCESS_TOKEN);
    if (ai !== -1) {
      const accessTokenReg = /#?access_token=[0-9a-zA-Z-]*/g;
      hash.match(accessTokenReg);
      const centerReg = hash.match(accessTokenReg)[0];
      return centerReg.split("=")[1];
    }
  }
  return null;
}

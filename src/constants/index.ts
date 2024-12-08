export const DEFAULT_NAME = 'Blog Management';
export enum errorCodeEnum {
  BAD_REQUEST = 40000,
  SYSTEMERROR = 50000,
  UNAUTHORIZED = 40100,
}
export const codeMessage: Record<errorCodeEnum, string> = {
  [errorCodeEnum.BAD_REQUEST]: 'Bad Request',
  [errorCodeEnum.SYSTEMERROR]: 'System Error',
  [errorCodeEnum.UNAUTHORIZED]: 'Unauthorized',
};
export const BlogSite = 'http://a1ex.vip';
export function getCodeMessage(code: errorCodeEnum) {
  return codeMessage[code];
}

export const ACCESS_TOEKN = 'accessToken';

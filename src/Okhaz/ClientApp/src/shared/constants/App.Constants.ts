export const GlobalConstant = {
  accessTokenTime: "accessTokenTime",
  accessToken: "accessToken",
  loginRoute: "validatelogin",
};

export enum HttpStatusCodes {
  NotFound = 404,
}

export enum AppDateFormatt {
  IST = "dd-MM-yyyy",
  EST = "MM-dd-yyyy",
}
export enum StorageKey {
  UserRole = "UserRole",
  UserMenu = "UserMenu",
  UserId = "UserId",
  LoginUserEmailId = "LoginUserEmailId",
  UserName = "UserName",
  IsRootUser = "IsRootUser",
  GeneralSettings = "GeneralSettings",
}
export const emailregex: RegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const SkipLoaderInterceptor = [];

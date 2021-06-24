import Auth0, { WebAuth, Auth0DecodedHash } from "auth0-js";
import emailPattern from "../../utils/RegEx/email";

export enum EConnections {
  standard = "Username-Password-Authentication",
  facebook = "facebook",
  google = "google-oauth2",
}

export interface DbSignUpOptions {
  /** user email address */
  email?: string;
  /** user password */
  password?: string;
  /** name of the connection where the user will be created */
  connection: string;
  /** User desired username. Required if you use a database connection and you have enabled `Requires Username` */
  username?: string;
  scope?: string;
  /** additional signup attributes used for creating the user. Will be stored in `user_metadata` */
  userMetadata?: any;
}

class Authentication {
  public userIsAuthenticated = false;
  private domain = "dev-2ge-us3w.auth0.com";
  private clientID = "hErQgpcGudWRQgkWpSeA8hrZahkht5i4";
  private WebAuth: Auth0.WebAuth | null = null;
  static instance: Authentication;

  public constructor() {
    if (!Authentication.instance) Authentication.instance = this;
    return Authentication.instance;
  }

  public get tokenInfo(): Auth0DecodedHash {
    if (process.browser) {
      const tokenInfo: Auth0DecodedHash = JSON.parse(
        window.localStorage.getItem("auth0")
      );
      return tokenInfo;
    }
  }

  public intializeClient = () => {
    this.WebAuth = new Auth0.WebAuth({
      domain: this.domain,
      clientID: this.clientID,
      responseType: "token id_token",
      responseMode: "fragment",
    });
    return this;
  };

  public signUp = (options: DbSignUpOptions, callback) => {
    switch (options.connection) {
      case EConnections.facebook:
      case EConnections.google:
        this.WebAuth.authorize(options);
        break;
      case EConnections.standard:
      default:
        if (options.email && options.password) {
          //@ts-ignore
          this.WebAuth.signup(options, callback);
        }
        break;
    }
  };

  public signUpAndLogin = (options: Auth0.DbSignUpOptions, cb) => {
    this.WebAuth.signupAndAuthorize({ ...options }, cb);
  };

  public standardLogin = (options: Auth0.LoginOptions, cb) => {
    this.WebAuth.login(
      {
        ...options,
        realm: "Username-Password-Authentication",
        redirectUri: window.location.origin,
      },
      cb
    );
  };

  public socialLogin = (options: Auth0.AuthorizeOptions) => {
    this.WebAuth.authorize(
      options,
    )
  }

  public logout = (options: Auth0.LogoutOptions, cb) => {
    console.log("logging out");
    this.deleteToken();
    this.WebAuth.logout({ ...options, clientID: this.clientID });
  };

  public changePassword = (
    options: Omit<Auth0.ChangePasswordOptions, "connection">,
    cb
  ) => {
    this.WebAuth.changePassword(
      { ...options, connection: "Username-Password-Authentication" },
      cb
    );
  };

  private storeToken = (itemValue: Auth0DecodedHash) => {
    window.localStorage.setItem("auth0", JSON.stringify(itemValue));
    document.cookie = `auth0=${JSON.stringify(itemValue)}`;
  };

  public checkForAuthResult = async () => {
    console.log("checkForAuthResult");
    return await new Promise((resolve, reject) => {
      if (!Authentication.instance.userIsAuthenticated) {
        const decodeCallback = (error, decodedHash) => {
          console.log(
            "CHECK FOR AUTH IN URL FRAGMENT '#' ",
            error,
            decodedHash
          );
          if (!error && decodedHash) {
            Authentication.instance.storeToken(decodedHash);
            resolve(decodedHash);
          } else {
            reject(error);
          }
        };
        Authentication.instance.WebAuth.parseHash(decodeCallback);
      }
    }).catch((error) => console.error(error));
  };

  public checkAuthStatus = async () => {
    console.log("checkAuthStatus");
    const accessToken = Authentication.instance?.tokenInfo?.accessToken;
    if (accessToken) {
      return await new Promise((resolve, reject) => {
        const setUserStatus = (error, profile) => {
          console.log({ profile, error });
          if (error) reject(error);
          if (profile) {
            console.log("the user instance value should be true");
            Authentication.instance.userIsAuthenticated = true;
            console.log("right", Authentication.instance.userIsAuthenticated);
            resolve(profile);
          }
        };
        Authentication.instance.WebAuth.client.userInfo(
          accessToken,
          setUserStatus
        );
      }).catch((error) => {
        console.log(error);
        Authentication.instance.deleteToken();
      });
    } else {
      Authentication.instance.deleteToken();
    }
  };

  private deleteToken = () => {
    window.localStorage.removeItem("auth0");
  };
}

const instance = new Authentication();
export default instance;

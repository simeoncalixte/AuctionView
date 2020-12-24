import Auth0, { WebAuth, Auth0DecodedHash } from "auth0-js";

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

	public signup = (
		options: Omit<Auth0.DbSignUpOptions, "connection">,
		callback
	) => {
		console.log("attempting signup");
		this.WebAuth.signup(
			{ connection: "Username-Password-Authentication", ...options },
			callback
		);
	};

	public signupAndLogin = (
		options: Omit<Auth0.DbSignUpOptions, "connection">,
		cb
	) => {
		console.log("attempting signup");
		this.WebAuth.signupAndAuthorize(
			{ connection: "Username-Password-Authentication", ...options },
			cb
		);
	};

	public login = (options: Auth0.LoginOptions, cb) => {
		console.log("attempting login");
		this.WebAuth.login(
			{
				...options,
				realm: "Username-Password-Authentication",
				redirectUri: window.location.origin,
			},
			cb
		);
	};

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

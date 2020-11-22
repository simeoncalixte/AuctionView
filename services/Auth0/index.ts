import Auth0 from "auth0-js";

class Authentication {
	private domain = "dev-2ge-us3w.auth0.com";
	private clientID = "hErQgpcGudWRQgkWpSeA8hrZahkht5i4";
	private client: Auth0.WebAuth | null = null;
	static instance;

	constructor() {
		if (!Authentication.instance) {
			Authentication.instance = this;
			console.log(process);
			this.client = new Auth0.WebAuth({
				domain: this.domain,
				clientID: this.clientID,
				responseType: "token id_token",
			});
		}
		return Authentication.instance;
	}

	signup(options: Omit<Auth0.DbSignUpOptions, "connection">, callback) {
		console.log("attempting signup");
		this.client.signup(
			{ connection: "Username-Password-Authentication", ...options },
			callback
		);
	}

	signupAndLogin(options: Omit<Auth0.DbSignUpOptions, "connection">, cb) {
		console.log("attempting signup");
		this.client.signupAndAuthorize(
			{ connection: "Username-Password-Authentication", ...options },
			cb
		);
	}

	login(options: Auth0.LoginOptions, cb) {
		console.log("attempting login");
		this.client.login(
			{ ...options, realm: "Username-Password-Authentication" },
			cb
		);
	}

	logout(options: Auth0.LogoutOptions, cb) {
		this.client.logout(options);
	}

	changePassword(options: Omit<Auth0.ChangePasswordOptions, "connection">, cb) {
		this.client.changePassword(
			{ ...options, connection: "Username-Password-Authentication" },
			cb
		);
	}
}

const instance = new Authentication();
Object.freeze(instance);
export default instance;

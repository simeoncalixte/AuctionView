import React from "react";
import AuthContext from "../../Context/Authentication";
import authentication from "../../services/Auth0";

const AuthProvider = AuthContext.Provider;

const withAuth0 = (WrappedComponent) => {
	return (props) => {
		const [isLoaded, setLoadedState] = React.useState(false);
		const [userProfile, setUserProfile] = React.useState(null);

		const initialize = () => {
			if (!isLoaded) {
				authentication
					.intializeClient()
					.checkForAuthResult()
					.then(authentication.checkAuthStatus)
					.then((results) => {
						console.log("completed");
						setLoadedState(true);
						setUserProfile(results);
					});
			}
		};

		React.useEffect(initialize);

		return (
			<AuthProvider value={{ ...authentication, isLoaded, userProfile }}>
				<WrappedComponent {...props} />
			</AuthProvider>
		);
	};
};

export default withAuth0;

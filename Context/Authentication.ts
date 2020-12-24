import React from "react";
import Authentication from "../services/Auth0";

const initialValue = {
	isLoaded: false,
	userProfile: null,
};
const AuthContext = React.createContext({ ...initialValue, ...Authentication });

export default AuthContext;

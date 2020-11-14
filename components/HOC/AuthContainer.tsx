import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

const withAuth0 = (WrappedComponent) => {
  return (props) => {
    return (
      <Auth0Provider
        domain="dev-2ge-us3w.auth0.com"
        clientId="66K4TwQjYIbB9qhAADoEe1huKbPFQdUF"
      >
        <WrappedComponent {...props} />
      </Auth0Provider>
    );
  };
};

export default withAuth0;

import React from "react";
import withModal, { ModalContext } from "../../Modal";
import styled from "styled-components";
import { Button, InputText } from "../FormElements";
import * as utils from "../utils";
import { TFieldValidation, TValidationRules } from "../module.d";
import Auth0, {DbSignUpOptions, EConnections} from "../../../services/Auth0";
import StyledForm from "../FormElements/StyledForms";
import AuthContext from "../../../Context/Authentication";

const ValidationPattern: TFieldValidation = {
  username: {
    required: true,
  },
  password: {
    required: true,
  },
};

const SubmitSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ForgotPasswordLink = styled.a`
  text-align: right;
  cursor: pointer;
  color: #1877f2;
`;
const CloseButton = styled.div`
  padding: 11px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  width: max-content;
  left: 98%;
`;

const LoginForm = (props) => {
  const modalContext = React.useContext(ModalContext);
  const authentication = React.useContext(AuthContext);
  const errorState = React.useState<TFieldValidation>({});
  const [formErrors, setErrors] = errorState;

  const errorChecking = (e: React.FormEvent<HTMLFormElement>) =>
    utils.checkForErrors(e, errorState, ValidationPattern);

  const attemptLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const connectionType = e.target.value ? e.target.value : "standard";
    const connection = EConnections[connectionType];
    const isSocialLogin =   [EConnections.facebook, EConnections.google].includes(connection)

    if(!isSocialLogin){
      const {
        username,
        password,
      } = utils.parseFormValues(e.target)  as {username : string, password : string};

      authentication.standardLogin(
        {
          username,
          password,
        },()=>{}
      )
    }else{
      authentication.socialLogin({
        connection,
        redirectUri: window.location.origin,
      });
    }
  };

  const displayChangePasswordForm = () => {};

  return (
    <StyledForm
      onChange={errorChecking}
      onBlurCapture={errorChecking}
    >
      <CloseButton onClick={modalContext.toggle}>X</CloseButton>
      <InputText.withLabel
        label={"Username"}
        name={"username"}
        labelPosition={"top"}
        error={formErrors?.username}
      />
      <InputText.withLabel
        label={"Password"}
        name={"password"}
        error={formErrors?.password}
      />
      <ForgotPasswordLink onClick={displayChangePasswordForm}>
        Forgot Password?
      </ForgotPasswordLink>
      <SubmitSection onClickCapture={attemptLogin}>
        <Button.DefaultButton textColor={"facebook"} value={"standard"}>
          Log In
        </Button.DefaultButton>
        <Button.GoogleButton text={"Login with"} value={"google"} />
        <Button.FacebookButton text={"Login with"} value={"facebook"} />
      </SubmitSection>
    </StyledForm>
  );
};

export default LoginForm;

import React from "react";
import { ModalContext } from "../../Modal";
import styled from "styled-components";
import { Button, InputText } from "../FormElements";
import HairTag from "../../Paginator/Misc/CentralHairTag";
import * as utils from "../utils";
import PasswordValdation from "../molecules/PasswordValidationDisplay";
import { TFieldValidation, EPasswordPatternName } from "../module.d";
import emailPattern from "../../../utils/RegEx/email";
import Form from "../FormElements/StyledForms";
import Authentication, { EConnections } from "../../../services/Auth0";
import ColorPallet from "../../../utils/ColorPallet";
import AnimatableCheckMark from "../../SVG/curvedCheckMark";

const SubmitSection = styled.section`
  margin: 25px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-column: span 5;
`;
const SuccessContainer = styled.div`
  position: absolute;
  text-align: center;
  width: 50vw;
  min-height: 100px;
  background: #0f409a;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  transform: rotateZ(360deg) scale(0);
  transition: all 0.5s ease;
  &[data-success="true"] {
    transform: rotateZ(0deg) scale(1);
  }
`;
const ForgotPasswordLink = styled.a``;
const CloseButton = styled.div`
  margin-bottom: 25px;
  cursor: pointer;
  grid-column: span 4;
  justify-content: inherit;
  display: grid;
  justify-items: end;
`;
const StyledHairTag = styled(HairTag)`
  grid-column: 1/5;
`;
const GridChild = styled.div<{ gridColumn: string }>`
  grid-column: ${(props) => props.gridColumn};
`;
const StyledForm = styled(Form)`
  position: absolute;
  transform: rotateZ(0deg) scale(1);
  &[data-in-progress="false"] {
    transform: rotateZ(360deg) scale(0);
  }
  transition: all 1s ease;
`;
const SignUpFinalError = styled.span``;

const validationPattern: TFieldValidation = {
  firstName: {
    required: true,
  },
  lastName: {
    required: true,
  },
  email: {
    required: true,
    mustMatchPattern: {
      emailPattern: {
        pattern: emailPattern,
        errorLabel: "please enter a valid email address",
      },
    },
  },
  username: {
    required: true,
  },
  password: {
    required: true,
    mustMatchPattern: {
      [EPasswordPatternName.containsUpperCaseChar]: {
        pattern: /[A-Z]/g,
      },
      [EPasswordPatternName.contains8Chars]: {
        pattern: /.{8,}/g,
      },
      [EPasswordPatternName.containsNumeric]: {
        pattern: /[0-9]/g,
      },
      [EPasswordPatternName.containsLowerCaseChar]: {
        pattern: /[a-z]/g,
      },
      [EPasswordPatternName.antiRepetition]: {
        pattern: /(.)\1{1,}/g,
      },
    },
  },
  confirmPassword: {
    required: true,
    mustMatchSibling: "input[name='password']",
  },
  tel: {
    required: true,
    mustMatchPattern: {
      validPhoneNumber: {
        pattern: /\d{7}/,
        errorLabel: "please enter a valid phone number",
      },
    },
  },
  address: {
    required: true,
  },
  postalCode: {
    required: true,
  },
  city: {
    required: true,
  },
  state: {
    required: true,
  },
};

interface ISignUpOptions {
  email: string;
  password: string;
  username: string;
}

const SignUp = (props) => {
  const modalContext = React.useContext(ModalContext);
  const errorState = React.useState<TFieldValidation>({});
  const [formErrors, setFormErrors] = errorState;
  const [isFormCompleted, setFormCompletionState] = React.useState(false);
  const [successAnimationEnded, setAnimationEnd] = React.useState(false);
  const formReference = React.useRef<HTMLFormElement>();
  const formIsValid = !!Object.keys(formErrors).length;

  const attemptRegistration = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const connectionType = e.target.value ? e.target.value : "standard";
    debugger;
    const connection = EConnections[connectionType];
    let values = { connection, redirectUri: location.href };

    //// if this is a standard login attempt using username + password
    ///  assign the properties into @param values.
    if (connection === EConnections.standard) {
      const {
        email,
        username,
        password,
        ...userMetadata
      } = utils.parseFormValues(e.target) as ISignUpOptions;

      values = Object.assign(values, email, username, password, userMetadata);
    }
    ///then attempt to make the call to the id provider
    Authentication.signUp(values, (error) => {
      debugger;
      if (error) {
        setFormErrors({ ...formErrors, serverErrors: error });
      } else {
        setFormCompletionState(true);
      }
    });
  };

  const errorChecking = (e: React.FormEvent<HTMLFormElement>) =>
    utils.checkForErrors(e, errorState, validationPattern, formReference);

  return (
    <>
      <SuccessContainer
        data-success={isFormCompleted}
        onTransitionEnd={() => setAnimationEnd(!successAnimationEnded)}
      >
        <p>Congratulation, you have successfully registered.</p>
        <AnimatableCheckMark isActive={successAnimationEnded} width={"200px"} />
        <p>Last Step! Verify your email address.</p>
      </SuccessContainer>
      <StyledForm
        onSubmit={attemptRegistration}
        onChange={errorChecking}
        onBlurCapture={errorChecking}
        ref={formReference}
        encType={"multipart/form-data"}
        data-in-progress={!isFormCompleted}
      >
        <CloseButton onClick={modalContext.toggle}>X</CloseButton>
        <StyledHairTag>Personal Info</StyledHairTag>

        <InputText.withLabel
          label={"First Name"}
          name={"firstName"}
          gridColumns={"1/3"}
          error={formErrors.firstName}
        />

        <InputText.withLabel
          label={"Last Name"}
          name={"lastName"}
          gridColumns={"3/5"}
          error={formErrors.lastName}
        />
        <InputText.withLabel
          label={"Phone Number"}
          name={"tel"}
          gridColumns={"1/3"}
          type={"tel"}
          error={formErrors.tel}
        />
        <InputText.withLabel
          label={"Mailing Address"}
          name={"address"}
          gridColumns={"1/4"}
          error={formErrors?.address}
        />
        <InputText.withLabel
          label={"Postal Code"}
          name={"postalCode"}
          gridColumns={"1/2"}
          error={formErrors?.postalCode}
        />
        <InputText.withLabel
          label={"City"}
          name={"city"}
          gridColumns={"2/4"}
          error={formErrors?.city}
        />
        <InputText.withLabel
          label={"State"}
          name={"state"}
          gridColumns={"1/4"}
          error={formErrors?.state}
        />

        <StyledHairTag>Account Info</StyledHairTag>

        <InputText.withLabel
          label={"Username"}
          name={"username"}
          gridColumns={"span 3"}
          type={"text"}
          error={formErrors?.username}
        />
        <InputText.withLabel
          label={"Email"}
          name={"email"}
          gridColumns={"span 3"}
          type={"email"}
          error={formErrors?.email}
        />
        <InputText.withLabel
          label={"Password"}
          name={"password"}
          gridColumns={"1/3"}
          type={"password"}
          error={formErrors?.password}
        />
        <PasswordValdation {...formErrors?.password} />
        <InputText.withLabel
          label={"Password Confirmation"}
          name={"confirmPassword"}
          gridColumns={"1/3"}
          type={"password"}
          error={formErrors?.confirmPassword}
        />
        <GridChild gridColumn="1/5">
          {formErrors?.serverErrors ? (
            <SignUpFinalError>
              Invalid Sign up attempt. Please check your inputs. Common issues
              included: existing email in our database, existing username,
              disqualifying passwords. If you continue to have issues please
              contact customer support.
            </SignUpFinalError>
          ) : null}
        </GridChild>

        <SubmitSection onClickCapture={attemptRegistration}>
          <Button.DefaultButton value="standard">
            Sign Up With Us
          </Button.DefaultButton>
          <Button.FacebookButton value="facebook" text={"Sign up with"} />
          <Button.GoogleButton value="google" text={"Sign up with"} />
        </SubmitSection>
      </StyledForm>
    </>
  );
};

export default SignUp;

import React from "react";
import withModal, {ModalContext}  from "../Modal";
import styled from "styled-components";
import {Button,InputText} from "../FormElements"




const Form = styled.form`
    width: 70%;
    min-height: 20px;
    background: black;
    margin:20px;
    width: 100%;
    min-height: 20px;
    background: #FFFFFFE3;
    margin: 20px;
    padding: 20px;
    max-width: 400px;
    border-radius: 8px;
    box-shadow: 1px 1px 1px #fff;
    border: 2px solid #f9f9f97a;
    min-height: 20px;
    background: black;
    margin: 20px;
    width: 100%;
    min-height: 20px;
    background: #FFFFFFE3;
    margin: 20px;
    padding: 20px;
    max-width: 400px;
    border-radius: 2px;
    color: #414344;
    @media screen and (max-width: 400px){
        width: 100%;
    }
`; 

const StyledInput = styled(InputText.withLabel)`
    background-color: #FFFFFFF2;
    border-radius: 15px;
    border-style: solid;
    border-color: #E3DCDC;
    border-width: 2px;
    padding: 5px 0px;
    margin: 10px 0px;
    width: 100%;
    padding-left: 15px;
    letter-spacing: 1px;
    box-sizing: border-box;
    font-size: 16px;
`; 
const StyledButton = styled(Button.default)`
    margin: 5px 0px;
    width: 300px;
`; 
const SubmitSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`; 
const ForgotPasswordLink = styled.a``;
const CloseButton = styled.div`
    padding: 11px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    width: max-content;
    left: 98%;
`;


const LoginForm = (props ) => {
    const modalContext = React.useContext(ModalContext);
    console.log(modalContext)

    console.log(props)
    const logIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const username= (e.target.username.value);
        const password= (e.target.password.value);
    }

    const resetPassword = ( ) => {

    }

    return (
        <Form 
            onSubmit={logIn} 
            onChange={
                    (e)=>{
                        e.preventDefault();
                        console.log(e)
                    }
            }
        >
            <CloseButton onClick={modalContext.toggle}>X</CloseButton>
            <StyledInput label={"Username"} name={"username"} />
            <StyledInput label={"Password"} name={"password"}/>
            <ForgotPasswordLink 
                onClick={(e)=> console.log(e)}
            >
                Forgot Password?
            </ForgotPasswordLink>
            <SubmitSection>
                <StyledButton>
                    Log In
                </StyledButton>
                <StyledButton children={"Log In With Google"}/>
              
            </SubmitSection>
        </Form>
    )
}


export default LoginForm;
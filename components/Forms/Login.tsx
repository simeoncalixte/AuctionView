import React from "react";
import withModal  from "../Modal/defaultModal";
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
    box-shadow: 1px 1px 5px #fff;
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
    @media screen and (max-width: 400px){
        width: 100%;
    }
`; 

const StyledInput = styled(InputText.withLabel)`
    background-color: #FFFEEDF2;
    border-radius: 20px;
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

`; 
const SubmitSection = styled.section`
    display: flex;
    justify-content: center;

`; 
const ForgotPasswordLink = styled.a`

`;


const LoginForm = (props ) => {
    
    const logIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const username= (e.target.username.value);
        const passwaord= (e.target.password.value);
    }
    const restPassword = ( ) => {

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
            <StyledInput label={"Username"} name={"username"}/>
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

export default withModal(LoginForm);
import React from "react";
import {Wrapper2} from "../components/HOC/DefaultPageProps";
import DefaultInput from "../components/FormElements/DefaultInput";
import styled from "styled-components";
import DefaultButton from "../components/FormElements/DefaultButton";
import colorPallet from "../utils/ColorPallet";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 100%;
`;

const SearchBar = styled(DefaultInput)`
    max-width: 800px;
    min-width: 60%;
    font-size: 16px;
    padding: 10px;
    padding-left: 20px;
    text-align: center;
    font-weight: 400;
    
`;

const SearchButton = styled(DefaultButton)`
   display: inline-block; 

   
`;


const ButtonContainer = styled.section`
    margin: 20px 0px;
`;

const Header = styled.h1`
    font-size: 30px;
`;


const HomePage = (props) =>  {
   const background = `linear-gradient(0deg, #051713b8 0%, transparent),linear-gradient(62deg,#29685b 24%,#2a685b 49%, #29685b)`;
   return ( 
        <Container>
            <Header>Search the Auction</Header>
            <SearchBar name={"search"}/>
            <ButtonContainer>
                <SearchButton   
                    backgroundColor={background} 
                    children={"Search Auction"} size={"XL"}
                    borderColor={colorPallet.burnham}
                />
                <SearchButton 
                    children={"Go To Dashboard"} 
                    size={"XL"}
                    backgroundColor={background} 
                    borderColor={colorPallet.burnham}
                />
            </ButtonContainer>
        </Container>
    )
};

export default Wrapper2(HomePage);
;

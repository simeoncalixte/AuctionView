import React, {ReactNode, FunctionComponent} from "react";
import defaultStyles from "../components/HOC/DefaultPageProps";
import DefaultInput from "../components/FormElements/DefaultInput";
import styled from "styled-components";
import DefaultButton from "../components/FormElements/DefaultButton";
import {GetStaticProps} from "next";
import {Inventory} from "../services";
import fetch from "node-fetch";
import {getData} from "../utils/NetworkRequest"

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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


const InventoryItem = styled.div`
    margin: 10px;
    background-color: #ffffffd6;
    min-width: 250px;
    border-radius: 2px;
    overflow: hidden;
    flex-basis: 20%;
`;

const InventoryContainer = styled.div`
    width: 100%;
    display: flex;
    flex-flow: wrap;
    justify-content: center;
`;
const Image = styled.img`
    display: block;
    width: 100%;
    
`;

const CardHeading = styled.span`
    display: block;
    padding: 3px 5px;
`;

const HomePage = (props) =>  {
   const background = `linear-gradient(0deg, #051713b8 0%, transparent),linear-gradient(62deg,#29685b 24%,#2a685b 49%, #29685b)`;
   console.log(props)
   return ( 
        <Container>
            <InventoryContainer>
                {
                    props.data.map((item)=>{
                        return (
                            <InventoryItem>
                                <CardHeading>{`${item.Year} ${item.Make} ${item["Model Group"]}`}</CardHeading> 
                                <Image src={`//${item["Image Thumbnail"]}`}/>
                            </InventoryItem>
                        )
                    })
                }
            </InventoryContainer>
        </Container>
    )
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
      let InventoryList
      await getData(Inventory+"/Inventory",{})
        .then(res => InventoryList = res.Inventory)
        .catch(err=> console.error(err))

      // By returning { props: item }, the StaticPropsDetail component
      // will receive `item` as a prop at build time
      return { props: { ...InventoryList } }
    } catch (err) {
      return { props: { errors: err.message } }
    }
}

export default defaultStyles(HomePage);


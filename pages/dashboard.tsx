import React, {ReactNode, FunctionComponent} from "react";
import defaultStyles from "../components/HOC/DefaultPageProps";
import DefaultInput from "../components/FormElements/DefaultInput";
import Card from "../components/InventoryUI/Cards";
import styled from "styled-components";
import DefaultButton from "../components/FormElements/DefaultButton";
import {GetServerSideProps,GetStaticProps} from "next";
import Pagination from "../components/Paginator";
import Filter from "../components/Filters";
import {DevelopmentServer as Inventory} from "../services/Inventory";
import {getData} from "../utils/NetworkRequest"


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
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


const InventoryContainer = styled.div`
    width: 100%;
    display: flex;
    flex-flow: wrap;
    justify-content: center;
`;

const InventoryCards = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

interface IImages {
    objectId:  number,
    imgCount: number,
    lotImages: {}[]

}

export const FilterContext = React.createContext(null);
const FilterProvider = FilterContext.Provider;

const HomePage = (props) =>  {
   const background = `linear-gradient(0deg, #051713b8 0%, transparent),linear-gradient(62deg,#29685b 24%,#2a685b 49%, #29685b)`;
   const {totalRecords,paginationInfo,data,Attributes} = props;
   const [selectedFilters,setFilters] = React.useState({});
   console.log(props)


    return <Container>
                <FilterProvider value={{selectedFilters, setFilters}}>
                    <Filter {...Attributes}/>
                    <InventoryContainer>
                        <InventoryCards>
                            {
                                data && data.map( (item,index) => <Card key={index} {...item}/>)
                            }
                        </InventoryCards>
                        <Pagination 
                            {...paginationInfo} 
                            numberOfItems={6}
                            padding={3}
                            pathname={"dashboard"}
                            query={{limit:3}}
                        />
                    </InventoryContainer>
                </FilterProvider>
                </Container>
};

export const getServerSideProps: GetServerSideProps = async ({ params,req,res,query }) => {
    const  {page = 1  ,limit = 100} =   query;
    try {
      let InventoryList

      await getData(Inventory.list,{page ,limit})
        .then(res =>{
             console.log({res})
             InventoryList = res.Inventory
            })
        .catch(err=> console.error(err))

        let Attributes
        await getData(Inventory.attributes)
          .then(res =>{
               Attributes = res
              })
          .catch(err=> console.error(err))
      console.log(Attributes);
      return { props: { ...InventoryList, key: JSON.stringify(query),Attributes  } }
    } catch (err) {
      return { props: { errors: err.message } }
    }
}

export default defaultStyles(HomePage);


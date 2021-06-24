import React, { ReactNode, FunctionComponent } from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import styled from "styled-components";
import defaultStyles from "../components/HOC/DefaultPageProps";
import Card from "../components/InventoryUI/Cards";
import DefaultInput from "../components/Forms/FormElements/Inputs/DefaultInput";
import * as Button from "../components/Forms/FormElements/Buttons";
import Pagination from "../components/Paginator";
import Filter from "../components/Filters";
import { DevelopmentServer as Inventory } from "../services/Inventory";
import { getData } from "../utils/NetworkRequest";
import InventoryRequest from "../apiRequest/InventoryItems";
import ParamMap from "../components/InventoryUI/utils/paramMap";
import FilterContext from "../Context/FilterContext";
import DropDown from "../components/Filters/atoms/DropDown";
import LimitFilters from "../components/Filters/organisms/limit";
import SelectedFilters from "../components/Filters/organisms/selectedFilters";
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

const SearchButton = styled(Button.DefaultButton)`
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
  flex-direction: column;
`;

const InventoryCards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const SelectedFilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  align-items: center;
`;

interface IImages {
  objectId: number;
  imgCount: number;
  lotImages: {}[];
}

interface ILookupTable {
  [key: string]: string;
}

interface IFilterContext {
  vendor?: ILookupTable;
  models?: ILookupTable;
}

const HomePage = (props) => {
  const background = `linear-gradient(0deg, #051713b8 0%, transparent),linear-gradient(62deg,#29685b 24%,#2a685b 49%, #29685b)`;
  const [selectedFilters, setFilters] = React.useState({});
  const [inventory, setInventory] = React.useState(props);
  const { totalRecords, paginationInfo, data, Attributes } = inventory;
  const currentRequest = React.useRef(null);

  const paramsCreator = () => {
    const slots = {};
    console.log({ selectedFilters });
    Object.keys(selectedFilters).forEach((key) => {
      try {
        slots[key] = ParamMap(key)(selectedFilters[key]);
      } catch (e) {
        console.error(e);
      }
    });
    return slots;
  };

  React.useEffect(() => {
    const params = paramsCreator();
    console.log({ paramsCreated: params });
    if (currentRequest && currentRequest.current)
      clearTimeout(currentRequest.current);
    currentRequest.current = setTimeout(() => {
      InventoryRequest(params)
        .then((res) => setInventory(res.Inventory))
        .catch((e) => console.log(e));
    }, 500);
  }, [selectedFilters]);

  return (
    <Container>
      <FilterContext.Provider value={{ selectedFilters, setFilters }}>
        {/* <Filter /> */}
        <InventoryContainer>
          <SelectedFilterContainer>
            <SelectedFilters />
            <LimitFilters />
          </SelectedFilterContainer>
          <InventoryCards>
            {data &&
              data.map((item, index) => <Card key={item._id} {...item} />)}
          </InventoryCards>
          <Pagination
            {...paginationInfo}
            numberOfItems={6}
            padding={3}
            pathname={"dashboard"}
            query={{ limit: 3 }}
          />
        </InventoryContainer>
      </FilterContext.Provider>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  res,
  query,
}) => {
  const { page = 1, limit = 20 } = query;
  try {
    let InventoryList;

    await getData(Inventory.list, { page, limit })
      .then((res) => {
        InventoryList = res.Inventory;
      })
      .catch((err) => console.error(err));

    return {
      props: { ...InventoryList, key: JSON.stringify(query) },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
  return { props: {} };
};

export default defaultStyles(HomePage);

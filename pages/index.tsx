import React from "react";
import defaultStyles from "../components/HOC/DefaultPageProps";
import DefaultInput from "../components/Forms/FormElements/Inputs/DefaultInput";
import styled from "styled-components";
import DefaultButton from "../components/Forms/FormElements/Buttons/DefaultButton";

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
	min-width: 600px;
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

const HomePage = (props) => {
	return (
		<Container>
			<Header>Search the Auction</Header>
			<SearchBar name={"search"} />
			<ButtonContainer>
				<SearchButton
					backgroundColor={"apricotWhite"}
					children={"Search Auction"}
					size={"XL"}
					borderColor={"burnham"}
				/>
				<SearchButton
					children={"Go To Dashboard"}
					size={"XL"}
					backgroundColor={"apricotWhite"}
					borderColor={"burnham"}
				/>
			</ButtonContainer>
		</Container>
	);
};

export default defaultStyles(HomePage);

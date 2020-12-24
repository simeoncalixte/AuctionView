import React from "react";
import styled from "styled-components";
import * as Button from "../../Forms/FormElements/Buttons";

interface IMakeOffer {
	makeAnOfferAvailable: "Y" | string;
}

const MakeAnOfferButton = (props: IMakeOffer) => {
	const offerDisplay =
		props.makeAnOfferAvailable === "Y" ? (
			<Button.DefaultButton
				backgroundColor={"deYolk"}
				textColor={"fairPink"}
				size={"M"}
			>
				<span>Make An Offer</span>
			</Button.DefaultButton>
		) : null;

	return offerDisplay;
};

export default MakeAnOfferButton;

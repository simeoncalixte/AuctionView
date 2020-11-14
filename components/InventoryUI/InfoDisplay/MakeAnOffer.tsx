import React from "react";
import styled from "styled-components";
import DefaultButton from "../../FormElements/DefaultButton";

interface IMakeOffer {
  makeAnOfferAvailable: "Y" | string;
}

const MakeAnOfferButton = (props: IMakeOffer) => {
  const offerDisplay =
    props.makeAnOfferAvailable === "Y" ? (
      <DefaultButton
        backgroundColor={"deYolk"}
        textColor={"fairPink"}
        size={"M"}
      >
        <span>Make An Offer</span>
      </DefaultButton>
    ) : null;

  return offerDisplay;
};

export default MakeAnOfferButton;

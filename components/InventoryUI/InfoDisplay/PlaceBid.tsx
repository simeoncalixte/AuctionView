import React from "react";
import styled from "styled-components";
import DefaultButton from "../../FormElements/DefaultButton";

const PlaceHolderImage = styled.div``;
const PlaceBidContainer = styled.div`
  display: flex;
`;

const StateContianer = styled.div`
  margin: 0px 5px;
`;
const StateLabel = styled.label`
  font-size: 14px;
  margin: 0px;
`;

const StateInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 2px 10px 10px 2px;
`;

const StateInput = styled.input`
  background: none;
  border: none;
`;

const SubmitButton = styled.button`
  padding: 0px 5px;
  border-color: #4a9d6e59;
  border-left-color: rgba(242, 241, 241, 0.75);
  cursor: pointer;
  border-left: 1px solid #8c8b8a3b;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-content: center;
  background: #4a9d6e;
  max-width: 32px;
`;

const CurrentHighestBid = styled.div`
  font-size: 12px;
  font-style: italic;
  letter-spacing: 0.5px;
  color: #fab050;
`;

interface IProps {
  currentBid: number;
  userBid: number;
}

const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const PlaceBid = (props: IProps) => {
  const { currentBid, userBid } = props;
  const currentBidCurrency = currencyFormat.format(currentBid);
  const userBidCurrency = currencyFormat.format(currentBid);
  let ComponentStateHtml = null;

  if (currentBid === userBid) {
  } else if (currentBid > userBid) {
  } else if (currentBid > 0) {
  } else if (currentBid == 0) {
    ComponentStateHtml = (
      <DefaultButton size="M" backgroundColor="bilbao" textColor="apricotWhite">
        <span>Click to Place Bid </span>
      </DefaultButton>
    );
  }

  return <>{ComponentStateHtml}</>;
};

export default PlaceBid;

import React from "react";
import styled from "styled-components";
import priceFormat from "../../../utils/Price";

const LabelContainer = styled.div`
  min-width: 70px;
`;

const Buy = styled.div`
  position: relative;
  padding: 1px 8px;
  background: #4a9d6e;
  border: 1px solid #f0e8e8;
  color: white;
  text-shadow: 1px 1px 3px #00000080;
  -webkit-transform: rotate(-30deg);
  -ms-transform: rotate(-30deg);
  transform: rotate(-30deg);
  z-index: 1;
  left: 3px;
  top: 0px;
  width: max-content;
`;
const Now = styled.div`
  position: relative;
  top: 0px;
  left: 17px;
  background: #d25353;
  padding: 0px 7px;
  color: white;
  z-index: 0;
  border: 1px solid white;
  box-shadow: 1px 1px 2px #00000057;
  width: max-content;
`;
const ForThePrice = styled.div`
  position: relative;
  left: 49px;
  top: -50px;
  width: max-content;
  color: #fff;
`;

const BuyNowContainer = styled.div`
  position: relative;
  display: flex;
`;

const BuyNowButtonContainer = styled.div`
  display: flex;
`;

const BuyNowButton = styled.button`
  background: #48986b;
  border: 1px outset #787878d9;
  margin-right: 3px;
  color: white;
  text-shadow: 1px 1px 1px #00000078;
  border-radius: 2px;
  flex-basis: 100%;
`;

const BuyTodayPrice = styled.div`
  font-size: 30px;
  font-weight: bolder;
  color: white;
`;

const Info = styled.div`
  border-radius: 100%;
  background: #d25353;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 15px;
  width: 19px;
  color: white;
  border: 1px solid #4a9d6e70;
`;

const BuyNowSection = (props: { price: number }): JSX.Element | null => {
  const { price } = props;
  if (price && price > 0) {
    return (
      <BuyNowContainer>
        <LabelContainer>
          <Buy>Buy</Buy>
          <Now>Now!</Now>
          <ForThePrice>for</ForThePrice>
        </LabelContainer>
        <BuyTodayPrice>
          <div>{priceFormat(price)}</div>
          <BuyNowButtonContainer>
            <BuyNowButton>Click Here</BuyNowButton>
            <Info>i</Info>
          </BuyNowButtonContainer>
        </BuyTodayPrice>
      </BuyNowContainer>
    );
  }
  return null;
};

export default BuyNowSection;

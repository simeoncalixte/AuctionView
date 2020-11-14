import React from "react";
import PlaceBidHere from "./PlaceBid";
import BuyNow from "./BuyNow";
import MakeAnOffer from "./MakeAnOffer";

interface IProps {
  price: number;
  makeAnOfferAvailable: "Y" | string;
}

const SaleInfo = (props: IProps) => {
  const { price, makeAnOfferAvailable } = props;

  return (
    <>
      <BuyNow price={price} />
      <PlaceBidHere currentBid={0} userBid={null} />
      <MakeAnOffer makeAnOfferAvailable={makeAnOfferAvailable} />
    </>
  );
};

export default SaleInfo;

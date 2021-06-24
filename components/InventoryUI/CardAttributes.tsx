import React from "react";
import styled from "styled-components";

interface IAttributes {
  hasKeys: string;
  buyNow: number;
  runsAndDrives: string;
}

const CardIcon = styled.img<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "25px")};
  margin: 0px 5px;
  position: absolute;
  bottom: 0px;
  z-index: 1;
  left: 50px;
  opacity: 0.6;
  &.key {
    transform: rotateZ(60deg);
  }
`;

const RunIcon = styled(CardIcon)`
  bottom: -14px;
  left: 75px;
`;

const KeyExemptIcon = () => <></>;

const HasKeys = (props) => {
  const { hasKeys } = props;
  if (hasKeys === "YES")
    return <CardIcon className={"key"} src={"./images/key.svg"} />;
  if (hasKeys === "EXM") return <></>;
  if (hasKeys === "NO") return <></>;
  return <></>;
};

const BuyNowButton = styled.div`
  background-color: #3053078c;
  padding: 1px;
  width: 111px;
  text-align: center;
  color: #f7f7f7;
  border-radius: 0px 5px 0px 0px;
  font-size: 12px;
  letter-spacing: 0.5px;
  border-left: none;
  position: absolute;
  z-index: 2;
  bottom: -25px;
  padding: 2px 15px;
  transform: rotate(45deg);
  height: 25%;
  left: -26%;
`;
const BuyNow = (props) => {
  const { buyNow } = props;
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(buyNow);
  if (buyNow > 0) return <BuyNowButton>{price}</BuyNowButton>;
  return <></>;
};

const RunsAndDrives = (props) => {
  const { runsAndDrives } = props;
  if (runsAndDrives === "Run & Drive Verified") {
    return <RunIcon width="50px" src="./images/zoomCar.png" />;
  }
  return <></>;
};

const AttributeRep = {
  hasKeys: (props) => <HasKeys hasKeys={props} />,
  buyNow: (props) => <BuyNow buyNow={props} />,
  runsAndDrives: (props) => <RunsAndDrives runsAndDrives={props} />,
};

const CardAttributes = (attributes: IAttributes) => {
  const attributeJSX = Object.keys(attributes).map((attribute) => {
    // display the correct
    return AttributeRep[attribute](attributes[attribute]);
  });
  return <>{attributeJSX}</>;
};

export default CardAttributes;

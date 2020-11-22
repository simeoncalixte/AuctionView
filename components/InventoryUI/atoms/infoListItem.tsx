import React from "react";
import styled from "styled-components";

interface IProps {
  label: string;
  value: string;
  icon?: Element;
}

const InfoList = styled.ul`
  margin: 0px;
  padding: 0px;
`;

const BetweenElipsis = styled.span`
  background: content-box;
  border-bottom: 5px dotted gray;
  flex-grow: 3;
`;

const InfoListItem = styled.li`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  * {
    margin: 2px;
  }
  :nth-child(2n) {
    background: #31313194;
  }
`;

const Info = (props: { values: IProps[] }) => {
  const info = props.values.map((item) => {
    return (
      <InfoListItem>
        <label>{item.label}</label>
        <BetweenElipsis></BetweenElipsis>
        <span>{item.value}</span>
      </InfoListItem>
    );
  });

  return <InfoList>{info}</InfoList>;
};

export default Info;

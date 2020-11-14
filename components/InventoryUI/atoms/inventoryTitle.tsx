import React from "react";
import Link from "next/link";
import styled from "styled-components";

export interface IProps {
  year: string;
  make: string;
  modelGroup: string;
  vin: string;
}

const Heading = styled.h3`
  position: absolute;
  z-index: 3;
  padding: 0px;
  margin: 5px;
  color: black;
  text-shadow: 1px 1px 6px #ffffffbd;
`;

const Title = (props: IProps) => (
  <Link href="/item/[inventory_id]" as={`/item/${props.vin}`}>
    <Heading>{`${props.year} ${props.make} ${props.modelGroup}`}</Heading>
  </Link>
);

export default Title;

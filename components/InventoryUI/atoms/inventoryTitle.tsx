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

`;

const Title = (props: IProps) => (
        <Link href="/item/[inventory_id]" as={`/item/${props.vin}`}> 
            <Heading>{`${props.year} ${props.make} ${props.modelGroup}`}</Heading>
        </Link>

)

export default Title;

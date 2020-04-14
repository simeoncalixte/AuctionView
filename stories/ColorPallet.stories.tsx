import React from "react";
import colors from "../utils/ColorPallet";
import styled from "styled-components";

interface IColors {
    colors: {[keys: string]: string}
}

const ColorBlock = styled.div<{color: string}>`
    background-color: ${(props)=> props.color? colors[props.color] : "white"};
    height: 30px;
    display: inline-block;
    color: ${props =>  props.color == "white" ? colors.chestnutRose:  colors["white"]};
    padding: 20px;
    min-width: 300px;
    text-align: center;

`;


const ColorsList = (props: IColors) => {
    const list  = Object.keys(colors).map((color)=> {
        return (
            <ColorBlock color={color}>
                <div>{color}</div>
                <div>{colors[color]}</div>
            </ColorBlock>
            )
    })
    return <>{list}</>;
}

export default {
  title: 'Color Pallet',
};

export const Colors = () =>{ 
    return (
        <div>
            <ColorsList colors={colors} />
        </div>
    );
};

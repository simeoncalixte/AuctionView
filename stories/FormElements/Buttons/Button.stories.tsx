import React from 'react';
import { action } from '@storybook/addon-actions';
import DefaultButton from "../../../components/FormElements/DefaultButton";
import { withKnobs, text, color } from "@storybook/addon-knobs";
import colorPallet from "../../../utils/ColorPallet";
import {IDefaultButtonProps, EButtonSize} from "../../../components/FormElements/DefaultButton";
import addAlpha from "../../../utils/ColorPallet/addAlpha";

export default {
  title: 'Buttons',
  component: DefaultButton,
  decorators: [withKnobs]
}


export const NeutralSentinment   = () =>{   
  const gradient = `linear-gradient(4deg, #00000036 7%, transparent, #0000003b 100%),
                    linear-gradient(12deg,#e3e3e3 72%,transparent),
                    #aaaac6`;

  return(  
        <>
            <DefaultButton
                backgroundColor={gradient}
                children = {text("Neautral Label","Neautral")}
                textColor = {color("Neautral Text Color",colorPallet.burnham)}
                borderColor = {color("Neautral Border Color",colorPallet.roseWood)}
                size ={ "XL"}
            />
            <DefaultButton
                backgroundColor={gradient}
                children = {text("Neautral Label","Neautral")}
                textColor = {color("Neautral Text Color",colorPallet.burnham)}
                borderColor = {color("Neautral Border Color",colorPallet.roseWood)}
                size ={ "L"}
            />
            <DefaultButton
                backgroundColor={gradient}
                children = {text("Neautral Label","Neautral")}
                textColor = {color("Neautral Text Color",colorPallet.burnham)}
                borderColor = {color("Neautral Border Color",colorPallet.roseWood)}
                size ={ "M"}
            />
            <DefaultButton
                children = {text("Neautral Label","Neautral")}
                textColor = {color("Neautral Text Color",colorPallet.burnham)}
                borderColor = {color("Neautral Border Color",colorPallet.roseWood)}
                size ={ "S"}
            />
            <DefaultButton
                children = {text("Neautral Label","Neautral")}
                textColor = {color("Neautral Text Color",colorPallet.burnham)}
                borderColor = {color("Neautral Border Color",colorPallet.roseWood)}
                size ={ "XS"}
            />
        </>
    );
}

export const PositiveSenitiment = () =>{   
  return(  
    <>
        <DefaultButton
            backgroundColor={text("Backgrond Color", colorPallet.greenApple)}
            children = {text("Positive Label","Positive")}
            textColor = {text("Positive Text Color",colorPallet.burnham)}
            borderColor = {text("Positive Border Color",colorPallet.roseWood)}
            size ={ "XL"}
        />
        <DefaultButton
            backgroundColor={text("Backgrond Color", colorPallet.greenApple)}
            children = {text("Positive Label","Positive")}
            textColor = {text("Positive Text Color",colorPallet.burnham)}
            borderColor = {text("Positive Border Color",colorPallet.roseWood)}
            size ={ "L"}
        />
        <DefaultButton
            backgroundColor={text("Backgrond Color", colorPallet.greenApple)}
            children = {text("Positive Label","Positive")}
            textColor = {text("Positive Text Color",colorPallet.burnham)}
            borderColor = {text("Positive Border Color",colorPallet.roseWood)}
            size ={ "M"}
        />
        <DefaultButton
            children = {text("Positive Label","Positive")}
            textColor = {color("Positive Text Color",colorPallet.burnham)}
            borderColor = {color("Positive Border Color",colorPallet.roseWood)}
            size ={ "S"}
            backgroundColor={text("Backgrond Color", colorPallet.greenApple)}

        />
        <DefaultButton
            children = {text("Positive Label","Positive")}
            textColor = {color("Positive Text Color",colorPallet.burnham)}
            borderColor = {color("Positive Border Color",colorPallet.roseWood)}
            size ={ "XS"}
            backgroundColor={text("Backgrond Color", colorPallet.greenApple)}

        />
    </>
);
  }

export const NegativeSenitiment = () => {   
    return  <DefaultButton
      backgroundColor = {color("Negative Background Color",colorPallet.apricotWhite)}
      children = {text("Negative Label","Negative")}
      textColor = {color("Negative Background Color",colorPallet.roseWood)}
      borderColor = {color("Negative Background Color",colorPallet.roseWood)}
      size ={ "M"}
    />
  }

export const WarningSenitiment  = () =>  {   
    return  <DefaultButton
      backgroundColor = {color("Warning Background Color",colorPallet.tamarillo)}
      children = {text("Warning Label","Warning")}
      textColor = {color("Warning Text Color",colorPallet.apricotWhite)}
      borderColor = {color("Warning Border Color",colorPallet.roseWood)}
      size ={ "M"}
    />
  }


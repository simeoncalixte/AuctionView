import React,{useState} from "react";
import Link  from "next/link";
import styled from "styled-components";




const ActiveStyle = `
    color: #03624c;
    background: white;
`;

const Anchor = styled.a<{isActive: ILink["isActive"]}>`
    margin: 0px 2px;
    color: white;
    padding: 5px;
    cursor: pointer;
    border-radius: 3px;
    font-weight: 400;
    letter-spacing: 1px;
   ${props => props.isActive? ActiveStyle : ``}
   :hover{
        ${ActiveStyle}
    }
`;

export default (props: ILink) =>{ 
    if(props.cb){
        let [elementToDom,setElementTo] = useState<JSX.Element>();
        const addOn = (e) => {
            e.preventDefault();
            const Element = props.cb(e);
            if(Element) setElementTo(props.cb(e));            
        }

        return (
            <Link href={props.href}>
                <Anchor isActive={props.isActive} onClick={addOn}>
                    {props.children}
                    {elementToDom}
                </Anchor>
            </Link>
        )
    }
    
    return (
        <Link href={props.href}>
            <Anchor isActive={props.isActive}>
                {props.children}
            </Anchor>
        </Link>
    )
}
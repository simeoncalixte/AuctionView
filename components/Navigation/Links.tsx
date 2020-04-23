import React,{useState} from "react";
import Link  from "next/link";
import styled from "styled-components";
import {AnchorStyles} from "./collectiveStyles"

export default (props: ILink) =>{ 
    const onClick = ( e ) => {
        if(props.cb){
            e.preventDefault();
            props.cb(e)
        }
    }

    return (
        <Link href={props.href}>
            <AnchorStyles isActive={props.isActive} onClick={onClick}>
                {props.children}
            </AnchorStyles>
        </Link>
    )
}
import React from "react";
import Link from "next/link";
import styled from "styled-components";




const PaginationLinks = styled.a`
    background: #dbe5e3;
    margin: 5px;
    padding: 4px;
    width: 20px;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    color: #fbfbfb;
    text-shadow: 1px 1px 1px #0000008c;
    height: 20px;
    border-radius: 100%;
    line-height: 18px;
    cursor: pointer;
    :hover{

    }
`;


interface IPagination {
    currentPage: number;
    limit: number;
    /***
     * @description a number of digits to present in the UI
     * @example numberOfItems = 2, there will be only two page links available
     * at a time. (previous ... 3 4 ... next)
     * @example number of Items = 3 (previous ... 5 6 7 ... next)
     */
    numberOfItems: number;
    /** 
     * @description the amount of integers to place in front and/or behind 
     * the current page
     */
    lastPage: number;
    padding: number;
    pathname: string;
    query: object;
    

}

export default (props : IPagination) => {
    const {currentPage,numberOfItems,limit,padding,pathname,query, lastPage }= props;
    const Links = [];
    let startingPoint = currentPage - padding <= 0 ? 1 : currentPage - padding;
    let endPoint = startingPoint + numberOfItems <  lastPage ? startingPoint + numberOfItems : lastPage;

    let currentIndex = startingPoint;

    while (currentIndex <= endPoint ){
        Links.push(
            <Link href={{pathname: pathname, query: {page: currentIndex, ...query}}}>
                <PaginationLinks>{currentIndex}</PaginationLinks>
            </Link>
        )
        currentIndex +=1;
    }

    if(startingPoint - 4 >= 0 ){
        Links.unshift(
            <>
                <Link href={{pathname: pathname, query: {page: 1, ...query}}}>
                    <PaginationLinks>{1}</PaginationLinks>
                </Link>
            <span>...</span>
            </>
        )
    }

    if(endPoint + 3 <= lastPage-3){
        Links.push(
            <>
                <span>...</span>
                <Link href={{pathname: pathname, query: {page: lastPage, ...query}}}>
                    <PaginationLinks>{lastPage}</PaginationLinks>
                </Link>
            </>
        )
    }

    return  <section>
                {Links}
            </section>
    ;
}
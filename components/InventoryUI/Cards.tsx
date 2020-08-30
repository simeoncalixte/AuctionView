import React from "react";
import {getData} from "../../utils/NetworkRequest";
import Inventory from "../../services/localhost";
import styled from "styled-components";
import { link } from "fs";
import Carousel from "../Carousel";

const InventoryItem = styled.div`
    margin: 4px;
    background-color: #ffffffd6;
    border-radius: 2px;
    flex-basis: 19%;
    max-height: 232px;
    overflow: hidden;
    position: relative;
`;

const Image = styled.img<{blur?: boolean;}>`
    width: 100%;
    filter: ${props => props.blur? "blur(8px)" : 0};
`;

const CardHeading = styled.span`
    display: block;
    padding: 3px 5px;
`;

export default  (item) => {
    const [imageLoaded,setLoadedState] =  React.useState(false);
    const [images,setImages] =  React. useState(null);
    const DisplayImage = imageLoaded ? 
        <Carousel>
            {
                images.standard.map((imageSrc,key)=>{
                    return <Image key={key} src={imageSrc} />

                })
            }
        </Carousel> : 
        <Image blur={true} src={`//${item["Image Thumbnail"]}`}/>
    
    React.useEffect(()=>{
        /** 
        if(!imageLoaded){
            if (item["Image URL"]){
                getData("//"+Inventory.images, {url: item["Image URL"]})
                .then((res)=>{

                        const returnedLinks = {
                            standard:[],
                            thumbNail:[],
                            HDImages:[]
                        }

                        res.lotImages.map( (imageSet) => {
                            imageSet.link.forEach( (links,index) => {                                                            
                                if(!links.isThumbNail && !links.isHdImage){
                                    returnedLinks.standard.push(links.url)
                                }
                                if(links.isThumbNail && !links.isHdImage){
                                    returnedLinks.thumbNail.push(links.url)
                                }
                                if(!links.isThumbNail && links.isHdImage){
                                    returnedLinks.HDImages.push(links.url)
                                }
 
                            });
                        })
                        setImages(returnedLinks);
                        setLoadedState(true);
        
                    }).catch(e => console.error(e))
            }            
        }
        */
    })

    return (
        <InventoryItem>
            <CardHeading>{`${item.Year} ${item.Make} ${item["Model Group"]}`}</CardHeading> 
            {DisplayImage}
        </InventoryItem>
    )
}
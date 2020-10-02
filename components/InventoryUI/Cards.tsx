import React from "react";
import Link from "next/link";
import {getData} from "../../utils/NetworkRequest";
import parseDate from "../../utils/Date/YYYYMMDD";
import Inventory from "../../services/localhost";
import styled from "styled-components";
import { link } from "fs";
import Carousel from "../Carousel";
import CardAttributes from "./CardAttributes";

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

const InfoContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 3fr;
`;

const InfoRow = styled.div`

`;

const InfoColumn = styled.div`
    font-size: 12px;
    letter-spacing: .5px;
`;

const InfoToggle = styled.button`
    position: absolute;
    z-index: 1;
    background: transparent;
    right: 0px;
    margin: 3px 5px;
    bottom: 0px;
    height: 25px;
    width: 25px;

    

`;

const ItemInfo = styled.div<{isOpen: boolean}>`
    position: absolute;
    z-index: 1;
    height: 0px;
    transition: all 1s ease;
    ${props => props.isOpen? "height:100%;":``}
    overflow: hidden;
    background: white;
    width: 100%;
    top: 0px;
`;

interface IInfoRow {
    label: string;
    value: string
}

const ItemInfoRow = (props: IInfoRow) => {
    if(props.value && props.value !== ""){
        return (
        <>
            <InfoColumn>
                {props.label}
            </InfoColumn>
            <InfoColumn>
                {props.value}
            </InfoColumn>
        </>
        )
    }
    return null;
}

const CountDown = (endDate: Date ) => {
    let [element,setElement] = React.useState(0);

    React.useEffect(()=>{
        const interval = setInterval(() => {
            setElement(element++);
          }, 1000);
          return () => clearInterval(interval);
    },[])
    
    return <>{element}</>;
}

export default  (item) => {
    const [imageLoaded,setLoadedState] =  React.useState(false);
    const [images,setImages] =  React.useState(null);
    const [displayInfo,setDisplayInfo] = React.useState(false)
    const DisplayImage = (
        imageLoaded ? 
        <Carousel>
            {
                images.standard.map((imageSrc,key)=>{
                    return <Image key={key} src={imageSrc} />

                })
            }
        </Carousel> : 
        <Image blur={true} src={`//${item["Image Thumbnail"]}`}/>
    );


    const PendingEffect = ()=>{
        
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
    };

    console.log(parseDate(item["Sale Date M/D/CY"],item["Time Zone"]))
    return (
        <InventoryItem>
            <Link href="/item/[inventory_id]" as={`/item/${item.VIN}`}> 
                <CardHeading>{`${item.Year} ${item.Make} ${item["Model Group"]}`}</CardHeading>
            </Link>
            <CardAttributes
                hasKeys={item["Has Keys-Yes or No"]}
                buyNow={item["Buy-It-Now Price"]}
                runsAndDrives={item["Runs/Drives"]}
            />
            <ItemInfo isOpen={displayInfo}>
                <CardHeading>{`${item.Year} ${item.Make} ${item["Model Group"]}`}</CardHeading>
                <InfoContainer>
                    <ItemInfoRow label={"VIN"} value={item.VIN}/>
                    <ItemInfoRow label={"Engine & Drive"} value={`${item.Engine} ${item.Drive}`}/>
                    <ItemInfoRow label={"Transmission"} value={item.Transmission}/>
                    <ItemInfoRow label={"Body Style"} value={`${item["Body Style"]} `}/>
                    <ItemInfoRow label={"Color"} value={`${item["Color"]}`}/>
                    <ItemInfoRow label={"Damage"} value={`${item["Damage Description"]} ${item["Secondary Damage"]}`}/>
                    <ItemInfoRow label={"Sale Status"} value={item["Sale Status"]}/>
                    <ItemInfoRow label={"Odometer"} value={item.Odometer}/>
                    <ItemInfoRow label={"Fuel Type"} value={item.VIN}/>
                    <ItemInfoRow label={"Has Keys?"} value={item.VIN}/>
                    <ItemInfoRow label={"Est. Retail Value"} value={item["Est. Retail Value"]}/>
                </InfoContainer>
            </ItemInfo>
            <InfoToggle onClick={()=> setDisplayInfo(!displayInfo)}><span>...</span></InfoToggle>
            {DisplayImage}
        </InventoryItem>
    )
}
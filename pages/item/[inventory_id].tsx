import React, {ReactNode, FunctionComponent} from "react";
import defaultStyles from "../../components/HOC/DefaultPageProps";
import Title from "../../components/InventoryUI/atoms/inventoryTitle";
import styled from "styled-components";
import {GetServerSideProps,GetStaticProps} from "next";
import {DevelopmentServer as Inventory} from "../../services/Inventory";
import {getData} from "../../utils/NetworkRequest";
import Carousel from "../../components/Carousel";
import axios from "node-fetch";

const Container = styled.div`
`;

const ItemDisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ItemInfoContainer = styled.div`
`;


enum InventoryItem {
    modelGroup = "Model Group",
    year = "Year",
    make = "Make",
    vin = "VIN",
    imageThumbnail = "Image Thumbnail",
    imagesUrl= "Image URL"
}

const HomePage = (props) =>  {
    const initialLoad =  React.useRef(false);
    const [imageCollection,setImageCollection]= React.useState({
        images: null,
        count: 0,
    });
    const [imageCount,setImageCount]= React.useState(null);

    const infoList = Object.keys(props).map((key)=>{
        return <li>{key} {props[key]}</li>
    })

    const initialLoadProcesses = ( ) => {
        if(!initialLoad.current) {
            const url = props[InventoryItem.imagesUrl] as string;
            const httpsString = url?.replace('http','https');
            //the request will return 302 without assigning https protocol
            axios(httpsString,)
                .then(async (res)=>{ 
                   const result = await res.json();
                   return result;
                })
                .then(processImages)
                .catch(e=> console.error(e));
            initialLoad.current = true;
        }
    }

    const processImages = (rawApiImages) => {
        console.log("PROCESSING" , rawApiImages);
        const newImageCollection = {
            thumbNails : [],
            hdImages: [],
            standard: []
        }

        rawApiImages.lotImages.forEach((value)=>{
            value?.link?.forEach((link)=>{
                console.log({link})
                if(link. isThumbNail) newImageCollection.thumbNails.push(link.url);// is thumbnail
                if(link.isHdImage) newImageCollection.hdImages.push(link.url);// is hdImage
                if(!link. isThumbNail && !link.isHdImage) newImageCollection.standard.push(link.url);// is standard
            })
        })

        setImageCollection({
            images: newImageCollection,
            count: rawApiImages.imgCount
        })
    }

    React.useEffect(initialLoadProcesses);

    return <Container>
                <ItemDisplayContainer>
                    <Title 
                        year={props[InventoryItem.year]}
                        modelGroup={props[InventoryItem.modelGroup]}
                        make={props[InventoryItem.make]}
                        vin={props[InventoryItem.vin]}
                    />
                    <Carousel
                        lowResDefaultImageSrc = {`//${props[InventoryItem.imageThumbnail]}`}
                        imageCollection = {imageCollection}
                        imageCount = {imageCount}
                    />
                                      
                    <div>I will be you buttons</div>
                </ItemDisplayContainer>
                <ItemInfoContainer>
                    {infoList}
                </ItemInfoContainer>
           </Container>
};

export const getServerSideProps: GetServerSideProps = async ({ params,req,res,query }) => {
    const  {inventory_id} =  query;
    try {
      let Item

      await getData(Inventory.item,{inventory_id})
        .then(res =>{
            console.log({res})
             Item = res.data
            })
        .catch(err=> console.error(err))

      return { props: { ...Item, key: JSON.stringify(query)  } }
    } catch (err) {
      return { props: { errors: err.message } }
    }
}

export default defaultStyles(HomePage);


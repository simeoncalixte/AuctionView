import React from "react";
import Link from "next/link";
import { getData } from "../../utils/NetworkRequest";
import parseDate from "../../utils/Date/YYYYMMDD";
import Inventory from "../../services/Inventory";
import styled from "styled-components";
import { link } from "fs";
import Carousel from "../Carousel";
import CardAttributes from "./CardAttributes";

const InventoryItem = styled.div`
  margin: 4px;
  background-color: #ffffffd6;
  border-radius: 2px;
  flex-basis: 24%;
  @media only screen and (max-width: 600px) {
    flex-basis: 100%;
  }
  max-height: 232px;
  overflow: hidden;
  position: relative;
`;

const Image = styled.img<{ imageLoaded?: boolean }>`
  width: 100%;
  filter: ${(props) => (props.imageLoaded ? "blur(8px)" : 0)};
`;

const ImageThumbnail = styled(Image)``;

const CardHeading = styled.span`
  display: block;
  position: absolute;
  padding: 3px 5px;
  z-index: 1;
  background: #fffdfd30;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
`;

const InfoRow = styled.div``;

const InfoColumn = styled.div`
  font-size: 12px;
  letter-spacing: 0.5px;
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

const ItemInfo = styled.div<{ isOpen: boolean }>`
  position: absolute;
  z-index: 1;
  height: 0px;
  transition: all 1s ease;
  ${(props) => (props.isOpen ? "height:100%;" : ``)}
  overflow: hidden;
  background: white;
  width: 100%;
  top: 0px;
`;

interface IInfoRow {
  label: string;
  value: string;
}

const ItemInfoRow = (props: IInfoRow) => {
  if (props.value && props.value !== "") {
    return (
      <>
        <InfoColumn>{props.label}</InfoColumn>
        <InfoColumn>{props.value}</InfoColumn>
      </>
    );
  }
  return null;
};

const CountDown = (endDate: Date) => {
  let [element, setElement] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setElement(element++);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <>{element}</>;
};

export default (item) => {
  const [imageLoaded, setLoadedState] = React.useState(false);
  const [displayInfo, setDisplayInfo] = React.useState(false);
  const [images, setImages] = React.useState(null);

  const pendingEffect = () => {
    if (!imageLoaded) {
      if (item["Image URL"]) {
        console.log(Inventory.images);
        getData(Inventory.images, { url: item["Image URL"] })
          .then((res) => {
            console.log(res);
            const returnedLinks = {
              standard: [],
              thumbNail: [],
              HDImages: [],
            };

            res.lotImages.map((imageSet) => {
              imageSet.link.forEach((image, index) => {
                if (!image.isThumbNail && !image.isHdImage) {
                  returnedLinks.standard.push(image.url);
                }
                if (image.isThumbNail && !image.isHdImage) {
                  returnedLinks.thumbNail.push(image.url);
                }
                if (!image.isThumbNail && image.isHdImage) {
                  returnedLinks.HDImages.push(image.url);
                }
              });
            });
            setImages(returnedLinks);
            setLoadedState(true);
          })
          .catch((e) => console.error(e));
      }
    }
  };
  const DisplayImage = imageLoaded ? (
    <Carousel>
      {images?.standard.map((imageSrc, key) => {
        return <Image imageLoaded={imageLoaded} key={key} src={imageSrc} />;
      })}
    </Carousel>
  ) : (
    <Image
      imageLoaded={imageLoaded}
      onLoad={pendingEffect}
      src={`//${item["Image Thumbnail"]}`}
    />
  );

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
          <ItemInfoRow label={"VIN"} value={item.VIN} />
          <ItemInfoRow
            label={"Engine & Drive"}
            value={`${item.Engine} ${item.Drive}`}
          />
          <ItemInfoRow label={"Transmission"} value={item.Transmission} />
          <ItemInfoRow label={"Body Style"} value={`${item["Body Style"]} `} />
          <ItemInfoRow label={"Color"} value={`${item["Color"]}`} />
          <ItemInfoRow
            label={"Damage"}
            value={`${item["Damage Description"]} ${item["Secondary Damage"]}`}
          />
          <ItemInfoRow label={"Sale Status"} value={item["Sale Status"]} />
          <ItemInfoRow label={"Odometer"} value={item.Odometer} />
          <ItemInfoRow label={"Fuel Type"} value={item.VIN} />
          <ItemInfoRow label={"Has Keys?"} value={item.VIN} />
          <ItemInfoRow
            label={"Est. Retail Value"}
            value={item["Est. Retail Value"]}
          />
        </InfoContainer>
      </ItemInfo>
      <InfoToggle onClick={() => setDisplayInfo(!displayInfo)}>
        <span>...</span>
      </InfoToggle>
      {DisplayImage}
    </InventoryItem>
  );
};

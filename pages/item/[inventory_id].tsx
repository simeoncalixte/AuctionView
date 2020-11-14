import React from "react";
import axios from "node-fetch";
import styled from "styled-components";
import { GetServerSideProps, GetStaticProps } from "next";
import { DevelopmentServer as Inventory } from "../../services/Inventory";
import { getData } from "../../utils/NetworkRequest";
import defaultStyles from "../../components/HOC/DefaultPageProps";
import Title from "../../components/InventoryUI/atoms/inventoryTitle";
import Carousel from "../../components/Carousel";
import CountDown from "../../components/CountDown";
import SalesInfo from "../../components/InventoryUI/InfoDisplay/SaleInfo";
import InventoryItem from "../../components/InventoryUI/utils/ItemEnum";
import InfoList from "../../components/InventoryUI/atoms/infoListItem";
import priceFormat from "../../utils/Price";
import withAuth0 from "../../components/HOC/AuthContainer";
import { useAuth0 } from "@auth0/auth0-react";

const HairTagWithCentralText = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	> hr {
		margin: 3px;
		flex-basis: 100%;
	}
	> div {
		text-align: center;
		flex-basis: 100%;
	}
`;

const SalesInfoList = styled.div`
	padding: 0px 10px;
`;

const SalesInfoRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	@media (max-width: 700px) {
		grid-template-columns: 1fr;
	}
`;
const ActionableRow = styled.div<{
	content?: string;
	backgroundImage?: string;
}>`
	position: relative;
	::before {
		width: 25px;
		height: 25px;
		background: #4a9d6e;
		content: ${(props) => (props.content ? props.content : "")};
		background-image: ${(props) =>
			props.backgroundImage ? props.backgroundImage : ""};
		background-size: 25px 20px;
		display: flex;
		position: absolute;
		left: -22px;
		z-index: 5;
		border: 2px groove #3d3d3da3;
		border-radius: 100%;
		justify-content: center;
	}
`;

const Container = styled.div`
	display: grid;
	grid-template-columns: 3fr 2fr;
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
	align-items: flex-start;
`;

const ItemDisplayContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const ItemInfoContainer = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	background: #3d3d3d;
	margin-left: 10px;
	padding: 10px;
	list-style: none;
	color: white;
`;

const CarouselContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	position: relative;
	box-sizing: border-box;
`;

const VinContainer = styled.div`
	background-image: url("/images/vinIcon.png");
`;

const SaleAction = styled.div`
	display: flex;
	flex-direction: column;
	border-left: 1px solid #727272;
	margin: 10px 0px;
	padding-left: 10px;
	box-sizing: border-box;
	justify-content: end;
`;

const CurrentBid = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 5px 0px;
`;

const HomePage = (props) => {
	const initialLoad = React.useRef(false);
	const { isLoading, error, isAuthenticated, loginWithRedirect } = useAuth0();

	console.log({
		isLoading,
		error,
		isAuthenticated,
		loginWithRedirect,
	});

	const [imageCollection, setImageCollection] = React.useState({
		images: null,
		count: 0,
	});
	const [imageCount, setImageCount] = React.useState(null);
	const infoList = [
		{ label: "VIN", value: props.VIN },
		{
			label: "Year Make Model",
			value: `${props[InventoryItem.year]} ${props[InventoryItem.make]} ${
				props[InventoryItem.modelGroup]
			} ${props[InventoryItem.trim]}`,
		},
		{ label: "Fuel Type", value: `${props[InventoryItem.fuelType]}` },
		{ label: "Engine", value: `${props[InventoryItem.engine]}` },
		{
			label: "Body Style",
			value: `${props[InventoryItem.bodyStyle]}`,
		},
		{ label: "Color", value: `${props[InventoryItem.color]}` },
		{ label: "Odometer", value: `${props[InventoryItem.odometer]}` },
		{ label: "Drive", value: `${props[InventoryItem.drive]}` },
		{
			label: "Transmission",
			value: `${props[InventoryItem.transmission]}`,
		},
	];
	const locationList = [
		{ label: "Yard Name", value: props[InventoryItem.yardName] },
		{
			label: "Lot Number",
			value: `${props[InventoryItem.lotNumber]}`,
		},
		{ label: "City", value: `${props[InventoryItem.locationCity]}` },
		{
			label: "State",
			value: `${props[InventoryItem.locationState]}`,
		},
		{
			label: "Country",
			value: `${props[InventoryItem.locationCountry]}`,
		},
		{ label: "Zip", value: `${props[InventoryItem.locationZip]}` },
		{
			label: "Sale Title State",
			value: `${props[InventoryItem.saleTitleState]}`,
		},
	];

	const initialLoadProcesses = () => {
		if (!initialLoad.current) {
			const url = props[InventoryItem.imagesUrl] as string;
			const httpsString = url?.replace("http", "https");
			//the request will return 302 without assigning https protocol
			axios(httpsString)
				.then(async (res) => {
					if (res.type === "cors") {
						const result = await res.json();
						return result;
					}
					return res;
				})
				.then(processImages)
				.catch((e) => console.error(e));
			initialLoad.current = true;
		}
	};

	const processImages = (rawApiImages) => {
		console.log("PROCESSING", rawApiImages);
		const newImageCollection = {
			thumbNails: [],
			hdImages: [],
			standard: [],
		};

		rawApiImages.lotImages.forEach((value) => {
			value?.link?.forEach((link) => {
				console.log({ link });
				if (link.isThumbNail) newImageCollection.thumbNails.push(link.url); // is thumbnail
				if (link.isHdImage) newImageCollection.hdImages.push(link.url); // is hdImage
				if (!link.isThumbNail && !link.isHdImage)
					newImageCollection.standard.push(link.url); // is standard
			});
		});

		setImageCollection({
			images: newImageCollection,
			count: rawApiImages.imgCount,
		});
	};

	React.useEffect(initialLoadProcesses);

	return (
		<Container>
			<ItemDisplayContainer>
				<CarouselContainer>
					<Title
						year={props[InventoryItem.year]}
						modelGroup={props[InventoryItem.modelGroup]}
						make={props[InventoryItem.make]}
						vin={props[InventoryItem.vin]}
					/>
					<Carousel
						lowResDefaultImageSrc={`//${props[InventoryItem.imageThumbnail]}`}
						imageCollection={imageCollection}
						imageCount={imageCount}
					/>
				</CarouselContainer>
			</ItemDisplayContainer>

			<ItemInfoContainer>
				<ActionableRow content="'$'">
					<HairTagWithCentralText>
						<hr></hr>
						<div>Sales Information</div>
						<hr></hr>
					</HairTagWithCentralText>
					<CountDown
						saleDate={props[InventoryItem.saleDate]}
						timeZone={props[InventoryItem.timeZone]}
						saleTime={props[InventoryItem.saleTime]}
					/>
					<SalesInfoRow>
						<SalesInfoList>
							<CurrentBid>
								<label>Current Winning Bid</label>
								<div>{priceFormat(props[InventoryItem.highestBid])}</div>
							</CurrentBid>

							<InfoList
								values={[
									{
										label: "Sale Status",
										value: props[InventoryItem.saleStatus],
									},
									{
										label: "Title State",
										value: props[InventoryItem.saleTitleState],
									},
									{
										label: "Title Type",
										value: props[InventoryItem.saleTitleType],
									},
								]}
							/>
						</SalesInfoList>
						<SaleAction>
							<SalesInfo
								price={props[InventoryItem.buyItNowPrice]}
								makeAnOfferAvailable={props[InventoryItem.makeAnOffeAvilable]}
							/>
						</SaleAction>
					</SalesInfoRow>
				</ActionableRow>

				<ActionableRow content={"'i'"}>
					<HairTagWithCentralText>
						<hr></hr>
						<div>Vehicle Information</div>
						<hr></hr>
					</HairTagWithCentralText>
					<InfoList values={infoList} />
				</ActionableRow>

				<ActionableRow backgroundImage={"url(/images/location.svg)"}>
					<HairTagWithCentralText>
						<hr></hr>
						<div>Location Information</div>
						<hr></hr>
					</HairTagWithCentralText>
					<InfoList values={locationList} />
				</ActionableRow>
			</ItemInfoContainer>
			<div>Last Updated : {props["Last Updated Time"]}</div>
		</Container>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	params,
	req,
	res,
	query,
}) => {
	const { inventory_id } = query;
	try {
		let Item;

		await getData(Inventory.item, { inventory_id })
			.then((res) => {
				console.log({ res });
				Item = res.data;
			})
			.catch((err) => console.error(err));

		return { props: { ...Item, key: JSON.stringify(query) } };
	} catch (err) {
		return { props: { errors: err.message } };
	}
};

export default defaultStyles(withAuth0(HomePage));

import React from "react";
import styled from "styled-components";
import Flipper, { IFlipper } from "../Flipper";
import timeZoneAbbrObject from "../../utils/TimeZone";
import millisecondsToDuration from "../../utils/MillsecondsToDuration";
import { zonedTimeToUtc as dayjs } from "date-fns-tz";

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: auto auto auto auto auto;
	background: #121212b8;
	padding: 0px 10px;
	color: white;
	border-radius: 3px;
	border: 2px outset #514e4e3d;
	box-shadow: 0px 0px 2px 1px #0f0f1157;
`;

const InnerShadow = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 3;
	box-shadow: inset 1px 1px 6px 4px #17090978;
`;

const AuctioDateHeader = styled.h3`
	grid-column: 1/6;
	margin: 1px 0px;
`;

const AnalogContainer = styled.div`
	position: relative;
	display: grid;
	background: #302f2f;
	border: 2px inset #383737;
	border-radius: 3px;
	padding: 0px 3px;
	grid-column: 1/6;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	z-index: 7;
`;

const Label = styled.label`
	font-size: 12px;
`;

const LocalDateDisplay = styled.div`
	grid-column: 1/6;
	font-style: italic;
	font-size: 12px;
	text-align: right;
	padding: 0px 3px;
	color: #808080cf;
`;

const FlipContainer = styled.div`
	display: flex;
	overflow: hidden;
	margin: 0px;
	padding: 0px;
`;

const AnalogFigure = styled.figure`
	overflow: hidden;
	margin: 0px;
	padding: 3px 0px;
	display: flex;
	align-items: center;
`;

interface ICountDown {
	saleDate: string;
	saleTime: string;
	timeZone: string;
}

type TDate = "month" | "day" | "hour" | "minute" | "second";

type TIntervalObject = {
	[P in TDate]: number;
};

type TPanelValues = {
	[P in TDate]: [number, number];
};

const convertToValidFormat = (date: string, format?: string) => {
	const year = date.substr(0, 4);
	const months = date.substr(4, 2);
	const days = date.substr(6, 2);
	const hour = date.substr(8, 2);
	const min = date.substr(10, 2);
	//2013-11-18 11:55
	return `${year}-${months}-${days} ${hour}:${min}`;
	console.log();
};

const defaultPanels: TPanelValues = {
	month: [0, 0],
	day: [0, 0],
	hour: [0, 0],
	minute: [0, 0],
	second: [0, 0],
};

const defaultFlipperProps: Omit<IFlipper, "index"> = {
	height: 50,
	width: "100px",
	direction: "backward",
	panelCount: 10,
};

const CountDown = (props: ICountDown) => {
	const { saleDate, saleTime, timeZone } = props;
	const [panelValues, setPanelValues] = React.useState<TPanelValues>(
		defaultPanels
	);
	const timeZoneToParseIn = timeZoneAbbrObject[timeZone];
	const date = convertToValidFormat(`${saleDate}${saleTime}`);
	const auctionday = dayjs(date, timeZoneToParseIn);

	const setTimer = (intervalToAuction: TIntervalObject) => {
		const newDictionary: TPanelValues = { ...panelValues };
		Object.keys(intervalToAuction).forEach((key) => {
			const value = intervalToAuction[key];
			newDictionary[key] = [Math.floor(value / 10), Math.floor(value % 10)];
		});
		setPanelValues(newDictionary);
	};

	const recalculate = () => {
		const now = new Date();
		//Date types can be used in simple math operations such as subtraction
		//@ts-ignore
		const difference = auctionday - now;
		const differenceToObject = millisecondsToDuration(difference);
		setTimer(differenceToObject);
	};

	React.useEffect(() => {
		setInterval(() => {
			recalculate();
		}, 200);
	}, [saleDate, saleTime, timeZone]);

	return (
		<Wrapper>
			<AuctioDateHeader>Auction Starts</AuctioDateHeader>
			<Label>Months</Label>
			<Label>Days</Label>
			<Label>Hours</Label>
			<Label>Minutes</Label>
			<Label>Seconds</Label>

			<AnalogContainer>
				<InnerShadow></InnerShadow>
				<AnalogFigure>
					<Flipper {...defaultFlipperProps} index={panelValues.month[0]} />
					<Flipper {...defaultFlipperProps} index={panelValues.month[1]} />
					<div>:</div>
				</AnalogFigure>
				<AnalogFigure>
					<Flipper {...defaultFlipperProps} index={panelValues.day[0]} />
					<Flipper {...defaultFlipperProps} index={panelValues.day[1]} />
					<div>:</div>
				</AnalogFigure>

				<AnalogFigure>
					<Flipper {...defaultFlipperProps} index={panelValues.hour[0]} />
					<Flipper {...defaultFlipperProps} index={panelValues.hour[1]} />
					<div>:</div>
				</AnalogFigure>
				<AnalogFigure>
					<Flipper {...defaultFlipperProps} index={panelValues.minute[0]} />
					<Flipper {...defaultFlipperProps} index={panelValues.minute[1]} />
					<div>:</div>
				</AnalogFigure>
				<AnalogFigure>
					<Flipper {...defaultFlipperProps} index={panelValues.second[0]} />
					<Flipper {...defaultFlipperProps} index={panelValues.second[1]} />
				</AnalogFigure>
			</AnalogContainer>

			<LocalDateDisplay>{`${auctionday.toLocaleString()}`}</LocalDateDisplay>
		</Wrapper>
	);
};

export default CountDown;

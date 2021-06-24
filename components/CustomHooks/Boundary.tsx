import React from "react";

export type TBoundriesTypes = "right" | "left" | "top" | "bottom";
export type TBoundryObject = {
	[P in TBoundriesTypes]?: number;
};
const useBoundaryCheck = (
	targetToTrack: HTMLElement,
	boundaryContainer: HTMLElement
): TBoundryObject => {
	console.log(targetToTrack, boundaryContainer);
	const target = targetToTrack?.getBoundingClientRect();
	const borders = boundaryContainer?.getBoundingClientRect();
	const [brokenBoundries, setBoundries] = React.useState<TBoundryObject>({});

	if (target) {
		const boundedProperties = {
			right: [target.right, borders.right],
			left: [target.left, borders.left],
			bottom: [target.bottom, borders.bottom],
			top: [target.top, borders.top],
		};
		Object.keys(boundedProperties).forEach((key) => {
			let difference = 0;
			switch (key) {
				case "down":
				case "right":
					console.log("down/right", boundedProperties[key], key);
					difference = boundedProperties[key][0] - boundedProperties[key][1];
					if (difference > 0) {
						brokenBoundries[key] = difference;
					}
					break;
				case "up":
				case "left":
					console.log("up/left", boundedProperties[key], key);
					difference = boundedProperties[key][0] - boundedProperties[key][1];
					if (difference < 0) {
						brokenBoundries[key] = difference;
					}
					// code block
					break;
				default:
				// code block
			}
		});
	}
	return brokenBoundries;
};

export default useBoundaryCheck;

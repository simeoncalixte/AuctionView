import { ReactType } from "react";

interface Image {
    thumbnail: string[],
    mainImage: string,
}

interface IImageCollection {
    images: {
        thumbNails: string[],
        hdImages: string[],
        standard: string[],  
    },
    count: number
}


type TCarouselOrientation = "horizonatal" | "vertical";
type TCarouselAnimation = "fadeInOut" | "slideInOut"|"slideInOutContinuation";

export interface ICarousel {
    showIndexIndicators: boolean;
    showPreviousNextIndicator: boolean;
    autoSlide: boolean;
    activeIndex: number;
    indexCount: number;
    
    children: any |any[];
    carouselOrientation:  TCarouselOrientation;
    previousNextIndicatorIcons?: {
        left: ReactType;
        rigth: ReactType;
    };
    indexIndicatorIcon?: ReactType;
    callBack: (selectedIndex: number) =>  void;
    frameBasis: number;
}
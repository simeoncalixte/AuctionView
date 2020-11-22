import { ReactType } from "react";

interface Image {
  thumbnail: string[];
  mainImage: string;
}

interface IImageCollection {
  images: {
    thumbNails: string[];
    hdImages: string[];
    standard: string[];
  };
  count: number;
}

type TCarouselOrientation = "horizonatal" | "vertical";
type TCarouselAnimation = "fadeInOut" | "slideInOut" | "slideInOutContinuation";

export interface ICarousel {
  activeIndex: number;
  showIndexIndicators?: boolean;
  showPreviousNextIndicator?: boolean;
  children: any | any[];
  carouselOrientation?: TCarouselOrientation;
  frameBasis?: number;
  callBack?: (selectedIndex: number) => void;
  lockUpdates?: (state: boolean) => void;
  previousNextIndicatorIcons?: {
    left: ReactType;
    rigth: ReactType;
  };
  indexIndicatorIcon?: ReactType;
}

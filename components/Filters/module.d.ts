export interface IRange {
  min: number;
  max: number;
}

export interface INumericalRange {
  defaultRange?: IRange;
  title: string;
  className?: string;
  onChangeCallBack: (rangeValue: IRange) => void;
}

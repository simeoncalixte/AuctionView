import DefaultButton from "./DefaultButton";

export const FacebookButton = (props: { text: string; value?: string }) => (
  <DefaultButton
    textColor={"facebook"}
    width={"50%"}
    size={"M"}
    value={props.value}
  >
    <span>{props.text}</span>
    <img src={"/images/facebook.svg"} />
  </DefaultButton>
);

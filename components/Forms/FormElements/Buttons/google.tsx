import DefaultButton from "./DefaultButton";

export const GoogleButton = (props: { text: string; value?: string }) => (
  <DefaultButton
    textColor={"facebook"}
    width={"50%"}
    size={"M"}
    value={props.value}
  >
    <span>{props.text}</span>
    <img src={"/images/google.svg"} />
  </DefaultButton>
);

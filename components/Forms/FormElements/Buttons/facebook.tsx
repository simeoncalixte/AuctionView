import DefaultButton from "./DefaultButton";

export const FacebookButton = (prop: { text: string }) => (
	<DefaultButton textColor={"facebook"} width={"50%"} size={"M"}>
		<span>{prop.text}</span>
		<img src={"/images/facebook.svg"} />
	</DefaultButton>
);

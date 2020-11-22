import DefaultButton from "./DefaultButton";

export const GoogleButton = (prop: { text: string }) => (
	<DefaultButton textColor={"facebook"} width={"50%"} size={"M"}>
		<span>{prop.text}</span>
		<img src={"/images/google.svg"} />
	</DefaultButton>
);

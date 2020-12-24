interface ILink {
	href?: string;
	isActive?: boolean;
	label?: text;
	type?: "button" | "link" | "modalButton" | "dropDown" | "custom" | undefined;
	component?: React.FunctionComponent<ILink>;
	authState?: boolean;
	dropDownItems?: ILink[];
	onClick?: (...args: any) => any;
}

interface ILinks {
	routes: ILink[];
	activeLink: string;
}

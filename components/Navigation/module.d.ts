interface ILink {
	href?: string;
	isActive?: boolean;
	children?: any;
	modal?: React.FunctionComponent;
	type?: "button" | "link" | "modalButton" | undefined;
	cb?: (e: MouseEvent<any>) => any;
	onClick?: function;
}

interface ILinks {
	routes: ILink[];
	activeLink: string;
}

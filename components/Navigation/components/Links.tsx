import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { AnchorStyles } from "../collectiveStyles";

export default (props: ILink) => {
	return (
		<Link href={props.href}>
			<AnchorStyles isActive={props.isActive}>{props.label}</AnchorStyles>
		</Link>
	);
};

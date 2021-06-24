import styled from "styled-components";

const Form = styled.form`
	box-shadow: 1px 1px 1px #fff;
	border: 2px solid #f9f9f97a;
	background: #ffffffe3;
	min-width: 250px;
	margin: 20px;
	padding: 20px;
	border-radius: 2px;
	color: #414344;
	display: grid;
	box-sizing: border-box;
	@media screen and (max-width: 400px) {
		width: 100%;
	}
`;

export default Form;

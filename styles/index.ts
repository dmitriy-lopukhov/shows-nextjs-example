import { css } from "styled-components";

export const shadow = css`
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  transition: 300ms;
`;
export const shadowPadding = css`
  ${shadow}
  padding: 0.7em 0.7em 0.7em 1.2em;
`;
export const btn = css`
  ${shadowPadding}
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid transparent;
  color: inherit;
  font-size: 1.1em;
  outline: 0;
  margin: 0.5em 0;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
  }
`;

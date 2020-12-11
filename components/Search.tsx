import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { shadowPadding } from "../styles";

const SearchContainer = styled.div`
  width: 250px;
  display: flex;
  margin: 0 auto;

  input {
    ${shadowPadding}
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid transparent;
    color: inherit;
    font-size: 1.1em;
    outline: 0;
    width: 100%;
    margin: 0.5em 0;

    &:hover,
    &:focus,
    &:active {
      border: 1px solid ${(props) => props.theme.colors.gray};
    }
  }
`;

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<string | null>>;
  setPage: Dispatch<SetStateAction<number>>;
};

const Search = ({ setQuery, setPage }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setPage(1);
  };
  return (
    <SearchContainer>
      <input type="text" onChange={handleChange} />
    </SearchContainer>
  );
};

export default Search;

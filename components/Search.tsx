import React, { Dispatch, SetStateAction } from "react";

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
    <div>
      <input type="text" onChange={handleChange} />
    </div>
  );
};

export default Search;

import React from "react";
import Link from "next/link";
import { IShow } from "../interfaces";
import styled from "styled-components";
import { getGenres } from "../utils";
import { shadow } from "../styles";

const ShowItem = styled.div`
  ${shadow}
  background: ${(props) => props.theme.colors.white};
  width: 100%;
  max-width: 270px;
  margin: 2em;
  text-align: left;

  display: flex;
  flex-direction: column;

  cursor: pointer;
  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.08);
  }
`;

const ShowBackground = styled.div.attrs<{ imageUrl: string }>(
  ({ imageUrl }) => ({
    style: {
      backgroundImage: imageUrl,
    },
  })
)<{ imageUrl: string }>`
  padding: 0;
  margin: 0;
  height: 300px;
  width: 100%;
  display: block;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-size: cover;
`;

const ShowContent = styled.div`
  padding: 18px 18px 24px 18px;
  margin: 0;
`;
const ShowContentHeader = styled.div`
  display: table;
  width: 100%;
`;
const ShowTitle = styled.div`
  font-size: 24px;
  margin: 0;
  display: table-cell;
`;
const ShowInfo = styled.div`
  display: table;
  width: 100%;
  margin-top: 1em;
`;
const ShowInfoSection = styled.div`
  display: table-cell;
  text-transform: uppercase;
  text-align: center;

  &:first-of-type {
    text-align: left;
    min-width: 50px;
  }

  &:last-of-type {
    text-align: right;
  }

  label {
    display: block;
    color: rgba(0, 0, 0, 0.5);
    margin-bottom: 0.5em;
    font-size: 9px;
  }

  span {
    font-weight: 700;
    font-size: 11px;
  }
`;

const getImageUrl = (show: IShow): string => {
  return show?.image?.medium ? `url(${show.image.medium})` : "";
};

type Props = {
  data: IShow;
};

const ListItem = ({ data }: Props) => (
  <Link href="/[id]" as={`/${data.id}`}>
    <ShowItem>
      <ShowBackground imageUrl={getImageUrl(data)}></ShowBackground>
      <ShowContent>
        <ShowContentHeader>
          <ShowTitle>
            {data.id} - {data.name}
          </ShowTitle>
        </ShowContentHeader>
        <ShowInfo>
          <ShowInfoSection>
            <label>Rating</label>
            <span>{data.rating.average}</span>
          </ShowInfoSection>
          <ShowInfoSection>
            <label>Genres</label>
            <span>{getGenres(data.genres)}</span>
          </ShowInfoSection>
        </ShowInfo>
      </ShowContent>
    </ShowItem>
  </Link>
);

export default ListItem;

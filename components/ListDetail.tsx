import Link from "next/link";
import * as React from "react";
import styled from "styled-components";
import { IShow } from "../interfaces";
import { btn, shadow } from "../styles";
import { getGenres } from "../utils";

type ListDetailProps = {
  item: IShow;
};

const ShowDetailsContainer = styled.div`
  margin: 40px;
  display: flex;
  text-align: left;
  flex-wrap: wrap;
`;

const ShowPoster = styled.img<{ src: string }>`
  ${shadow}
  width: 100%;
  height: 100%;
  max-width: 360px;
  margin-right: 80px;
  margin-bottom: 40px;
`;

const ShowContent = styled.div`
  flex: 1;
`;

const ShowTitle = styled.div`
  font-size: 36px;
  padding-bottom: 6px;
  .title {
    margin-right: 12px;
  }

  .show-year {
    font-size: 16px;
    white-space: nowrap;
  }
`;

const ShowDetails = styled.div`
  font-size: 12px;
  padding-bottom: 24px;
  margin-bottom: 12px;
  border-bottom: 1px solid ${(props) => props.theme.colors.grayLight};

  > span {
    margin-right: 20px;
  }
`;
const ShowRatings = styled.div`
  span.star {
    display: inline-block;
    margin-right: 12px;
    color: ${(props) => props.theme.colors.yellow};
    font-size: 36px;
  }

  span.score {
    font-size: 30px;
    color: #333333;
  }
`;
const ShowSynopsis = styled.div`
  margin: 24px 0px 60px;
  padding-top: 24px;
  border-top: 1px solid ${(props) => props.theme.colors.grayLight};
`;

const BackBtn = styled.div`
  a {
    ${btn};
    text-decoration: none;
    position: relative;
    padding-left: 2em;

    &:before {
      content: "⌜";
      position: absolute;
      left: 5px;
      top: 0px;
      transform: rotate(-45deg);
      font-size: 20px;
      padding: 12px;
      font-weight: 700;
    }
  }
`;

const ListDetail = ({ item: show }: ListDetailProps) => (
  <ShowDetailsContainer>
    <ShowPoster src={show.image.original} />
    <ShowContent>
      <ShowTitle>
        <span className="title">{show.name}</span>
        <span className="show-year">{show.premiered}</span>
      </ShowTitle>
      <ShowDetails>
        <span>{show.status}</span>
        <span>{show.schedule.time}</span>
        <span>{getGenres(show.genres)}</span>
      </ShowDetails>
      <ShowRatings>
        <span className="star">★</span>
        <span className="score">{show.rating.average}</span>
        <span>/ 10 (IMDB)</span>
      </ShowRatings>
      <ShowSynopsis
        dangerouslySetInnerHTML={{ __html: show.summary }}
      ></ShowSynopsis>
      <BackBtn>
        <Link href="/">
          <a>Back</a>
        </Link>
      </BackBtn>
    </ShowContent>
  </ShowDetailsContainer>
);

export default ListDetail;

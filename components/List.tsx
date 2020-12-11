import { useEffect, useRef, useState } from "react";
import { IShow, IShowsResponse } from "../interfaces";
import Search from "./Search";
import { defaultLimit } from "../utils/constants";
import { useSWRInfinite } from "swr";
import { buildQueryParams, fetcher } from "../utils";
import ListItem from "./ListItem";
import styled from "styled-components";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const ShowList = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  margin-top: 10vh;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
`;

type Props = {
  prerenderedItems: IShowsResponse;
};

const getKey = (
  pageIndex: number,
  previousPageData: IShowsResponse | null,
  query: string | null
) => {
  const page = pageIndex + 1;
  const limit = defaultLimit;
  if (
    previousPageData &&
    previousPageData.data &&
    !previousPageData.data.length
  ) {
    return null;
  }
  const url = `/api/shows?${buildQueryParams({ page, query, limit })}`;
  return url;
};

const flattenData = (data: IShowsResponse[] | undefined) =>
  (data &&
    data.reduce((res: IShow[], i) => {
      return res.concat(i.data);
    }, [])) ||
  [];

const List = ({ prerenderedItems }: Props) => {
  const [query, setQuery] = useState<string | null>(null);
  const [total, setTotal] = useState(prerenderedItems?.total ?? 0);
  const { isBottom } = useInfiniteScroll();
  const didMount = useRef(false);

  useEffect(() => {
    didMount.current = true;
  }, []);

  const initialData = didMount.current ? undefined : [prerenderedItems];

  const { data, error, size, setSize } = useSWRInfinite<IShowsResponse>(
    (pageIndex, previousPageData) => getKey(pageIndex, previousPageData, query),
    fetcher
  );

  const items: IShow[] = flattenData(data ?? initialData);
  const loading = !items && !error;

  useEffect(() => {
    const count = (data && data[0].total) || 0;
    setTotal(count);
  }, [data]);

  useEffect(() => {
    if (isBottom && !(total < size * defaultLimit)) {
      setSize((page) => page + 1);
    }
  }, [isBottom]);

  return (
    <div>
      <Search setQuery={setQuery} setPage={setSize}></Search>
      <ShowList>
        {loading ? (
          <div>LOADING</div>
        ) : (
          items.map((i) => <ListItem key={i.id} data={i} />)
        )}
      </ShowList>
    </div>
  );
};

export default List;

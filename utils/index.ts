import { IShow } from "../interfaces";
import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

export const buildQueryParams = (params: {
  [key: string]: number | string | null | undefined;
}) => {
  return (
    params &&
    Object.keys(params)
      .reduce((res: string[], key) => {
        if (
          params[key] !== null &&
          params[key] !== undefined &&
          params[key] !== ""
        ) {
          const item = `${key}=${params[key]}`;
          res.push(item);
        }
        return res;
      }, [])
      .join("&")
  );
};

export const filterByQuery = (item: IShow, query: string) => {
  return query ? item.name.toLowerCase().includes(query.toLowerCase()) : true;
};

export const isShowsArray = (data: any): data is IShow[] => {
  return Array.isArray(data) && "id" in data[0] && "genres" in data[0];
};

export const fetcher = <T>(url: string): Promise<T> =>
  fetch(url).then((r) => r.json());

export const initMiddleware = (middleware: (...args: any) => void) => {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};

export const getGenres = (genres: string[]): string => {
  return (genres && genres.join(", ")) || "-";
};

export const useMounted = () => process.browser;

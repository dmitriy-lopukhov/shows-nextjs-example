import { NextApiRequest, NextApiResponse } from "next";
import shows from "../../../data.json";
import { IShow, IShowsResponse } from "../../../interfaces";
import { initMiddleware, filterByQuery, isShowsArray } from "../../../utils";
import { defaultLimit, defaultPage } from "../../../utils/constants";
import Cors from "cors";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "OPTIONS"],
  })
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  try {
    const {
      query: {
        page = defaultPage.toString(),
        limit = defaultLimit.toString(),
        query = "",
      },
    } = req;
    if (!isShowsArray(shows)) {
      throw new Error("Cannot find shows data");
    }
    if (
      typeof page === "string" &&
      typeof limit === "string" &&
      typeof query === "string" &&
      Math.sign(+page) &&
      Math.sign(+limit)
    ) {
      const start = (+page - 1) * +limit;
      const end = start + +limit;
      const filteredShows = query
        ? shows.filter((i: IShow) => filterByQuery(i, query))
        : shows;
      const total = query ? filteredShows.length : shows.length;
      const body: IShowsResponse = {
        total,
        data: filteredShows.slice(start, end),
      };
      res.status(200).json(body);
    } else {
      throw new Error("incorrect params");
    }
  } catch (err) {
    if (err.message) {
      res.status(400).json({ statusCode: 400, message: err.message });
    } else {
      res.status(500).json({ statusCode: 500, error: err });
    }
  }
};

export default handler;

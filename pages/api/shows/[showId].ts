import { NextApiRequest, NextApiResponse } from "next";
import shows from "../../../data.json";
import { initMiddleware } from "../../../utils";

import Cors from "cors";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "OPTIONS"],
  })
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  switch (req.method) {
    case "GET":
      try {
        const {
          query: { showId },
        } = req;
        if (!Array.isArray(shows)) {
          throw new Error("Cannot find show data");
        }
        if (showId === undefined || typeof showId !== "string") {
          throw new Error("showId is incorrect");
        }
        const show = shows.find((i) => i.id === +showId);

        if (show) {
          res.setHeader("Cache-Control", "max-age=180000");
          res.status(200).json(show);
        } else {
          res.status(404).end();
        }
      } catch (err) {
        res.status(500).json({ statusCode: 500, message: err.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

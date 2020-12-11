import * as React from "react";
import { IShow } from "../interfaces";

type ListDetailProps = {
  item: IShow;
};

const ListDetail = ({ item: show }: ListDetailProps) => (
  <div>
    <h1>Detail for {show.name}</h1>
    <p>ID: {show.id}</p>
  </div>
);

export default ListDetail;

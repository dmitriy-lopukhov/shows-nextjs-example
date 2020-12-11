import { GetServerSideProps } from "next";

import Layout from "../components/Layout";
import ListDetail from "../components/ListDetail";
import { IShow } from "../interfaces";
import { server } from "../config";
import { fetcher } from "../utils";

type Props = {
  data?: IShow;
  error?: string;
};

const StaticPropsDetail = ({ data, error }: Props) => {
  if (error) {
    return (
      <Layout title="Error">
        <p>
          <span style={{ color: "red" }}>Error:</span> {error}
        </p>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${
        data ? data.name : "Show Detail"
      } | Next.js + TypeScript Example`}
    >
      {data && <ListDetail item={data} />}
    </Layout>
  );
};

export default StaticPropsDetail;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  try {
    const data = await fetcher<IShow>(`${server}/api/shows/${id}`);
    return { props: { data } };
  } catch (error) {
    return { props: { error: "Something went wrong" } };
  }
};

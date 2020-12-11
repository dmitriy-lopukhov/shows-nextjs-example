import { GetServerSideProps, NextPage } from "next";
import Layout from "../components/Layout";
import List from "../components/List";
import { server } from "../config";
import { IShowsResponse } from "../interfaces";
import { fetcher } from "../utils";

type Props = {
  data: IShowsResponse;
};

const IndexPage: NextPage<Props> = ({ data }) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Shows</h1>
      <List prerenderedItems={data} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await fetcher<IShowsResponse>(`${server}/api/shows`);
    return { props: { data } };
  } catch (error) {
    return {
      props: {
        data: {
          total: 0,
          data: [],
        },
      },
    };
  }
};

export default IndexPage;

import React from "react";
import { graphql, PageProps } from "gatsby";

import FeelGoodPostList, { FeelGoodPost } from "../components/FeelGoodPostList";
import { IndexPageLayout } from "../components/layout/indexPage";

const IndexPage: React.FC<PageProps<pageQueryData>> = props => {
  // Extract the posts from the GraphQL data
  const posts: FeelGoodPost[] = props.data.allFile.edges.map(edge => ({
    ...edge.node.fields.post,
    name: edge.node.name
  }));

  return (
    <IndexPageLayout>
      <FeelGoodPostList posts={posts} />
    </IndexPageLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query MyQuery {
    allFile(
      filter: { sourceInstanceName: { eq: "posts" } }
      sort: { fields: birthTime, order: DESC }
    ) {
      edges {
        node {
          fields {
            post {
              summary
              title
              type
            }
          }
          name
        }
      }
    }
  }
`;

type pageQueryData = {
  allFile: {
    edges: {
      node: {
        fields: {
          post: FeelGoodPost;
        };
        name: string;
      };
    }[];
  };
};

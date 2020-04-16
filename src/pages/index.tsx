import React, { useState } from "react";
import { graphql, PageProps } from "gatsby";

import FeelGoodPostList, { FeelGoodPost } from "../components/FeelGoodPostList";
import { IndexPageLayout } from "../components/layout/indexPage";
import { FlowingBackground } from "../components/FlowingBackground";

const IndexPage: React.FC<PageProps<pageQueryData>> = props => {
  // Extract the posts from the GraphQL data
  const posts: FeelGoodPost[] = props.data.allFile.edges
    .map(edge => ({
      ...edge.node.fields.post,
      name: edge.node.name
    }))
    // TODO: Enable this once every post has a "public" field
    .filter(post => post.public);

  const [currentPostNumber, setCurrentPostNumber] = useState(0);

  const scrollHandler = React.useCallback(
    postNumber => setCurrentPostNumber(postNumber),
    [posts.length]
  );

  return (
    <FlowingBackground count={currentPostNumber}>
      <IndexPageLayout>
        <FeelGoodPostList posts={posts} scrollPostHandler={scrollHandler} />
      </IndexPageLayout>
    </FlowingBackground>
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
              url
              public
              source
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

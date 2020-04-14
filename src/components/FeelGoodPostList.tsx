import React from "react";
import {
  VerticalSnapContainer,
  SnapItem,
  SpecialSnapItem,
  FlexCenter
} from "./layout/indexPage";
import { FeelGoodPostItem } from "./PostItem";
import { graphql, useStaticQuery } from "gatsby";

type BasePost = {
  title: string;
  summary: string;
  type: string;
  name: string;
  url?: string;
  public: boolean;
  source: string;
};

export type TextPost = BasePost & {
  type: "text";
};

export type ArticlePost = BasePost & {
  type: "article";
  url: string;
};

export type TweetPost = BasePost & {
  type: "tweet";
  url: string;
};

export type ImagePost = BasePost & {
  type: "image";
  url: string;
};

export type FeelGoodPost = TextPost | ArticlePost | TweetPost | ImagePost;

const FeelGoodPostList: React.FC<{
  posts: FeelGoodPost[];
  scrollPostHandler: (scrollNumber: number) => void;
}> = props => {
  // Just used to get the title of the page
  const metadata = useStaticQuery<{
    site: {
      siteMetadata: { title: string };
    };
  }>(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `).site.siteMetadata;

  console.log(metadata);
  // Keep track of the previous visible post
  const [currentPost, setCurrentPost] = React.useState(0);

  /**
   * When provided the height of element and current location, it determines the currently visible post and notifies the parent
   * *if* the scrolled position is different
   */
  const currentVisiblePost = React.useCallback(
    (scrollHeight: number, scrollLocation: number) => {
      const newPostScrollPosition = Math.round(
        scrollLocation / (scrollHeight / (props.posts.length + 2))
      );
      if (newPostScrollPosition !== currentPost) {
        props.scrollPostHandler(newPostScrollPosition);
        setCurrentPost(newPostScrollPosition);
      }
    },
    [props.posts.length, currentPost]
  );

  return (
    <VerticalSnapContainer
      onScroll={e =>
        currentVisiblePost(
          e.currentTarget.scrollHeight,
          e.currentTarget.scrollTop
        )
      }
    >
      <SpecialSnapItem>
        <FlexCenter>
          <h1>Welcome to {metadata.title}💛</h1>
        </FlexCenter>
      </SpecialSnapItem>
      {props.posts.map(post => (
        <SnapItem key={post.name}>
          <FeelGoodPostItem post={post} />
        </SnapItem>
      ))}
      <SpecialSnapItem>
        <FlexCenter>
          <h1>
            That is all for today! Come back tomorrow for more good vibes 💛
          </h1>
        </FlexCenter>
      </SpecialSnapItem>
    </VerticalSnapContainer>
  );
};

export default FeelGoodPostList;

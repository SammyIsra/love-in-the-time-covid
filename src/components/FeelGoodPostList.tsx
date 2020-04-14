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
          <h3>We're glad you're here.</h3> 
          <h5>
            Times are tough right now and it's easy to be overwhelmed. However, amidst the bad, there is still <b>good.</b>
            Scroll through the below stack of stories for a quick and uplifting mindfulness break. 
          </h5>
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
            That's all for now! 💛
          </h1>
          <h5> 
              We'll be continuously updating these stories, so check back soon for fresh content and
              to see those recovery counters go up. Have a great day, and don't forget, we will get through this together. 
          </h5>
        </FlexCenter>
      </SpecialSnapItem>
    </VerticalSnapContainer>
  );
};

export default FeelGoodPostList;

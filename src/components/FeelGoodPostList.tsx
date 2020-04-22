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
  publishDate: string;
};

export type TextPost = BasePost & {
  type: "text";
};

export type PromptPost = BasePost & {
  type: "prompt";
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

export type FeelGoodPost =
  | TextPost
  | ArticlePost
  | TweetPost
  | ImagePost
  | PromptPost;

/** Determines the frequency of how often */
const PromptFrequency = 4;

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

  // Keep track of the previous visible post
  const [currentPost, setCurrentPost] = React.useState(0);

  // List of posts interlaced with prompts
  const [orderedPosts, setOrderedPosts] = React.useState<FeelGoodPost[]>([]);

  // UseEffect to set the interlaced OrderedPosts
  React.useEffect(() => {
    // Filter prompts and every other type of post
    let { prompts, notPrompts } = props.posts.reduce<{
      prompts: FeelGoodPost[];
      notPrompts: FeelGoodPost[];
    }>(
      (acc, current) => {
        // If type of post is "prompt", add to prompt list
        if (current.type === "prompt")
          return {
            prompts: [...acc.prompts, current],
            notPrompts: acc.notPrompts
          };
        // Otherwise, add to the list of every other kind of post
        else
          return {
            notPrompts: [...acc.notPrompts, current],
            prompts: acc.prompts
          };
      },
      { prompts: [], notPrompts: [] }
    );

    // Interlace prompts into every other post. Frequency defined by PromptFrequency
    setOrderedPosts(
      notPrompts.reduce<{
        array: FeelGoodPost[];
        promptInterval: number;
      }>(
        (acc, cur) => {
          if (acc.promptInterval >= PromptFrequency && prompts.length > 0) {
            return {
              promptInterval: 0,
              array: [...acc.array, prompts.shift(), cur]
            };
          } else {
            return {
              promptInterval: acc.promptInterval + 1,
              array: [...acc.array, cur]
            };
          }
        },
        { array: [], promptInterval: 0 }
      ).array
    );
  }, [props.posts.length]);

  /**
   * When provided the height of element and current location, it determines the currently visible post and notifies the parent
   * *if* the scrolled position is different
   */
  const currentVisiblePost = React.useCallback(
    (scrollHeight: number, scrollLocation: number) => {
      // Get the current position of the scrollbar
      const newPostScrollPosition = Math.round(
        scrollLocation / (scrollHeight / (orderedPosts.length + 2))
      );
      // If the post is different than the previous one, notify the event handler
      if (newPostScrollPosition !== currentPost) {
        props.scrollPostHandler(newPostScrollPosition);
        setCurrentPost(newPostScrollPosition);
      }
    },
    [orderedPosts.length, currentPost]
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
        <FeelGoodPostItem
          post={{
            type: "text" as const,
            public: true,
            publishDate: "doesn't matter",
            title: "Hi, we're glad you're here. 💛",
            summary:
              "Times are tough right now and it's easy to be overwhelmed. However, amidst the bad, there is still good. " +
              "Scroll through the below stack of stories for a quick and uplifting mindfulness break.",
            name: "welcome-post",
            source: ""
          }}
        />
      </SpecialSnapItem>
      {(orderedPosts || []).map(post => (
        <SnapItem key={post.name}>
          <FeelGoodPostItem post={post} />
        </SnapItem>
      ))}
      <SpecialSnapItem>
        <FeelGoodPostItem
          post={{
            type: "text" as const,
            public: true,
            publishDate: "doesn't matter",
            title: "Come again soon! 💛",
            summary:
              "That's all for now, though we'll be working to continuously update these stories. Check back soon for fresh content! 🍆 " +
              "Have a great day, and don't forget, we will get through this together.",
            name: "farewell-post",
            source: ""
          }}
        />
      </SpecialSnapItem>
    </VerticalSnapContainer>
  );
};

export default FeelGoodPostList;

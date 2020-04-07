import React from "react";
import { VerticalSnapContainer, SnapItem } from "./layout/indexPage";

type BasePost = {
  title: string;
  summary: string;
  type: string;
};

type TextPost = BasePost & {
  type: "text";
};

type ArticlePost = BasePost & {
  type: "article";
};

type TweetPost = BasePost & {
  type: "tweet";
};

type ImagePost = BasePost & {
  type: "image";
};

export type FeelGoodPost = TextPost | ArticlePost | TweetPost | ImagePost;

const FeelGoodPostList: React.FC<{
  posts: FeelGoodPost[];
}> = (props) => {
  console.log(props);
  return (
    <VerticalSnapContainer>
      {props.posts.map((post) => (
        <SnapItem>{post.title}</SnapItem>
      ))}
    </VerticalSnapContainer>
  );
};

export default FeelGoodPostList;

import React from "react";
import { FeelGoodPost, TextPost, ArticlePost } from "./FeelGoodPostList";
import { FlexCenter } from "./layout/indexPage";

export const FeelGoodPostItem: React.FC<{ post: FeelGoodPost }> = props => {
  switch (props.post.type) {
    case "text":
      return <FeelGoodText post={props.post} />;
    case "article":
      return <FeelGoodArticle post={props.post} />;
    default:
      return <p>idk something else</p>;
  }
};

const FeelGoodText: React.FC<{ post: TextPost }> = props => {
  const ref = React.useRef<HTMLDivElement>();

  return (
    <FlexCenter id={props.post.name} ref={ref}>
      <h2>{props.post.title}</h2>
      <p>{props.post.summary}</p>
      <ConditionalSource source={props.post.source} />
    </FlexCenter>
  );
};

const FeelGoodArticle: React.FC<{ post: ArticlePost }> = props => {
  return (
    <FlexCenter id={props.post.name}>
      <h2>
        <a href={props.post.url}>{props.post.title}</a>
      </h2>
      <p>{props.post.summary}</p>
      <ConditionalSource source={props.post.source} />
    </FlexCenter>
  );
};

const ConditionalSource: React.FC<{ source: string }> = ({ source }) => {
  return source ? <p>-{source}</p> : null;
};

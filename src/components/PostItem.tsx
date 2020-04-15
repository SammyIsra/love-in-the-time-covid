import React from "react";
import {
  FeelGoodPost,
  TextPost,
  ArticlePost,
  ImagePost
} from "./FeelGoodPostList";
import { FlexCenter } from "./layout/indexPage";
import styled from "styled-components";

export const FeelGoodPostItem: React.FC<{ post: FeelGoodPost }> = props => {
  switch (props.post.type) {
    case "text":
      return <FeelGoodText post={props.post} />;
    case "article":
      return <FeelGoodArticle post={props.post} />;
    case "image":
      return <FeelGoodImage post={props.post} />;
    default:
      return null;
  }
};

/**
 * Used when the type of post is a Text
 * @param props
 */
const FeelGoodText: React.FC<{ post: TextPost }> = props => {
  return (
    <FlexCenter id={props.post.name}>
      <h2>{props.post.title}</h2>
      <p>{props.post.summary}</p>
      <ConditionalSource source={props.post.source} />
    </FlexCenter>
  );
};

/**
 * Used when the type of post is an Article.
 * We hope that the "source" is present but we cannot make sure.
 * @param props
 */
const FeelGoodArticle: React.FC<{ post: ArticlePost }> = props => {
  return (
    <FlexCenter id={props.post.name}>
      <h2>{props.post.title}</h2>
      <p>{props.post.summary}</p>
      <p>
        <a href={props.post.url} target="_blank">
          -{props.post.source || "Read more here"}
        </a>
      </p>
    </FlexCenter>
  );
};

/**
 * Used when the type of Post is an Image.
 * @param props
 */
const FeelGoodImage: React.FC<{ post: ImagePost }> = props => {
  return (
    <FlexCenter id={props.post.name}>
      <Img src={props.post.url} alt={props.post.title} />
      <h2>{props.post.title}</h2>
      <p>{props.post.summary}</p>
    </FlexCenter>
  );
};

const Img = styled.img`
  max-height: 75%;
  max-width: 100%;
`;

const ConditionalSource: React.FC<{ source: string }> = ({ source }) => {
  return source ? <p>-{source}</p> : null;
};

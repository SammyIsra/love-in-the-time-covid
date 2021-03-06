import React from "react";
import {
  FeelGoodPost,
  TextPost,
  ArticlePost,
  ImagePost,
  PromptPost
} from "./FeelGoodPostList";
import { FlexCenter } from "./layout/indexPage";
import styled from "styled-components";

/**
 * Receives any item of type FellGoodPosts and triages the post to the correct component.
 *  Currently, only uses posts of type Prompt, Text, Article, and Image,
 *  all other posts are ignored.
 * @param props
 */
export const FeelGoodPostItem: React.FC<{ post: FeelGoodPost }> = props => {
  switch (props.post.type) {
    case "prompt":
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
 * Used when the of post is a Text
 * The type of post can also be a Prompt, which is functionally identical to a Text one
 * @param props
 */
const FeelGoodText: React.FC<{ post: TextPost | PromptPost }> = props => {
  return (
    <FlexCenter id={props.post.name}>
      <h2>{props.post.title}</h2>
      <p>{props.post.summary}</p>
      <ConditionalSource source={props.post.source} />
    </FlexCenter>
  );
};

/**
 * Used when the post is an Article.
 * We hope that the "source" is present but we cannot be sure.
 * @param props
 */
const FeelGoodArticle: React.FC<{ post: ArticlePost }> = props => {
  return (
    <FlexCenter id={props.post.name}>
      <h2>{props.post.title}</h2>
      <p>{props.post.summary}</p>
      <Source>
        <a href={props.post.url} target="_blank">
          More here
        </a>
      </Source>
    </FlexCenter>
  );
};

/**
 * Used when the post is an Image.
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

const Source = styled.p`
  > a {
    font-style: italic;
    font-size: 1.05rem;
  }
`;

/** Helper function to deal with source display when the source is optional */
const ConditionalSource: React.FC<{ source?: string }> = ({ source }) => {
  return source ? <p>-{source}</p> : null;
};

import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";

export type GetOptimizedGradientsResult = {
  allFile: {
    edges: {
      node: {
        childImageSharp: {
          fixed: ImageFormat;
        };
      };
    }[];
  };
};

export type ImageFormat = {
  base64: string;
  src: string;
};

/**
 * Component that allows for the flow of background images as the posts are scrolled
 * @param props
 */
export const FlowingBackground: React.FC<{
  count: number;
}> = props => {
  const query = useStaticQuery<GetOptimizedGradientsResult>(graphql`
    query GetOptimizedGradients {
      allFile(filter: { sourceInstanceName: { eq: "gradientImages" } }) {
        edges {
          node {
            childImageSharp {
              fixed(width: 1000) {
                base64
                src
              }
            }
          }
        }
      }
    }
  `);

  const [backgrounds] = useState<ImageFormat[]>(() =>
    extractBackgrounds(query)
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url("${
          backgrounds[props.count % backgrounds.length]?.base64
        }")`,
        backgroundColor: "#fff385",
        backgroundSize: "cover",
        transition: "background-image 0.5s ease-in-out"
      }}
    >
      {props.children}
    </div>
  );
};

export function extractBackgrounds(
  query: GetOptimizedGradientsResult
): ImageFormat[] {
  return query.allFile.edges.map(edge => edge.node.childImageSharp.fixed);
}

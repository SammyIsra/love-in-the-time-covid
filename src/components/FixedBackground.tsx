import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import {
  GetOptimizedGradientsResult,
  extractBackgrounds,
  ImageFormat
} from "./FlowingBackground";

/**
 * Component that allows for the for a single background from the list of our gradients
 * @param props
 */
export const FixedBackground: React.FC = props => {
  const query = useStaticQuery<GetOptimizedGradientsResult>(graphql`
    query GetOptimizedGradientsForFixed {
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

  const [background] = React.useState<ImageFormat>(() => {
    const backgrounds = extractBackgrounds(query);
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
  });

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url("${background.base64}")`,
        backgroundColor: "#fff385",
        backgroundSize: "cover",
        transition: "background-image 0.5s ease-in-out"
      }}
    >
      {props.children}
    </div>
  );
};

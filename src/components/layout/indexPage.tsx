import React from "react";
import styled from "styled-components";
import { RecoveredCount } from "../RecoveredCount";
import { Helmet } from "react-helmet";

import LogoPositive from "../../img/logo_positive.svg";
import { useStaticQuery, graphql, Link } from "gatsby";

export const IndexPageLayout: React.FC<{
  currentPage: "about" | "home";
}> = function(props) {
  // Just used to get the title of the page
  const metadata = useStaticQuery<{
    site: {
      siteMetadata: {
        title: string;
        image: string;
        description: string;
      };
    };
  }>(graphql`
    query {
      site {
        siteMetadata {
          title
          image
          description
        }
      }
    }
  `).site.siteMetadata;

  return (
    <LayoutBody>
      <Helmet>
        <title>{metadata.title}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="shortcut icon" href={metadata.image} type="image/x-icon" />
        <meta name="description" content={metadata.description}></meta>
      </Helmet>
      <LogoCorner>
        <img src={LogoPositive} alt="Heart in a chat bubble" width="100%" />
      </LogoCorner>
      <NavCorner>
        {props.currentPage === "home" ? (
          <Link to="/about">About</Link>
        ) : (
          <Link to="/">Home</Link>
        )}
      </NavCorner>
      <IndexBody>{props.children}</IndexBody>
      <RecoveredCorner>
        <RecoveredCount />
      </RecoveredCorner>
    </LayoutBody>
  );
};

const IndexBody = styled.div`
  width: auto;
  height: 100%;
  grid-column: 1 / 6;
  grid-row: 2/5;
  margin-left: 1.5rem;
  margin-right: 1.5rem;

  @media (min-width: 650px) {
    grid-column: 2 / 5;
  }

  @media (min-width: 775px) {
    grid-column: 3;
  }
`;

export const VerticalSnapContainer = styled.div`
  height: 100%;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0 !important;
  }
`;

export const SnapItem = styled.div`
  height: 100%;
  scroll-snap-align: center;
  scroll-snap-stop: always;
`;

const LayoutBody = styled.div`
  font-family: "Work Sans", sans-serif;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: grid;
  grid-template-rows: minmax(5rem, 10rem) 1fr 3fr 2fr minmax(5rem, 10rem);
  grid-template-columns: minmax(5rem, 10rem) 1fr 5fr 1fr minmax(5rem, 10rem);
`;

export const SpecialSnapItem = styled(SnapItem)``;

export const FlexCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  max-height: 100%;
  align-items: center;
  text-align: center;

  > p {
    margin-block-start: 0rem;
  }
`;

const PaddedCorner = styled.div`
  padding: 1.75rem;

  @media (min-width: 575px) {
    padding: 2rem;
  }
`;

const LogoCorner = styled(PaddedCorner)`
  grid-row: 1;
  grid-column: 1;
  max-width: 200px;

  @media (min-width: 450px) {
    max-width: 200px;
  }
`;

const RecoveredCorner = styled(PaddedCorner)`
  grid-row: 5;
  grid-column: 1 / 6;

  @media (min-width: 575px) {
    grid-column: 1 / 3;
  }
`;

const NavCorner = styled(PaddedCorner)`
  grid-row: 1;
  grid-column: 5;

  > a {
    text-decoration: none;

    &:hover {
      opacity: 0.7;
    }
  }
`;

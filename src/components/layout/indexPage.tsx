import React from "react";
import styled from "styled-components";
import { RecoveredCount } from "../RecoveredCount";
import { VisitorCount } from "../VisitorCount";
import { Helmet } from "react-helmet";

import LogoPositive from "../../img/logo_positive.svg";

export const IndexPageLayout: React.FC = function(props) {
  return (
    <LayoutBody>
      <Helmet>
        <title>CoVibes</title>
        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans&display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      <PaddedCorner style={{ gridRow: 1, gridColumn: 1 }}>
        <img src={LogoPositive} alt="Heart in a chat bubble" width="100%" />
      </PaddedCorner>
      <PaddedCorner style={{ gridRow: 1, gridColumn: 5 }}>About</PaddedCorner>
      <IndexBody>{props.children}</IndexBody>
      <PaddedCorner style={{ gridRow: 5, gridColumn: "1 / 3" }}>
        <RecoveredCount />
      </PaddedCorner>
      <PaddedCorner style={{ gridRow: 5, gridColumn: 5 }}>
        <VisitorCount />
      </PaddedCorner>
    </LayoutBody>
  );
};

const IndexBody = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 1 / 6;
  grid-row: 2/5;

  @media (min-width: 550px) {
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
`;

const LayoutBody = styled.div`
  font-family: "Work Sans", sans-serif;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: grid;
  grid-template-rows: 10rem 1fr 3fr 2fr 10rem;
  grid-template-columns: 10rem 1fr 5fr 1fr 10rem;
`;

export const SpecialSnapItem = styled(SnapItem)``;

export const FlexCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  max-height: 100%;
  align-items: center;
`;

const PaddedCorner = styled.div`
  padding: 2rem;
`;

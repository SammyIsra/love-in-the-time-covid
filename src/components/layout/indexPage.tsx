import React from "react";
import styled from "styled-components";
import { RecoveredCount } from "../RecoveredCount";
import { VisitorCount } from "../VisitorCount";

export const IndexPageLayout: React.FC = function(props) {
  return (
    <LayoutBody>
      <div style={{ gridRow: 1, gridColumn: 1 }}>Logo goes here</div>
      <div style={{ gridRow: 1, gridColumn: 5 }}>About</div>
      <IndexBody>{props.children}</IndexBody>
      <div style={{ gridRow: 5, gridColumn: 1 }}>
        <RecoveredCount />
      </div>
      <div style={{ gridRow: 5, gridColumn: 5 }}>
        <VisitorCount />
      </div>
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
    grid-row: 3;
  }
`;

export const VerticalSnapContainer = styled.div`
  height: 100%;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
`;

export const SnapItem = styled.div`
  height: 100%;
  scroll-snap-align: center;
`;

const LayoutBody = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: grid;
  grid-template-rows: 10rem 1fr 3fr 2fr 10rem;
  grid-template-columns: 10rem 1fr 5fr 1fr 10rem;
`;

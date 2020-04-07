import React from "react";
import styled from "styled-components";

export const IndexPageLayout: React.FC = function(props) {
  return (
    <LayoutBody>
      <div style={{ gridRow: 1, gridColumn: 1 }}>Logo Here</div>
      <div style={{ gridRow: 1, gridColumn: 5 }}>About</div>
      <div style={{ width: "100%", height: "100%", gridRow: 3, gridColumn: 3 }}>
        {props.children}
      </div>
      <div style={{ gridRow: 5, gridColumn: 1 }}>Recovered Count</div>
      <div style={{ gridRow: 5, gridColumn: 5 }}>Visitor Count</div>
    </LayoutBody>
  );
};

export const VerticalSnapContainer = styled.div`
  scroll-snap-type: y mandatory;
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
  grid-template-rows: 10rem 1fr minmax(300px, 1fr) 1fr 10rem;
  grid-template-columns: 10rem auto minmax(300px, 1fr) auto 10rem;
`;

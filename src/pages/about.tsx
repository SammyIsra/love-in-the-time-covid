import * as React from "react";
import { graphql, PageProps } from "gatsby";

import { IndexPageLayout, FlexCenter } from "../components/layout/indexPage";
import { FixedBackground } from "../components/FixedBackground";

const AboutPage: React.FC<PageProps> = props => {
  return (
    <FixedBackground>
      <IndexPageLayout currentPage="about">
        <FlexCenter>
          <h1>Want to lend a hand?</h1>
          <p>
            For basics and other resources,{" "}
            <a href="https://coronavirus.jhu.edu/#covid-19-basics">here</a> is a
            good starting point. If you have any good news or personal stories
            to share, feel free to{" "}
            <a href="mailto:helenlyhuang@gmail.com">email</a> or{" "}
            <a href="https://twitter.com/herenhuang">tweet</a> at me so it can
            be included in the stack!
          </p>
        </FlexCenter>
      </IndexPageLayout>
    </FixedBackground>
  );
};

export default AboutPage;

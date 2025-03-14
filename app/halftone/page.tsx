"use client";

import styled from "@emotion/styled";
import dynamic from "next/dynamic";

const HalftoneScene = dynamic(
  () => import("@/components/module/HalftoneScene"),
  {
    ssr: false,
  }
);

const HalftonePage = () => {
  return (
    <Container>
      <section style={{ width: "100vw", height: "100vh" }}>
        <HalftoneScene />
      </section>
    </Container>
  );
};

export default HalftonePage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

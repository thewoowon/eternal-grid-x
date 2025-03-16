"use client";

import styled from "@emotion/styled";
import dynamic from "next/dynamic";

const RagingScene = dynamic(
  () => import("@/components/module/RagingScene"),
  {
    ssr: false,
  }
);

const RagingPage = () => {
  return (
    <Container>
      <section style={{ width: "100vw", height: "100vh" }}>
        <RagingScene />
      </section>
    </Container>
  );
};

export default RagingPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

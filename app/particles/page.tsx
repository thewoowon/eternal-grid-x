"use client";

import styled from "@emotion/styled";
import dynamic from "next/dynamic";

const ParticlesScene = dynamic(
  () => import("@/components/module/ParticlesScene"),
  {
    ssr: false,
  }
);

const ParticlesPage = () => {
  return (
    <Container>
      <section style={{ width: "100vw", height: "100vh" }}>
        <ParticlesScene />
      </section>
    </Container>
  );
};

export default ParticlesPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

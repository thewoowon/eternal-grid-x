"use client";

import styled from "@emotion/styled";
import dynamic from "next/dynamic";

const HologramScene = dynamic(
  () => import("@/components/module/HologramScene"),
  {
    ssr: false,
  }
);

const HologramPage = () => {
  return (
    <Container>
      <section style={{ width: "100vw", height: "100vh" }}>
        <HologramScene />
      </section>
    </Container>
  );
};

export default HologramPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

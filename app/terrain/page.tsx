"use client";

import styled from "@emotion/styled";
import dynamic from "next/dynamic";

const TerrainScene = dynamic(() => import("@/components/module/TerrainScene"), {
  ssr: false,
});

const TerrainPage = () => {
  return (
    <Container>
      <section style={{ width: "100vw", height: "100vh" }}>
        <TerrainScene />
      </section>
    </Container>
  );
};

export default TerrainPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

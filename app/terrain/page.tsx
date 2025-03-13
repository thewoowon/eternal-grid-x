"use client";

import styled from "@emotion/styled";

const TerrainPage = () => {
  return (
    <Container>
      <h1
        style={{
          color: "white",
          fontSize: "3rem",
        }}
      >
        Terrain
      </h1>
    </Container>
  );
};

export default TerrainPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

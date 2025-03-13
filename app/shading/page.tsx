"use client";

import styled from "@emotion/styled";

const ShadingPage = () => {
  return (
    <Container>
      <h1
        style={{
          color: "white",
          fontSize: "3rem",
        }}
      >
        Shading
      </h1>
    </Container>
  );
};

export default ShadingPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

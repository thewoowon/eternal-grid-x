"use client";

import styled from "@emotion/styled";

const RagingPage = () => {
  return (
    <Container>
      <h1
        style={{
          color: "white",
          fontSize: "3rem",
        }}
      >
        Raging
      </h1>
    </Container>
  );
};

export default RagingPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

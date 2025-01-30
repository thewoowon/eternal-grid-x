import styled from "@emotion/styled";

const GNB = () => {
  return <Container></Container>;
};

export default GNB;

const Container = styled.div`
  width: 100%;
  height: 88px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  background-color: white;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  overflow: hidden;
  z-index: 10;
`;

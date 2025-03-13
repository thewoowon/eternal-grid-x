import Logo from "@/components/svg/Logo";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <Container>
      <Wrapper>
        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            router.push("/");
          }}
        >
          <Logo width={100} />
        </div>
        <FlexBox>
          <Link href="/halftone">Halftone</Link>
          <Link href="/hologram">Hologram</Link>
          <Link href="/particles">Particles</Link>
          <Link href="/raging">Raging</Link>
          <Link href="/shading">Shading</Link>
          <Link href="/terrain">Terrain</Link>
        </FlexBox>
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  padding: 20px 16px;
  height: 57px;
  background-color: #000;
  z-index: 100;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

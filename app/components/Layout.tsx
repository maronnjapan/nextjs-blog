import { AppProps } from "next/app";
import Head from "next/head";
import styled from "styled-components";

const name = "Shin Code";
const titleName = "Next.js blog";

const Container = styled.div`
  max-width: 1244px;
  padding: 1rem;
  margin: 3rem auto 6rem;
`;
const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircleImg = styled.img`
  border-radius: 1000px;
`;

const HeaddingXl = styled.h1`
  font-size: 2rem;
  line-height: 1.3;
  font-weight: 800;
  letter-spacing: -0.05rem;
  margin: 1rem 0;
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>{titleName}</title>
      </Head>
      <main>{children}</main>
    </Container>
  );
};

export default Layout;

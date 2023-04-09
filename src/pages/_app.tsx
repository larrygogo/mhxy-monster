import type {AppProps} from 'next/app'
import WindowWrapper from "@/src/components/window-wrapper";
import Layout from "@/src/layout/Layout";
import {createGlobalStyle} from "styled-components";

// styled GlobalStyle
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

export default function App({Component, pageProps}: AppProps) {
  return (
    <WindowWrapper>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WindowWrapper>
  )
}

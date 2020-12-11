import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    text-align: center;
    box-sizing: border-box;
    background-color: #f6f6f9;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
  }
`;

const theme = {
  colors: {
    primary: "#299245",
    gray: "#ccc",
    grayLight: "#dbdbdb",
    white: "#fff",
    yellow: "#f0de00",
  },
};

export default function App({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

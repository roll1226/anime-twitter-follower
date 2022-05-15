import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import styled from "styled-components";
import GeneralColorStyle from "styles/colors/GeneralColorStyle";

class Document extends NextDocument {
  render() {
    return (
      <Html lang="ja">
        <Head />
        <body
          style={{
            background: GeneralColorStyle.Main.Dark,
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;

import "the-new-css-reset/css/reset.css";
import type { AppProps } from "next/app";
import { MainLayout } from "./Layout/MainLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;

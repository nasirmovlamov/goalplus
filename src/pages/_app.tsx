import Layout from "@/components/Layout";
import { store } from "@/store/store";
import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

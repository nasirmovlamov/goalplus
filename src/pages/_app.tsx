import Layout from "@/components/Layout";
import { store } from "@/store/store";
import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
// pages/_app.js
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <style jsx global>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>
      <Layout>
        <Toaster position="top-right" />
        <main className={montserrat.className}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </Provider>
  );
}

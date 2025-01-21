import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import AuthGuard from "../components/Authguard"
import { Theme } from "@radix-ui/themes";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

NProgress.configure({ showSpinner: false});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return  <RecoilRoot>
             <AuthGuard>
                <Theme>
                   <Component {...pageProps} />
                   <ToastContainer />
                </Theme>
             </AuthGuard>
          </RecoilRoot>;
}

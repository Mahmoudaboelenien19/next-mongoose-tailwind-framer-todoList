import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }: any) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Component {...pageProps} key={router.asPath} />
    </AnimatePresence>
  );
}
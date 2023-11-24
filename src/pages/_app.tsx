import theme from "@/styles/StyledChakraTheme";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
// import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <ThirdwebProvider activeChain="ethereum" clientId="e7c2ac7e9931a273c03ce80bba2dd8b5">
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThirdwebProvider>
    </>
  );
}

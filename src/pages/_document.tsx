import FlexRow from "@/_ui/flex/FlexRow";
import theme from "@/styles/StyledChakraTheme";
import { style } from "@/styles/StyledConstants";
import { Box, Button, ColorModeScript, Image, Text } from "@chakra-ui/react";
import { Head, Html, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Box>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </Box>
      </body>
    </Html>
  );
}

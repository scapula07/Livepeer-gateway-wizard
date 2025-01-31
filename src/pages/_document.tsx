import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <meta charSet='UTF-8' />
        <meta name='keywords' content='GWID' />
        <meta name='description' content={`GWID`} />
        <link rel='icon' href='/balloon.png' />    
        <link rel="stylesheet" href="node_modules/@xterm/xterm/css/xterm.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

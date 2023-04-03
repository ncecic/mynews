import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{ display: 'flex', margin: 0, background: '#f2f2f2' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

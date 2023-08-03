import React from 'react';
import {
  Html, Head, Main, NextScript,
} from 'next/document';

const Document = () => (
  <Html>
    <Head>
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon.ico" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;

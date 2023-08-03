import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';

import IndexPage from '@containers/IndexPage';

const PageIndex: NextPage = () => (

  <>
    <Head>
      <title>App</title>
    </Head>
    <IndexPage />
  </>
);

export default PageIndex;

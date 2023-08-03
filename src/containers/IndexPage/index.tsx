import React, { FC } from 'react';

import { useWeb3 } from '@hooks/useWeb3';
import { useAuthMethod } from '@hooks/useAuth';

import Button from '@components/Button';
import ConnectWalletButton from '@components/ConnectWalletButton';

const IndexPage: FC = () => {
  const { account } = useWeb3();

  const { logOut } = useAuthMethod();

  return (
    <div>
      {account ? (
        <Button>Profile</Button>
      ) : (
        <ConnectWalletButton />
      )}
      {account && <Button onClick={logOut}>Log out</Button>}
    </div>
  );
};

export default IndexPage;

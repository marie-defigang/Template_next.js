import { useContext } from 'react';

import { ConnectionContext } from '@contexts/ConnectionContext';

export const useConnection = () => useContext(ConnectionContext);

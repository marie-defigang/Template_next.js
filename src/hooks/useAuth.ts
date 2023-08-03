import { useContext } from 'react';

import { AuthorizationContext } from '@contexts/AuthorizationContext';

export const useAuthMethod = () => useContext(AuthorizationContext);

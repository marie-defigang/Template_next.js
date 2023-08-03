import { useCallback, useState } from 'react';
import { useParamsAdminControllerGetPegaBoostSWR, useParamsAdminControllerSetPegaBoost } from '@768-gladwin-tech/client-sdk/';
import { showToast } from '@components/Toast';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@constants/messages.constants';

export const useBoost = () => {
  const [isLoading, setLoading] = useState(false);
  const [fetchedPegaBoost,, mutate] = useParamsAdminControllerGetPegaBoostSWR();
  const changePegaBoos = useParamsAdminControllerSetPegaBoost();

  const onChangePegaBoost = useCallback(async (value: number) => {
    setLoading(true);
    try {
      await changePegaBoos({
        pegaBoost: value,
      });
      await mutate();
      showToast(SUCCESS_MESSAGES.CHANGED_SUCCESS, 'success');
    } catch (e) {
      showToast(ERROR_MESSAGES.CHANGED_NOT_SUCCESS, 'error');
    } finally {
      setLoading(false);
    }
  }, [changePegaBoos, mutate]);

  return {
    boost: fetchedPegaBoost?.pegaBoost,
    onChangePegaBoost,
    isLoading: isLoading || !fetchedPegaBoost,
  };
};

import React, { FC, memo, useCallback } from 'react';
import * as yup from 'yup';
import { Controller, ErrorOption, useForm } from 'react-hook-form';
import { ApiError } from '@768-gladwin-tech/client-sdk';
import { yupResolver } from '@hookform/resolvers/yup';
import { useModals } from '@hooks/modals.hooks';
import { serverUrlYup } from '@validators/server-settings-url.validators';
import { getErrorMessageForUI, prepareResponseErrors } from '@helpers/error.helpers';
import { showToast } from '@components/Toast';
import Input from '@components/Form/Input';
import Button from '@components/Button';
import { ERROR_MESSAGES_FOR_UI } from '@constants/error.constants';
import { DEFAULT_REVALIDATE_MODE, FIELD_NAMES } from '@constants/form.constants';
import ModalComponentWrapper from '../ModalComponentWrapper';
import { AddUrlModalProps } from '../../../types/modals.types';
import { ApiErrorBodyType } from '../../../types/api.types';
import modalStyles from '../ModalComponentWrapper/styles.module.scss';
import styles from './styles.module.scss';

type FormType = typeof DEFAULT_VALUES_FORM;

const DEFAULT_VALUES_FORM = {
  [FIELD_NAMES.URL]: '',
};

type FormFieldType = FIELD_NAMES.URL;

const schema = yup.object().shape({
  [FIELD_NAMES.URL]: serverUrlYup,
});

const AddUrlModal: FC<AddUrlModalProps> = ({
  title, onSubmit,
}) => {
  const { hide } = useModals();

  const handleCloseModal = useCallback(() => {
    if (hide) hide();
  }, [hide]);

  const {
    control, handleSubmit, setError, formState: { isSubmitting },
  } = useForm<FormType>({
    mode: DEFAULT_REVALIDATE_MODE,
    resolver: yupResolver(schema),
    defaultValues: DEFAULT_VALUES_FORM,
  });

  const handleSubmitForm = async (data: FormType) => {
    try {
      await onSubmit(data.url);
      handleCloseModal();
    } catch (err) {
      const { body }: { body: ApiErrorBodyType } = err as ApiError;
      const errors = prepareResponseErrors(body, ERROR_MESSAGES_FOR_UI);
      (Object.keys(errors) as Array<FormFieldType>).forEach((fieldName) => {
        if (fieldName === FIELD_NAMES.URL) {
          setError(fieldName, errors[fieldName] as ErrorOption);
        } else {
          showToast(getErrorMessageForUI(err as ApiError).message, 'error');
        }
      });
    }
  };

  return (
    <ModalComponentWrapper>
      <h3 className={modalStyles.title}>{title}</h3>
      <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.form}>
        <Controller
          control={control}
          name={FIELD_NAMES.URL}
          render={({
            field: {
              value, onBlur, onChange,
            }, fieldState: {
              error,
            },
          }) => (
            <Input
              errorAbsolute
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              inputError={error?.message}
              className={styles.input}
              placeholder="Input pool url"
            />
          )}
        />
        <Button className={styles.button} loading={isSubmitting} type="submit">Save</Button>
      </form>
    </ModalComponentWrapper>
  );
};

export default memo(AddUrlModal);

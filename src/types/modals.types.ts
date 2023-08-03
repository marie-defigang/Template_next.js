import React from 'react';
import { MODAL_DESCRIPTIONS, MODAL_TITLES, MODAL_TYPES } from '@constants/modals.constants';

export type ShowModal = (modal: MODAL_TYPES, props?: unknown | null) => void

export type ModalsState = {
  current: MODAL_TYPES | null,
  props: unknown | null
}

export type ConfirmModalProps = {
  title: MODAL_TITLES,
  description: MODAL_DESCRIPTIONS,
  icon?: React.ReactNode
  confirmButtonText?: string,
  cancelButtonText?: string,
  onConfirm?: () => void | Promise<void>,
  onCancel?: () => void | Promise<void>,
}

export type AddUrlModalProps = {
  title: string,
  onSubmit: (url: string) => void | Promise<void>,
}

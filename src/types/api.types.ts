type ApiErrorMessagesType<T> = {field: string, message: string, details?: T }

export type ApiErrorBodyType<T = undefined> = {
  status: number,
  errors: ApiErrorMessagesType<T>[]
}

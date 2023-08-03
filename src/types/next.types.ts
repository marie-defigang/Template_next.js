import { NextComponentType, NextPageContext } from 'next';

export type Page<P = Record<string, unknown>, IP = P> = NextComponentType<NextPageContext, IP, P> & {
  allowWithoutAuth?: boolean;
}

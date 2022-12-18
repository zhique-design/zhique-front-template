// eslint-disable-next-line import/no-extraneous-dependencies
import { Location, Params } from '@remix-run/router';
// eslint-disable-next-line import/no-unresolved
import { NavigateFunction } from 'react-router/dist/lib/hooks';

declare global {
  declare module '*.less';

  declare module '*.svg';
  declare module '*.png';
  declare module '*.jpg';
  declare module '*.jpeg';
  declare module '*.gif';
  declare module '*.bmp';
  declare module '*.tiff';

  declare interface RouterComponentProps {
    location: Location;
    navigate: NavigateFunction;
    params: Params;
  }

  declare type ResponseWithPagination<T> = {
    count: number;
    result: Array<T>;
  };

  declare type ResponseWithoutPagination<T> = Array<T> | T;

  declare interface Category {
    id?: number;
    name: string;
    path?: string;
    children?: Array<Category>;
  }
}

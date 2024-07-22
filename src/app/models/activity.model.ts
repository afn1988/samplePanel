import { InjectionToken, Provider } from '@angular/core';

export type OrderBy = 'NEWEST' | 'ASC' | 'DESC';

type OrderByOptions = {
  value: string;
  orderBy: OrderBy;
  text: string;
}[];

export const ORDER_BY_OPTIONS = new InjectionToken<OrderByOptions>(
  'order-by-options'
);
export const OrderByOptions: OrderByOptions = [
  { value: 'Newest', orderBy: 'NEWEST', text: 'Newest' },
  { value: 'Asc', orderBy: 'ASC', text: 'Asc' },
  { value: 'Desc', orderBy: 'DESC', text: 'Desc' },
];
export const orderByOptionsProvider: Provider = {
  provide: ORDER_BY_OPTIONS,
  useValue: OrderByOptions,
};

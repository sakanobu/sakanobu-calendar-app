import React, { ComponentType, ReactElement } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import jaLocale from 'date-fns/locale/ja';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { render } from '@testing-library/react';

const Providers = ({ children }: { children: ReactElement }) => (
  <MuiPickersUtilsProvider locale={jaLocale} utils={DateFnsUtils}>
    {children}
  </MuiPickersUtilsProvider>
);

export const customRender = (ui: ReactElement, options = {}) =>
  render(ui, { wrapper: Providers as ComponentType, ...options });

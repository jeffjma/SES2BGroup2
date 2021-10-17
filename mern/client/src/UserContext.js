import { createContext } from 'react';

export const UserContext = createContext({
    value: null,
    setValue: () => {}
  });
  
import { createContext } from 'react';
import { PageInfo, UserPreferenceOptions } from './types';

export const UserPreferencesContext = createContext<UserPreferenceOptions>({});
export const PageContext = createContext<PageInfo>({page: 'read', book: 0});
export const CurrentReadingContext = createContext({book: 0, chapter: 0});
import { createContext } from 'react';
import { UserPreferenceOptions } from './types';

export const UserPreferencesContext = createContext<UserPreferenceOptions>({});
export const PageContext = createContext('read');
export const CurrentReadingContext = createContext({book: 1, chapter: 1});
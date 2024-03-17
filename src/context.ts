import { createContext } from 'react';
import { HistoryEntry, PageInfo, UserPreferenceOptions } from './types';

export const UserPreferencesContext = createContext<UserPreferenceOptions>({});
export const PageContext = createContext<PageInfo>({page: 'read', book: 0});
export const HistoryContext = createContext<HistoryEntry[]>([]);
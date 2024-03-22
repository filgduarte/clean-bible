import { createContext } from 'react';
import { HistoryEntry, PageInfo, UserPreferenceOptions, Refs } from './types';

export const UserPreferencesContext = createContext<UserPreferenceOptions>({});
export const PageContext = createContext<PageInfo>({page: 'read', book: 0, scrollPosition: 'top'});
export const HistoryContext = createContext<HistoryEntry[]>([]);
export const RefContext = createContext<Refs>({reader: null, summary: null});
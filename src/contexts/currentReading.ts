import { createContext } from "react";
import { CurrentReadingContext } from "../types";

export const currentReadingContext = createContext<CurrentReadingContext>({} as CurrentReadingContext);
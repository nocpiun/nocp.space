import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentState<S>(setState: React.Dispatch<React.SetStateAction<S>>): Promise<S> {
  return new Promise((resolve) => {
    setState((current) => {
      resolve(current);
      return current;
    });
  });
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** @see https://stackoverflow.com/questions/41253310/typescript-retrieve-element-type-information-from-array-type */
export type ArrayElement<T extends readonly unknown[]> = T extends (infer U)[] ? U : never;

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

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  
  return `${year}-${month}-${day}`;
}

export function getRelativeNumber(min: number, max: number, n: number, total: number): number {
  return min + (max - min) * (n / total);
}

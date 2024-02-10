import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Required for ShadCN
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Required for Connectkit SIWE
export const tap = async <T>(value: T, cb: (value: T) => Promise<unknown>): Promise<T> => {
  await cb(value)
  return value
}

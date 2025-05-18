import { clsx } from "clsx";
// No `type ClassValue` import in JS files
import { twMerge } from "tailwind-merge";

/**
 * @param {...any[]} inputs
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

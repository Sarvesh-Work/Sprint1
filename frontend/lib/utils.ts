import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));

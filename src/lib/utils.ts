import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setCookie = (name: string, value: string, days = 1) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; Secure; SameSite=Lax`;
};

export const getCookie = (name: string) => {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; path=/`;
};

export const getInitial = (name: string) => {
  if (!name || typeof name !== "string") return null;
  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0][0]?.toUpperCase() || null;
  }

  return words.map((word) => word[0]?.toUpperCase()).join("");
};

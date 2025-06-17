import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("ChatR-theme")||"forest",
  setTheme: (theme) => {
    localStorage.setItem("ChatR-theme",theme);
    set({theme})}
}))
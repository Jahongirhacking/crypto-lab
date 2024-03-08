import { createSlice } from "@reduxjs/toolkit";
const THEME = "cryptoTheme";
const DARK = "Dark";
const LIGHT = "Light";

const theme = createSlice({
  name: "theme",
  initialState: localStorage.getItem(THEME)
    ? JSON.parse(localStorage.getItem(THEME) as string)
    : LIGHT,
  reducers: {
    toggleTheme: (state) => {
      if (state === DARK) {
        localStorage.setItem(THEME, JSON.stringify(LIGHT));
        return LIGHT;
      }
      localStorage.setItem(THEME, JSON.stringify(DARK));
      return DARK;
    },
  },
});

export const { toggleTheme } = theme.actions;

export default theme.reducer;

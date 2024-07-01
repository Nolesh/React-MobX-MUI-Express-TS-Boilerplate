const THEME_MODE_KEY = "THEME_MODE";

const ThemeStore: {
  dark: boolean;
  setDark(enabled: boolean): void;
} = {
  // dark: !!localStorage.getItem(THEME_MODE_KEY) ? localStorage.getItem(THEME_MODE_KEY) === '1' : true,
  dark: (() => {
    const value = localStorage.getItem(THEME_MODE_KEY);
    return value !== null ? value === "1" : false;
  })(),
  setDark(enabled) {
    this.dark = enabled;
    localStorage.setItem(THEME_MODE_KEY, enabled ? "1" : "0");
  },
};

export default ThemeStore;

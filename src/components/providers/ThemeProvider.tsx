import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/use-redux";
import { setDarkMode } from "../../store/slices/themeSlice";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  // Apply theme class to document when it changes
  useEffect(() => {
    const root = window.document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Check system preference on first load
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      dispatch(setDarkMode(e.matches));
    };

    // Set initial value
    handleChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [dispatch]);

  return <>{children}</>;
};

export default ThemeProvider;

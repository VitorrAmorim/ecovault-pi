import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-muted transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      aria-label={theme === "light" ? "Mudar para modo escuro" : "Mudar para modo claro"}
      title={theme === "light" ? "Mudar para modo escuro" : "Mudar para modo claro"}
    >
      {theme === "light" ? (
        <Moon size={20} aria-hidden="true" />
      ) : (
        <Sun size={20} aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
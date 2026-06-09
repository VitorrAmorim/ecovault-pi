import { ChevronLeft } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const TopBar = ({ showBack, backLabel, onBack, title, rightContent }) => {
  return (
    <div
      className="flex items-center justify-between px-5 pt-5 pb-1 lg:hidden transition-colors duration-300"
      style={{ background: "var(--gradient-topbar)" }}
    >
      <div className="flex items-center gap-2 flex-1">
        {showBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-transparent border-none text-primary font-body text-sm font-medium cursor-pointer p-0"
          >
            <ChevronLeft size={18} />
            {backLabel}
          </button>
        ) : (
          <div className="font-display font-extrabold text-4xl tracking-tight">
            Eco<span className="text-primary">Vault</span>
          </div>
        )}
      </div>

      {title && (
        <div className="font-display font-bold text-base flex-1 text-center">{title}</div>
      )}

      <div className="flex items-center gap-2 justify-end flex-1">
        <ThemeToggle />
        {rightContent}
      </div>
    </div>
  );
};

export default TopBar;

import { ChevronLeft } from "lucide-react";

const TopBar = ({ showBack, backLabel, onBack, title, rightContent }) => {
  return (
    <div
      className="items-center justify-between px-5 pt-5 pb-1"
      style={{ background: "var(--gradient-topbar)" }}
    >
      <div className="hidden">
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

        {title && (
          <div className="font-display font-bold text-base">{title}</div>
        )}

        {rightContent ||
          (showBack && !title ? null : !showBack ? null : (
            <div className="w-17.5" />
          ))}
      </div>
    </div>
  );
};

export default TopBar;

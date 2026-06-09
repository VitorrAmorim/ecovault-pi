import { Search } from "lucide-react";

const SearchBox = ({
  placeholder = "Ex: pilha AA, iPhone 7, lâmpada...",
  showButton,
  onSearch,
  title,
}) => {
  return (
    <div className="px-5 pb-6">
      {title && (
        <div className="font-display font-bold text-[1.05rem] text-muted-foreground mb-3">
          {title}
        </div>
      )}
      <div className="flex items-center bg-card border-[1.5px] border-border rounded-sm px-3.5 gap-2.5 transition-all focus-within:border-primary focus-within:shadow-[0_0_0_3px_var(--mint-glow)]">
        <Search size={16} className="text-muted-foreground" />
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-foreground font-body text-[0.95rem] py-3.5 placeholder:text-muted-foreground"
        />
        {showButton && (
          <button
            onClick={onSearch}
            className="bg-primary text-primary-foreground border-none rounded-lg px-4 py-2 font-display font-bold text-xs cursor-pointer transition-opacity hover:opacity-85"
          >
            Buscar
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;

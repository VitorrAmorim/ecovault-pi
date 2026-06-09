import { Check } from "lucide-react";

const ItemToggle = ({ icon, label, selected, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2.5 border-[1.5px] rounded-sm p-3 cursor-pointer transition-all ${
        selected
          ? "border-primary active-tab"
          : "bg-card border-border hover:border-primary"
      }`}
    >
      <span className="w-4.5 h-4.5 shrink-0">{icon}</span>
      <span
        className={`text-[0.85rem] font-medium ${selected ? "text-(--active-text)" : "text-muted-foreground"}`}
      >
        {label}
      </span>
      <div
        className={`w-4.5 h-4.5 rounded-[5px] ml-auto shrink-0 flex items-center justify-center border-[1.5px] transition-colors ${
          selected ? "bg-primary border-primary" : "border-border"
        }`}
      >
        {selected && (
          <Check
            size={10}
            className="text-primary-foreground"
            strokeWidth={3}
          />
        )}
      </div>
    </button>
  );
};

export default ItemToggle;

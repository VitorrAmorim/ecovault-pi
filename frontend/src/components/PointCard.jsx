import { ChevronRight } from "lucide-react";

const dotColors = {
  green: "bg-primary shadow-[0_0_6px_hsl(var(--mint))]",
  amber: "bg-amber shadow-[0_0_6px_hsl(var(--amber))]",
  blue: "bg-eco-blue shadow-[0_0_6px_hsl(var(--blue))]",
};

const PointCard = ({
  name,
  address,
  tags,
  distance,
  openStatus,
  isOpen,
  onClick,
  status,
  delay = 0,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-card border-[1.5px] border-border rounded-lg p-4 cursor-pointer transition-all flex gap-3.5 items-start hover:border-primary hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${dotColors[status]}`}
      />
      <div className="flex-1">
        <div className="font-display font-bold text-[1rem] mb-1">
          {name}
        </div>
        <div className="text-[0.85rem] text-muted-foreground mb-3 leading-relaxed">
          {address}
        </div>
        <div className="flex gap-2 flex-wrap mb-3">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 bg-foreground/5 rounded-full px-2.5 py-1 text-[0.75rem] font-medium text-foreground/80 [&_svg]:w-3.5 [&_svg]:h-3.5 [&_svg]:shrink-0"
            >
              {tag.icon}
              {tag.label}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[0.75rem] status-info px-2.5 py-1 rounded-full font-medium">
            📍 {distance}
          </span>
          <span
            className={`text-[0.75rem] font-bold ${isOpen ? "text-emerald-500" : "text-destructive"}`}
          >
            ● {openStatus}
          </span>
        </div>
      </div>
      <ChevronRight size={18} className="text-muted-foreground shrink-0 mt-1" />
    </div>
  );
};

export default PointCard;

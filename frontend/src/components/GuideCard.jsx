import { ChevronRight } from "lucide-react";

const iconBg = {
  red: "bg-destructive/10",
  amber: "bg-amber/10",
  mint: "bg-[var(--mint-glow)]",
  blue: "bg-eco-blue/10",
};

const GuideCard = ({ icon, iconColor, title, description }) => {
  return (
    <div className="bg-card border-[1.5px] border-border rounded-sm p-[15px_16px] flex gap-3.5 items-center cursor-pointer transition-colors hover:border-(--mint-glow2)">
      <div
        className={`w-11 h-11 shrink-0 rounded-[13px] flex items-center justify-center ${iconBg[iconColor]}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-display text-[1rem] font-bold mb-1">
          {title}
        </div>
        <div className="text-[0.85rem] text-muted-foreground leading-relaxed">
          {description}
        </div>
      </div>
      <ChevronRight size={18} className="text-muted-foreground" />
    </div>
  );
};

export default GuideCard;

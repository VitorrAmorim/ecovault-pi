import { useState } from "react";
import { Battery, Lightbulb, Smartphone, Cable, Monitor } from "lucide-react";

const homeCategories = [
  {
    id: "pilhas",
    icon: <Battery size={16} />,
    label: "Pilhas",
    points: "+30pts",
    active: true,
  },
  {
    id: "lampadas",
    icon: <Lightbulb size={16} />,
    label: "Lâmpadas",
    points: "+20pts",
  },
  {
    id: "smartphones",
    icon: <Smartphone size={16} />,
    label: "Smartphones",
    points: "+80pts",
  },
  { id: "cabos", icon: <Cable size={16} />, label: "Cabos", points: "+15pts" },
  {
    id: "eletronicos",
    icon: <Monitor size={16} />,
    label: "Eletrônicos",
    points: "+120pts",
  },
];

const filterCategories = [
  { id: "todos", label: "Todos", active: true },
  { id: "pilhas", icon: <Battery size={13} />, label: "Pilhas" },
  { id: "lampadas", icon: <Lightbulb size={13} />, label: "Lâmpadas" },
  { id: "eletronicos", icon: <Smartphone size={13} />, label: "Eletrônicos" },
];

const CategoryPills = ({ onSelect, variant = "home" }) => {
  const categories = variant === "home" ? homeCategories : filterCategories;
  const [activeId, setActiveId] = useState(
    categories.find((c) => c.active)?.id || categories[0].id,
  );

  const handleClick = (id) => {
    setActiveId(id);
    onSelect?.(id);
  };

  return (
    <div className="flex gap-2.5 px-5 pb-1 overflow-x-auto scrollbar-hide mb-6">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleClick(cat.id)}
          className={`shrink-0 flex items-center gap-2 border-[1.5px] rounded-full px-4 py-2.5 cursor-pointer transition-all whitespace-nowrap hover:-translate-y-px ${
            activeId === cat.id
              ? "active-tab border-primary"
              : "bg-card border-border hover:border-primary"
          }`}
        >
          {"icon" in cat && cat.icon && (
            <span className="w-5.5 h-5.5 shrink-0 flex items-center justify-center">
              {cat.icon}
            </span>
          )}
          <span
            className={`text-[0.85rem] font-medium ${activeId === cat.id ? "text-(--active-text)" : "text-muted-foreground"}`}
          >
            {cat.label}
          </span>
          {"points" in cat && cat.points && (
            <span
              className={`text-[0.68rem] ml-0.5 ${activeId === cat.id ? "text-primary" : "text-muted-foreground"}`}
            >
              {cat.points}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryPills;

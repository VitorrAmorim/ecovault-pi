import { useNavigate } from "react-router-dom";
import { Home, MapPin, BookOpen, User, Package } from "lucide-react";

const BottomNav = ({ activeTab }) => {
  const navigate = useNavigate();

  const tabs = [
    { id: "home", icon: <Home size={22} />, label: "Início", path: "/" },
    {
      id: "points",
      icon: <MapPin size={22} />,
      label: "Pontos",
      path: "/pontos",
    },
    { id: "dispose", icon: null, label: "", path: "/confirmar" },
    { id: "guide", icon: <BookOpen size={22} />, label: "Guia", path: "/guia" },
    {
      id: "profile",
      icon: <User size={22} />,
      label: "Perfil",
      path: "/perfil",
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-1/2 -translate-x-1/2 max-w-105 w-full bg-card/90 backdrop-blur-[20px] border-t border-border flex items-center justify-around pt-2.5 pb-4.5 z-200 transition-colors duration-300">
      {tabs.map((tab) =>
        tab.id === "dispose" ? (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className="w-13 h-13 -mt-2.5 rounded-2xl border-none flex items-center justify-center cursor-pointer shadow-fab transition-transform hover:scale-105"
            style={{ background: "var(--gradient-fab)" }}
          >
            <Package size={24} className="text-primary-foreground" />
          </button>
        ) : (
          <div
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center gap-1 cursor-pointer px-4 py-1 rounded-xl transition-colors hover:bg-foreground/5 ${
              activeTab === tab.id
                ? "text-primary [&_svg]:text-primary [&_span]:text-primary font-bold"
                : "text-muted-foreground [&_svg]:text-muted-foreground"
            }`}
          >
            {tab.icon}
            <span className="text-[0.62rem] font-medium transition-colors">
              {tab.label}
            </span>
          </div>
        ),
      )}
    </div>
  );
};

export default BottomNav;

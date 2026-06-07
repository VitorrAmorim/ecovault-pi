import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, MapPin, BookOpen, User, Package } from "lucide-react";

const DesktopSidebar = ({ activeTab }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    setUser(token ? JSON.parse(token) : null);

    // const fetchData = async () => {
    //   try {
    //     const response = await api.get("/users/me", {
    //       headers: {
    //         Authorization: `Bearer ${token.token}`,
    //       },
    //     });

    //     setUser(response.data);
    //   } catch (error) {
    //     console.error("Error fetching user data:", error);
    //   }
    // };

    // fetchData();
  }, [localStorage.getItem("token")]);

  const tabs = [
    { id: "home", icon: <Home size={20} />, label: "Início", path: "/" },
    {
      id: "points",
      icon: <MapPin size={20} />,
      label: "Pontos",
      path: "/pontos",
    },
    {
      id: "dispose",
      icon: <Package size={20} />,
      label: "Descartar",
      path: "/confirmar",
    },
    { id: "guide", icon: <BookOpen size={20} />, label: "Guia", path: "/guia" },
    {
      id: "profile",
      icon: <User size={20} />,
      label: "Perfil",
      path: "/perfil",
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col fixed w-55 shrink-0 bg-card border-r border-border min-h-screen top-0 z-100">
      {/* Logo */}
      <div className="px-6 pt-7 pb-8">
        <div className="font-display font-extrabold text-4xl tracking-tight">
          Eco<span className="text-primary">Vault</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {tabs.map((tab) =>
          tab.id === "profile" && !user ? null : (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm text-[0.85rem] font-medium cursor-pointer border-none transition-colors text-left ${
                activeTab === tab.id
                  ? "bg-(--mint-glow) text-primary [&_svg]:text-primary"
                  : "bg-transparent text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ),
        )}
      </nav>

      {user && (
        <div className="px-4 py-5 border-t border-border flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-[0.65rem]"
            style={{ background: "var(--gradient-fab)" }}
          >
            {user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <div className="text-[0.8rem] font-semibold">{user?.name}</div>
            <div className="text-[0.65rem] text-muted-foreground">
              Eco-Herói · Nível 4
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default DesktopSidebar;

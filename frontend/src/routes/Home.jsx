import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Bell, AlertTriangle, Smartphone, Shield } from "lucide-react";

import AppShell from "../components/AppShell";
import TopBar from "../components/TopBar";
import PointsBar from "../components/PointsBar";
import SearchBox from "../components/SearchBox";
import ColetaBanner from "../components/ColetaBanner";
import CategoryPills from "../components/CategoryPills";
import SectionHeader from "../components/SectionHeader";
import GuideCard from "../components/GuideCard";

import AuthModal from "../components/AuthModal";

const Home = () => {
  const navigate = useNavigate();

  const [authOpen, setAuthOpen] = useState(false);

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

  const hoje = new Date();

  const diaSemana = hoje.toLocaleDateString("pt-BR", { weekday: "long" });
  const diaMes = hoje.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
  });

  const dataFormatada = `${diaSemana}, ${diaMes}`;

  return (
    <AppShell activeTab="home">
      <TopBar
        rightContent={
          <div className="flex gap-2.5 items-center">
            <button className="w-9 h-9 rounded-full bg-foreground/5 border-none cursor-pointer flex items-center justify-center transition-colors hover:bg-foreground/10">
              <Bell size={16} className="text-eco-secondary" />
            </button>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-[0.7rem] cursor-pointer shadow-[0_0_0_2px_var(--mint-glow2)] lg:hidden"
              style={{ background: "var(--gradient-fab)" }}
            >
              {user?.name?.charAt(0).toUpperCase() || "MR"}
            </div>
          </div>
        }
      />

      <div className="px-5 pt-0.5 pb-5 flex items-center justify-between">
        <div>
          <div className="text-[0.85rem] text-muted-foreground uppercase tracking-[1.5px] font-bold">
            {dataFormatada}
          </div>
          <div className="font-display text-2xl font-bold mt-1">
            Olá,{" "}
            <span className="text-primary">
              {user ? user?.name : "usuário"}
            </span>{" "}
            👋
          </div>
        </div>
        {user ? (
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-[0.65rem]"
            style={{ background: "var(--gradient-fab)" }}
            onClick={() => localStorage.removeItem("token") || setUser(null)}
          >
            {user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        ) : (
          <div
            className="h-9 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary font-display font-semibold text-sm cursor-pointer flex items-center transition-colors hover:bg-primary/20"
            onClick={() => setAuthOpen(true)}
          >
            Entrar
          </div>
        )}
      </div>

      {user && <PointsBar />}

      <SearchBox
        title="O que você quer descartar hoje?"
        showButton
        onSearch={() => navigate("/pontos")}
      />

      <ColetaBanner onClick={() => navigate("/agendar")} />

      <SectionHeader title="Categorias" linkText="Ver todas →" />
      <CategoryPills onSelect={() => navigate("/pontos")} />

      <SectionHeader
        title="Guia de Descarte"
        linkText="Ver tudo →"
        onLinkClick={() => navigate("/guia")}
      />
      <div className="px-5 flex flex-col lg:grid lg:grid-cols-2 gap-2.5 mb-7">
        <GuideCard
          icon={<AlertTriangle size={22} className="text-destructive" />}
          iconColor="red"
          title="Nunca quebre lâmpadas fluorescentes"
          description="Mercúrio tóxico é liberado no ar. Veja o descarte seguro."
        />
        <GuideCard
          icon={<Smartphone size={22} className="text-amber" />}
          iconColor="amber"
          title="Bateria inchada no celular?"
          description="Risco real de incêndio. Como remover e descartar com segurança."
        />
        <GuideCard
          icon={<Shield size={22} shield="text-primary" />}
          iconColor="mint"
          title="Apague seus dados antes de reciclar"
          description="Passo a passo para iPhone e Android antes do descarte."
        />
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </AppShell>
  );
};

export default Home;

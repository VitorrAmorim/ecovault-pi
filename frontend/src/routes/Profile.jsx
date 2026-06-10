import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import TopBar from "../components/TopBar";
import { useNavigate } from "react-router-dom";

const badges = [
  { icon: "⚡", label: "Mestre das Pilhas", unlocked: true },
  { icon: "🌱", label: "Primeiro Passo", unlocked: true },
  { icon: "🔥", label: "3 em Sequência", unlocked: true },
  { icon: "📱", label: "Guardião Tech", unlocked: false },
  { icon: "🏆", label: "Eco Lendário", unlocked: false },
];

const Profile = () => {
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

  return (
    <AppShell activeTab="profile">
      <TopBar
        showBack
        backLabel="Voltar"
        onBack={() => navigate("/")}
        title="Seu Perfil"
      />

      <div className="px-5 lg:max-w-150">
        <div className="bg-card border-[1.5px] border-border rounded-lg p-5 lg:p-7">
          {/* Top */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-12 h-12 text-white rounded-full flex items-center justify-center font-display font-bold text-sm"
              style={{ background: "var(--gradient-fab)" }}
            >
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1">
              <div className="font-display font-bold text-base">
                {user?.name}
              </div>
              <div className="text-xs text-muted-foreground">
                Eco-Herói · Nível 4
              </div>
            </div>
            <div className="bg-(--mint-glow) text-white text-xs font-semibold px-3 py-1 rounded-full">
              Top 12%
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { val: "1.240", lbl: "pontos" },
              { val: "7", lbl: "descartes" },
              { val: "3", lbl: "semanas" },
            ].map((stat) => (
              <div
                key={stat.lbl}
                className="bg-background rounded-sm p-3 text-center"
              >
                <div className="font-display font-bold text-lg">{stat.val}</div>
                <div className="text-[0.68rem] text-muted-foreground">
                  {stat.lbl}
                </div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="font-display font-bold text-sm mb-3">Conquistas</div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {badges.map((badge) => (
              <div
                key={badge.label}
                className="flex flex-col items-center gap-1.5 min-w-15"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${
                    badge.unlocked
                      ? "bg-(--mint-glow) border border-primary/30"
                      : "bg-foreground/5 border border-border opacity-50"
                  }`}
                >
                  {badge.icon}
                </div>
                <span className="text-[0.6rem] text-muted-foreground text-center leading-tight">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Profile;

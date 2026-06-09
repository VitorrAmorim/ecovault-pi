import { useEffect } from "react";

import api from "../utils/api";

const PointsBar = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));

        if (!token) return;

        console.debug(token.token);

        const response = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });

        console.debug(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="mx-5 mb-5 border border-primary/20 rounded-lg p-5 relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Glow circle */}
      <div className="absolute -top-12.5 -right-12.5 w-45 h-45 rounded-full pointer-events-none bg-[radial-gradient(circle,hsla(168,76%,50%,0.15)_0%,transparent_65%)]" />

      <div className="flex justify-between items-start">
        <div>
          <div className="text-[0.75rem] text-primary uppercase tracking-[1px] font-bold">
            EcoSaldo
          </div>
          <div className="font-display text-[2.6rem] font-extrabold tracking-tight leading-none mt-1 mb-1">
            1.240{" "}
            <span className="text-[1rem] font-bold text-primary tracking-normal ml-0.5">
              pts
            </span>
          </div>
          <div className="text-[0.8rem] text-foreground/60 font-medium">
            ≈ R$ 12,40 em parceiros
          </div>
        </div>
        <div className="bg-(--mint-glow2) border border-primary/40 rounded-full px-3 py-1.5 text-[0.8rem] text-(--active-text) font-bold whitespace-nowrap">
          🔥 3 semanas
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-[0.75rem] text-muted-foreground font-medium mb-1.5">
          <span>Eco-Herói · Nível 4</span>
          <span className="text-primary">65% → Guardião</span>
        </div>
        <div className="h-1.25 bg-foreground/5 rounded-full overflow-hidden">
          <div
            className="h-full w-[65%] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--mint)))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PointsBar;

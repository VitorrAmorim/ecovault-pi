import { useLocation, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    pointsEarned = 110,
    newTotal = 0,
    levelProgress = 0,
    levelUp = false,
  } = location.state ?? {};

  const progressPercent = Math.max(
    0,
    Math.min(100, Number(levelProgress) || 0),
  );

  return (
    <div className="flex min-h-screen justify-center bg-background">
      <div className="w-full max-w-105 lg:max-w-150 flex flex-col items-center justify-center px-5 pt-16 pb-5 text-center min-h-[70vh]">
        <div className="w-25 h-25 rounded-full bg-(--mint-glow) border-2 border-primary/35 flex items-center justify-center mb-6 animate-pop-in">
          <Check size={48} className="text-white" strokeWidth={2.5} />
        </div>
        <h1 className="font-display font-extrabold text-3xl tracking-tight mb-2">
          Descarte registrado!
        </h1>
        <p className="text-[0.85rem] text-muted-foreground leading-relaxed mb-8">
          Você acabou de fazer a coisa certa.
          <br />
          Aqui estão seus pontos:
        </p>
        <div className="font-display text-[3.5rem] font-extrabold text-primary tracking-[-3px] leading-none">
          +{pointsEarned}
        </div>
        <div className="text-[0.8rem] text-muted-foreground mt-1 mb-8">
          {newTotal} pontos no seu EcoSaldo
        </div>

        <div className="bg-card border border-border rounded-lg p-4 w-full mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-display font-bold text-[0.85rem]">
              {levelUp
                ? "Novo nível desbloqueado!"
                : "Progresso no nível atual"}
            </span>
            <span className="text-primary text-[0.78rem]">
              {progressPercent}%
            </span>
          </div>
          <div className="h-1.25 bg-foreground/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progressPercent}%`,
                background:
                  "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--mint)))",
              }}
            />
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full border-none rounded-sm px-4 py-4 font-display font-bold text-[0.9rem] cursor-pointer flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-px text-white shadow-mint"
          style={{ background: "var(--gradient-cta)" }}
        >
          Voltar para o início
        </button>
      </div>
    </div>
  );
};

export default Success;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Monitor, Laptop, Star, Plus } from "lucide-react";
import AppShell from "../components/AppShell";
import TopBar from "../components/TopBar";
import ItemToggle from "../components/ItemToggle";

const scheduleItems = [
  { id: "tv", icon: <Monitor size={18} />, label: "TV / Monitor" },
  { id: "computador", icon: <Laptop size={18} />, label: "Computador" },
  { id: "geladeira", icon: <Monitor size={18} />, label: "Geladeira" },
  { id: "outro", icon: <Plus size={18} />, label: "Outro" },
];

const Schedule = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(["tv"]);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  return (
    <AppShell activeTab="home">
      <TopBar
        showBack
        backLabel="Voltar"
        onBack={() => navigate("/")}
        title="Coleta em Casa"
      />

      {/* Hero */}
      <div
        className="mx-5 mb-6 border border-[rgba(96,165,250,0.25)] rounded-lg p-5 lg:p-7 relative overflow-hidden"
        style={{ background: "var(--gradient-coleta)" }}
      >
        <div className="absolute -bottom-10 -right-10 w-35 h-35 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(96,165,250,0.12)_0%,transparent_65%)]" />
        <span className="bg-[rgba(96,165,250,0.12)] text-[#93C5FD] text-[0.65rem] font-semibold px-2.5 py-1 rounded-full inline-block mb-2.5 uppercase tracking-wider">
          Logística Reversa · PNRS
        </span>
        <h2 className="font-display font-extrabold text-xl mb-1.5 leading-tight">
          A gente busca o seu eletrônico pesado
        </h2>
        <p className="text-[0.78rem] text-muted-foreground leading-relaxed mb-4">
          TV, geladeira, computador, micro-ondas. Sem precisar carregar nada.
          Agendamento em 3 passos.
        </p>
        <div className="flex flex-col lg:flex-row gap-2.5 lg:gap-6">
          {[
            "Escolha o que quer descartar",
            "Confirme endereço e data",
            "Aguarde — e ganhe pontos dobrados",
          ].map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-[0.8rem] text-eco-secondary"
            >
              <div className="w-6 h-6 rounded-full bg-[rgba(96,165,250,0.12)] text-[#93C5FD] flex items-center justify-center font-display font-bold text-xs shrink-0">
                {i + 1}
              </div>
              {step}
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 lg:grid lg:grid-cols-2 lg:gap-8">
        <div>
          {/* Items */}
          <div className="mb-3.5">
            <label className="text-[0.72rem] text-muted-foreground uppercase tracking-[1px] mb-1.5 block font-medium">
              O que você vai descartar?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {scheduleItems.map((item) => (
                <ItemToggle
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  selected={selected.includes(item.id)}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="mb-3.5">
            <label className="text-[0.72rem] text-muted-foreground uppercase tracking-[1px] mb-1.5 block font-medium">
              Endereço de coleta
            </label>
            <input
              type="text"
              placeholder="Av. Antônio Prado, 500"
              className="w-full bg-card border-[1.5px] border-border rounded-sm text-foreground font-body text-[0.88rem] p-3.5 outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_var(--mint-glow)] placeholder:text-muted-foreground"
            />
          </div>
          <div className="mb-3.5">
            <input
              type="text"
              placeholder="Complemento (apto, casa...)"
              className="w-full bg-card border-[1.5px] border-border rounded-sm text-foreground font-body text-[0.88rem] p-3.5 outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_var(--mint-glow)] placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div>
          {/* Date / Period */}
          <div className="grid grid-cols-2 gap-3 mb-3.5">
            <div>
              <label className="text-[0.72rem] text-muted-foreground uppercase tracking-[1px] mb-1.5 block font-medium">
                Data
              </label>
              <input
                type="date"
                defaultValue="2026-03-28"
                className="w-full bg-card border-[1.5px] border-border rounded-sm text-foreground font-body text-[0.88rem] p-3.5 outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_var(--mint-glow)]"
              />
            </div>
            <div>
              <label className="text-[0.72rem] text-muted-foreground uppercase tracking-[1px] mb-1.5 block font-medium">
                Período
              </label>
              <select className="w-full bg-card border-[1.5px] border-border rounded-sm text-foreground font-body text-[0.88rem] p-3.5 outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_var(--mint-glow)] appearance-none">
                <option>Manhã (8h–12h)</option>
                <option>Tarde (13h–18h)</option>
              </select>
            </div>
          </div>

          {/* Bonus */}
          <div className="bg-(--mint-glow) border border-primary/20 rounded-sm p-3.5 mb-5 flex gap-3 items-center">
            <Star size={20} className="text-white shrink-0" />
            <div>
              <div className="text-[0.78rem] font-semibold text-white">
                +240 pontos dobrados
              </div>
              <div className="text-[0.7rem] text-white">
                TV = 120pts × 2 por ser coleta em casa
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/sucesso")}
            className="w-full text-white border-none rounded-sm px-4 py-4 font-display font-bold text-[0.9rem] cursor-pointer flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-px shadow-mint mb-4"
            style={{ background: "var(--gradient-cta)" }}
          >
            <Home size={18} /> Confirmar agendamento
          </button>
        </div>
      </div>
    </AppShell>
  );
};

export default Schedule;

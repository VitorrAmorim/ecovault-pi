import { Home, ChevronRight } from "lucide-react";

const ColetaBanner = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="mx-5 mb-7 border rounded-lg p-[18px_20px] flex items-center gap-4 cursor-pointer transition-all relative overflow-hidden hover:-translate-y-px"
      style={{
        background: "var(--gradient-coleta)",
        borderColor: "var(--coleta-border)"
      }}
    >
      <div className="absolute -right-7.5 -top-7.5 w-30 h-30 rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(96,165,250,0.12)_0%,transparent_65%)]" />

      <div
        className="w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center"
        style={{ backgroundColor: "var(--coleta-icon-bg)" }}
      >
        <Home size={24} className="text-blue" />
      </div>

      <div className="flex-1">
        <div className="font-display font-bold text-[0.92rem] mb-0.5">
          Agendar coleta em casa
        </div>
        <div className="text-xs text-muted-foreground leading-relaxed">
          TV velha, computador, geladeira? A gente vai até você.
        </div>
        <span
          className="text-[0.65rem] font-semibold px-2.5 py-0.5 rounded-full mt-1.5 inline-block"
          style={{
            backgroundColor: "var(--coleta-badge-bg)",
            color: "var(--coleta-badge-text)"
          }}
        >
          NOVO · Grátis acima de 500pts
        </span>
      </div>

      <ChevronRight size={18} className="text-muted-foreground shrink-0" />
    </div>
  );
};

export default ColetaBanner;
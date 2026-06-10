import { useNavigate } from "react-router-dom";

import {
  AlertTriangle,
  Smartphone,
  Lightbulb,
  Battery,
  Cable,
  Monitor,
  Cpu,
  Printer,
  Thermometer,
  Shield,
  Leaf,
  Recycle,
  Info,
  MapPin,
} from "lucide-react";

import AppShell from "../components/AppShell";
import TopBar from "../components/TopBar";
import SectionHeader from "../components/SectionHeader";
import GuideCard from "../components/GuideCard";
import { useTheme } from "../context/ThemeContext";

const GuideCategory = ({ icon, title, description, items, color, bgColor }) => (
  <div className="bg-card border-[1.5px] border-border rounded-lg p-5 transition-colors hover:border-(--mint-glow2)">
    <div className="flex items-start gap-4 mb-4">
      <div
        className={`w-12 h-12 shrink-0 rounded-[14px] flex items-center justify-center ${bgColor}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3 className={`font-display font-bold text-[0.95rem] mb-1 ${color}`}>
          {title}
        </h3>
        <p className="text-[0.78rem] text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="bg-foreground/5 text-eco-secondary text-[0.72rem] px-3 py-1.5 rounded-full"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

const guideCategories = [
  {
    icon: <Battery size={24} className="text-amber" />,
    title: "Pilhas e Baterias",
    description:
      "Contêm metais pesados como cádmio, chumbo e mercúrio. Nunca descarte no lixo comum — podem contaminar o solo e a água.",
    items: [
      "Pilhas AA/AAA",
      "Baterias 9V",
      "Baterias de lítio",
      "Baterias de celular",
      "Baterias de notebook",
    ],
    color: "text-amber",
    bgColor: "bg-amber/10",
  },
  {
    icon: <Lightbulb size={24} className="text-[#A78BFA]" />,
    title: "Lâmpadas",
    description:
      "Lâmpadas fluorescentes contêm mercúrio. Quebrá-las libera vapores tóxicos. LEDs e incandescentes são menos perigosas, mas devem ser recicladas.",
    items: [
      "Fluorescentes",
      "LED",
      "Incandescentes",
      "Halógenas",
      "Vapor de sódio",
    ],
    color: "text-[#A78BFA]",
    bgColor: "bg-[rgba(167,139,250,0.1)]",
  },
  {
    icon: <Smartphone size={24} className="text-white" />,
    title: "Smartphones e Tablets",
    description:
      "Possuem baterias de lítio, metais raros e componentes que podem ser reaproveitados. Apague seus dados antes de entregar para reciclagem.",
    items: [
      "Celulares",
      "Tablets",
      "Smartwatches",
      "Fones bluetooth",
      "Carregadores",
    ],
    color: "text-primary",
    bgColor: "bg-[var(--mint-glow)]",
  },
  {
    icon: <Monitor size={24} className="text-eco-blue" />,
    title: "TVs e Monitores",
    description:
      "Monitores CRT contêm chumbo. TVs de LCD possuem mercúrio na retroiluminação. São volumosos e requerem logística especial.",
    items: ["TVs CRT", "TVs LCD/LED", "Monitores", "Projetores"],
    color: "text-eco-blue",
    bgColor: "bg-eco-blue/10",
  },
  {
    icon: <Cpu size={24} className="text-white" />,
    title: "Computadores e Periféricos",
    description:
      "Placas-mãe, processadores e memórias contêm ouro, prata e paládio. Discos rígidos guardam dados pessoais — destrua antes de descartar.",
    items: [
      "Desktops",
      "Notebooks",
      "Teclados",
      "Mouses",
      "Discos rígidos",
      "Pen drives",
    ],
    color: "text-primary",
    bgColor: "bg-[var(--mint-glow)]",
  },
  {
    icon: <Printer size={24} className="text-eco-secondary" />,
    title: "Impressoras e Cartuchos",
    description:
      "Cartuchos de tinta e toner contêm substâncias químicas nocivas. Muitas fabricantes possuem programas de recolhimento.",
    items: ["Impressoras", "Cartuchos", "Toners", "Scanners"],
    color: "text-eco-secondary",
    bgColor: "bg-foreground/5",
  },
];

const safetyTips = [
  {
    icon: <AlertTriangle size={22} className="text-destructive" />,
    iconColor: "red",
    title: "Nunca quebre lâmpadas fluorescentes",
    description:
      "Mercúrio tóxico é liberado no ar. Leve inteiras ao ponto de coleta mais próximo. Se quebrar, ventile o ambiente e use luvas.",
  },
  {
    icon: <Smartphone size={22} className="text-amber" />,
    iconColor: "amber",
    title: "Bateria inchada no celular?",
    description:
      "Risco real de incêndio e explosão. Não perfure nem tente remover sozinho. Leve a uma assistência técnica ou ponto especializado.",
  },
  {
    icon: <Shield size={22} className="text-white" />,
    iconColor: "mint",
    title: "Apague seus dados antes de reciclar",
    description:
      "Faça backup, restaure de fábrica e remova o chip/cartão de memória. Para HDs, use software de formatação segura.",
  },
  {
    icon: <Thermometer size={22} className="text-destructive" />,
    iconColor: "red",
    title: "Não incinere eletrônicos",
    description:
      "A queima de componentes eletrônicos libera dioxinas, furanos e metais pesados no ar. Isso causa danos à saúde e ao meio ambiente.",
  },
  {
    icon: <Cable size={22} className="text-eco-blue" />,
    iconColor: "blue",
    title: "Cabos e carregadores: não jogue no lixo",
    description:
      "Cabos possuem cobre e PVC. Podem ser reciclados separadamente. Acumule em uma sacola e leve ao ponto de coleta.",
  },
  {
    icon: <Leaf size={22} className="text-white" />,
    iconColor: "mint",
    title: "Prolongue a vida útil do eletrônico",
    description:
      "Antes de descartar, considere doar, vender ou reparar. Muitos equipamentos ainda têm vida útil e podem ajudar outras pessoas.",
  },
];

const Guide = () => {
  const navigate = useNavigate();

  const { theme } = useTheme();

  return (
    <AppShell activeTab="guide">
      <TopBar
        showBack
        backLabel="Voltar"
        onBack={() => navigate("/")}
        title="Guia de Descarte"
      />

      {/* Hero */}
      <div className="px-5 pb-6">
        <div
          className="border border-primary/20 rounded-lg p-5 lg:p-7 relative overflow-hidden"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="absolute -top-12.5 -right-12.5 w-45 h-45 rounded-full pointer-events-none bg-[radial-gradient(circle,hsla(168,76%,50%,0.15)_0%,transparent_65%)]" />
          <div className="flex items-center gap-3 mb-3">
            <Recycle size={28} className="text-primary" />
            <h2 className="font-display font-extrabold text-xl lg:text-2xl">
              Guia Completo de Descarte
            </h2>
          </div>
          <p className="text-[0.85rem] text-muted-foreground leading-relaxed max-w-130">
            Saiba como descartar corretamente cada tipo de material eletrônico.
            Proteja o meio ambiente e ganhe pontos por cada descarte
            responsável.
          </p>
        </div>
      </div>

      {/* Info banner */}
      <div className="px-5 pb-6">
        <div className="bg-(--mint-glow) border border-primary/20 rounded-sm p-4 flex gap-3 items-start">
          <Info
            size={18}
            className={`text-primary shrink-0 mt-0.5 ${theme === "light" ? "text-white" : ""}`}
          />
          <div
            className={`text-[0.78rem] text-muted-foreground leading-relaxed ${theme === "light" ? "text-white" : ""}`}
          >
            <span
              className={`text-primary font-semibold ${theme === "light" ? "text-white" : ""}`}
            >
              Sabia que?
            </span>{" "}
            O Brasil descarta mais de 2 milhões de toneladas de lixo eletrônico
            por ano, mas apenas 3% é reciclado corretamente. Faça parte da
            mudança!
          </div>
        </div>
      </div>

      {/* Categories */}
      <SectionHeader title="Categorias de Materiais" />
      <div className="px-5 grid grid-cols-1 lg:grid-cols-2 gap-3 mb-8">
        {guideCategories.map((cat) => (
          <GuideCategory key={cat.title} {...cat} />
        ))}
      </div>

      {/* Safety tips */}
      <SectionHeader title="Dicas de Segurança" />
      <div className="px-5 grid grid-cols-1 lg:grid-cols-2 gap-2.5 mb-8">
        {safetyTips.map((tip) => (
          <GuideCard key={tip.title} {...tip} />
        ))}
      </div>

      {/* Steps */}
      <SectionHeader title="Como Descartar em 3 Passos" />
      <div className="px-5 grid grid-cols-1 lg:grid-cols-3 gap-3 mb-8">
        {[
          {
            step: "1",
            title: "Separe o material",
            desc: "Identifique o tipo de eletrônico e prepare para o descarte. Remova dados pessoais de celulares e computadores.",
          },
          {
            step: "2",
            title: "Encontre um ponto de coleta",
            desc: "Use o mapa do EcoVault para localizar o ponto mais próximo que aceita o seu tipo de material.",
          },
          {
            step: "3",
            title: "Registre e ganhe pontos",
            desc: "Entregue o material no ponto de coleta e registre o descarte no app para acumular EcoSaldo.",
          },
        ].map((s) => (
          <div
            key={s.step}
            className="bg-card border-[1.5px] border-border rounded-lg p-5 text-center"
          >
            <div
              className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center font-display font-bold text-lg text-primary-foreground"
              style={{ background: "var(--gradient-fab)" }}
            >
              {s.step}
            </div>
            <h4 className="font-display font-bold text-[0.9rem] mb-2">
              {s.title}
            </h4>
            <p className="text-[0.75rem] text-muted-foreground leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-5 pb-8">
        <button
          onClick={() => navigate("/pontos")}
          className="w-full text-white border-none rounded-sm px-4 py-4 font-display font-bold text-[0.9rem] cursor-pointer flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-px text-foreground shadow-mint"
          style={{ background: "var(--gradient-cta)" }}
        >
          <MapPin size={18} /> Encontrar pontos de coleta
        </button>
      </div>
    </AppShell>
  );
};

export default Guide;

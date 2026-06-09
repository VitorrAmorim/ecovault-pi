import { useNavigate, useParams } from "react-router-dom";

import {
  MapPin,
  Clock,
  Check,
  Battery,
  Lightbulb,
  Smartphone,
  Cable,
  Laptop,
  Tablet,
  Plug,
} from "lucide-react";

import AppShell from "../components/AppShell";
import TopBar from "../components/TopBar";
import { useEffect, useState } from "react";
import api from "../utils/api";

const acceptedItemIcons = {
  item_celular: <Smartphone size={18} className="text-primary" />,
  item_notebook: <Laptop size={18} className="text-eco-blue" />,
  item_tablet: <Tablet size={18} className="text-[#A78BFA]" />,
  item_carregador: <Plug size={18} className="text-eco-blue" />,
  item_pilhas: <Battery size={18} className="text-amber" />,
  item_lampadas: <Lightbulb size={18} className="text-[#A78BFA]" />,
  default: <Cable size={18} className="text-eco-blue" />,
};

const getAcceptedItemIcon = (item) =>
  acceptedItemIcons[item.id] ?? acceptedItemIcons.default;

const PointDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [point, setPoint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPoint = async () => {
      try {
        const response = await api.get(`/collection-points/${id}`);
        setPoint(response.data);
      } catch (error) {
        console.error(error);
        setPoint(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPoint();
    }
  }, [id]);

  if (isLoading) {
    return (
      <AppShell activeTab="points">
        <TopBar
          showBack
          backLabel="Pontos"
          onBack={() => navigate("/pontos")}
        />
        <div className="px-5 py-8 text-muted-foreground">
          Carregando ponto...
        </div>
      </AppShell>
    );
  }

  if (!point) {
    return (
      <AppShell activeTab="points">
        <TopBar
          showBack
          backLabel="Pontos"
          onBack={() => navigate("/pontos")}
        />
        <div className="px-5 py-8 text-muted-foreground">
          Ponto não encontrado.
        </div>
      </AppShell>
    );
  }

  const isOpen = point.open ?? point.isOpen;
  const acceptedItems = point.acceptedItems ?? [];

  return (
    <AppShell activeTab="points">
      <TopBar showBack backLabel="Pontos" onBack={() => navigate("/pontos")} />

      <div className="lg:grid lg:grid-cols-2 lg:gap-8 px-5 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-2xl tracking-tight mb-1.5">
            {point.name}
          </h1>
          <div className="text-[0.85rem] text-muted-foreground mb-3.5">
            {point.address}
          </div>
          <div className="flex gap-2.5 mb-5">
            <span className="flex items-center gap-1.5 status-info rounded-full px-3 py-1.5 text-[0.8rem] font-medium [&_svg]:w-4 [&_svg]:h-4">
              <MapPin size={16} />{" "}
              {point.distance
                ? `${point.distance} de você`
                : "Distância não disponível"}
            </span>
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.8rem] font-medium [&_svg]:w-4 [&_svg]:h-4 ${
                isOpen
                  ? "status-success"
                  : "status-danger"
              }`}
            >
              <Clock size={16} />{" "}
              {point.openStatus ?? (isOpen ? "Aberto agora" : "Fechado")}
            </span>
          </div>

          {/* Map placeholder */}
          <div className="mb-5 h-45 lg:h-55 rounded-lg bg-card border-[1.5px] border-border flex items-center justify-center flex-col gap-2.5 relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="w-4 h-4 bg-primary rounded-full border-2 border-foreground shadow-[0_0_0_6px_hsla(168,76%,50%,0.2)] relative z-10" />
            <div className="text-xs text-muted-foreground z-10 bg-card px-3 py-1 rounded-full border border-border flex items-center gap-1">
              <MapPin size={12} className="text-primary" />
              Ver no Google Maps
            </div>
          </div>
        </div>

        <div>
          {/* Accepts */}
          <div className="pb-5">
            <div className="font-display text-[0.8rem] font-bold text-muted-foreground uppercase tracking-[1px] mb-3">
              O que este ponto aceita
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {acceptedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border-[1.5px] border-border rounded-sm p-3.5 flex items-center gap-2.5"
                >
                  <div className="w-8.5 h-8.5 rounded-[10px] flex items-center justify-center shrink-0 bg-card">
                    {getAcceptedItemIcon(item)}
                  </div>
                  <div>
                    <div className="text-[0.8rem] font-medium">
                      {item.label}
                    </div>
                    <div className="text-[0.65rem] text-primary mt-0.5">
                      +{item.pointsPerDisposal} pts / descarte
                    </div>
                  </div>
                </div>
              ))}
              {acceptedItems.length === 0 && (
                <div className="col-span-full text-muted-foreground">
                  Nenhum item aceito cadastrado para este ponto.
                </div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-2.5">
            <button
              onClick={() =>
                navigate("/confirmar", {
                  state: {
                    collectionPointId: point.id,
                    pointName: point.name,
                    acceptedItems,
                  },
                })
              }
              className="flex-1 border-none rounded-sm px-4 py-4 font-display font-bold text-[0.9rem] cursor-pointer flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-px text-foreground shadow-mint"
              style={{ background: "var(--gradient-cta)" }}
            >
              <Check size={18} /> Confirmar descarte
            </button>
            <button className="bg-card text-eco-secondary border-[1.5px] border-border rounded-sm px-4.5 py-4 font-display font-semibold text-[0.85rem] cursor-pointer flex items-center justify-center gap-2 transition-colors hover:border-primary hover:text-primary">
              <MapPin size={18} />
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default PointDetail;

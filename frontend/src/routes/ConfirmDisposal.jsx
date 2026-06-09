import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import {
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
import ItemToggle from "../components/ItemToggle";
import api from "../utils/api";

const acceptedItemIcons = {
  item_celular: <Smartphone size={18} />,
  item_notebook: <Laptop size={18} />,
  item_tablet: <Tablet size={18} />,
  item_carregador: <Plug size={18} />,
  item_pilhas: <Battery size={18} />,
  item_lampadas: <Lightbulb size={18} />,
  default: <Cable size={18} />,
};

const getItemIcon = (item) =>
  acceptedItemIcons[item.id] ?? acceptedItemIcons.default;

const ConfirmDisposal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { collectionPointId, pointName, acceptedItems } = location.state ?? {};
  const disposalItems = acceptedItems ?? [];
  const [selected, setSelected] = useState(() =>
    disposalItems.map((item) => item.id),
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const totalPoints = disposalItems
    .filter((i) => selected.includes(i.id))
    .reduce((s, i) => s + i.pointsPerDisposal, 0);
  const selectedItems = disposalItems.filter((i) => selected.includes(i.id));

  const handleConfirmDisposal = async () => {
    setError("");

    const token = JSON.parse(localStorage.getItem("token"));

    if (!token)
      return toast.error("Cadastre-se na plataforma para realizar o descarte!");

    if (!collectionPointId) {
      return setError(
        "Selecione um ponto de coleta antes de registrar o descarte.",
      );
    }

    if (selected.length === 0) {
      return setError("Selecione ao menos um item para descartar.");
    }

    setIsSubmitting(true);

    try {
      const response = await api.post(
        "/disposals",
        {
          collectionPointId,
          items: selected,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        },
      );

      navigate("/sucesso", { state: response?.data ?? {} });
    } catch (submissionError) {
      console.error(submissionError);

      setError(
        "Não foi possível registrar o descarte. Tente novamente mais tarde.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const backPath = collectionPointId
    ? `/ponto/${collectionPointId}`
    : "/pontos";

  if (!collectionPointId || disposalItems.length === 0) {
    return (
      <AppShell activeTab="dispose">
        <TopBar
          showBack
          backLabel="Pontos"
          onBack={() => navigate(backPath)}
          title="Confirmar Descarte"
        />
        <div className="px-5 py-8 text-muted-foreground">
          Nenhum ponto de coleta válido selecionado. Volte para a lista de
          pontos e escolha um ponto para descartar.
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell activeTab="dispose">
      <TopBar
        showBack
        backLabel={pointName ? "Voltar para ponto" : "Pontos"}
        onBack={() => navigate(backPath)}
        title="Confirmar Descarte"
      />

      <div className="px-5 lg:grid lg:grid-cols-2 lg:gap-8">
        <div>
          <div className="font-display text-[0.8rem] font-bold text-muted-foreground uppercase tracking-[1px] mb-3">
            O que você vai descartar?
          </div>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {disposalItems.map((item) => (
              <ItemToggle
                key={item.id}
                icon={getItemIcon(item)}
                label={item.label}
                selected={selected.includes(item.id)}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>

          {/* Items breakdown */}
          {error && (
            <div className="mb-4 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-2.5 mb-6">
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-sm p-3.5 flex justify-between items-center"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[9px] bg-(--mint-glow) flex items-center justify-center">
                    <span className="text-primary [&_svg]:w-3.5 [&_svg]:h-3.5">
                      {getItemIcon(item)}
                    </span>
                  </div>
                  <span className="text-[0.85rem] font-medium">
                    {item.label}
                  </span>
                </div>
                <span className="text-[0.78rem] text-primary font-semibold">
                  +{item.pointsPerDisposal} pts
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Points card */}
          <div
            className="border border-primary/20 rounded-lg p-5 mb-5 text-center"
            style={{ background: "var(--gradient-hero)" }}
          >
            <div className="font-display text-[2.8rem] font-extrabold text-primary tracking-[-2px]">
              +{totalPoints}
            </div>
            <div className="text-[0.8rem] text-muted-foreground mt-0.5">
              pontos que você vai ganhar
            </div>
            <div className="text-[0.78rem] text-foreground/45 mt-1.5">
              ≈ R$ {(totalPoints / 100).toFixed(2).replace(".", ",")} em
              parceiros
            </div>
          </div>

          <button
            onClick={handleConfirmDisposal}
            disabled={isSubmitting}
            className="w-full rounded-sm px-4 py-4 font-display font-bold text-[0.9rem] cursor-pointer flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-px text-foreground shadow-mint mb-4 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: "var(--gradient-cta)" }}
          >
            <Check size={18} />{" "}
            {isSubmitting ? "Registrando..." : "Registrar meu descarte"}
          </button>
        </div>
      </div>
    </AppShell>
  );
};

export default ConfirmDisposal;

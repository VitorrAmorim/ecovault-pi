import { useNavigate } from "react-router-dom";

import {
  Battery,
  Lightbulb,
  Smartphone,
  Monitor,
  Laptop,
  Tablet,
  Plug,
} from "lucide-react";

import AppShell from "../components/AppShell";
import TopBar from "../components/TopBar";
import SearchBox from "../components/SearchBox";
import CategoryPills from "../components/CategoryPills";
import PointCard from "../components/PointCard";
import { useEffect, useState } from "react";

import api from "../utils/api";

const acceptedItemIcons = {
  item_celular: <Smartphone size={12} />,
  item_notebook: <Laptop size={12} />,
  item_tablet: <Tablet size={12} />,
  item_carregador: <Plug size={12} />,
  item_pilhas: <Battery size={12} />,
  item_lampadas: <Lightbulb size={12} />,
  default: <Monitor size={12} />,
};

const getAcceptedItemTag = (item) => ({
  icon: acceptedItemIcons[item.id] ?? acceptedItemIcons.default,
  label: item.label,
});

const CollectionPoints = () => {
  const navigate = useNavigate();
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/collection-points");
        const data = response.data;
        setCollectionPoints(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setCollectionPoints([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AppShell activeTab="points">
      <TopBar
        showBack
        backLabel="Voltar"
        onBack={() => navigate("/")}
        title="Pontos de Coleta"
      />

      <SearchBox placeholder="Pilhas, lâmpadas, celular..." />

      <CategoryPills variant="filter" />

      <div className="px-5 mb-4">
        <span className="text-[0.78rem] text-muted-foreground">
          {isLoading
            ? "Buscando pontos..."
            : `${collectionPoints.length} pontos encontrados · `}
        </span>
        <span className="text-[0.78rem] text-primary">Indaiatuba, SP</span>
      </div>

      <div className="px-5 grid grid-cols-1 lg:grid-cols-2 gap-3 mb-7">
        {!isLoading && collectionPoints.length === 0 ? (
          <div className="col-span-full text-muted-foreground">
            Nenhum ponto encontrado.
          </div>
        ) : (
          collectionPoints.map((point, i) => (
            <PointCard
              key={point.id}
              name={point.name}
              address={point.address}
              tags={(point.acceptedItems ?? []).map(getAcceptedItemTag)}
              distance={point.distance ?? "—"}
              openStatus={point.openStatus ?? ""}
              isOpen={point.open ?? point.isOpen}
              status={point.status ?? "green"}
              delay={i * 50}
              onClick={() => navigate(`/ponto/${point.id}`)}
            />
          ))
        )}
      </div>
    </AppShell>
  );
};

export default CollectionPoints;

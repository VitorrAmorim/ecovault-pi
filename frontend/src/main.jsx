import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./routes/Home.jsx";
import CollectionPoints from "./routes/CollectionPoints.jsx";
import PointDetail from "./routes/PointDetail.jsx";
import ConfirmDisposal from "./routes/ConfirmDisposal.jsx";
import Success from "./routes/Success.jsx";
import Schedule from "./routes/Schedule.jsx";
import Profile from "./routes/Profile.jsx";
import Guide from "./routes/Guide.jsx";
import NotFound from "./routes/NotFound.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pontos",
        element: <CollectionPoints />,
      },
      {
        path: "/ponto/:id",
        element: <PointDetail />,
      },
      {
        path: "/confirmar",
        element: <ConfirmDisposal />,
      },
      {
        path: "/sucesso",
        element: <Success />,
      },
      {
        path: "/agendar",
        element: <Schedule />,
      },
      {
        path: "/perfil",
        element: <Profile />,
      },
      {
        path: "/guia",
        element: <Guide />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);

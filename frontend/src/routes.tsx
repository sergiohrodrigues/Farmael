import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaPadrao from "./pages/PaginaPadrao";
import PaginaInicial from "./pages/PaginaInicial";
import PaginaAdmin from "./pages/PaginaAdmin";
import PaginaProdutos from "./pages/PaginaProdutos";
import PaginaFavoritos from "./pages/PaginaFavoritos";
import PaginaCarrinho from "./pages/PaginaCarrinho";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPadrao />}>
          <Route index element={<PaginaInicial />} />
          <Route path=":produto" element={<PaginaProdutos />} />
          <Route path="/favoritos" element={<PaginaFavoritos />} />
          <Route path="/carrinho" element={<PaginaCarrinho />} />
        </Route>
          <Route path="admin" element={<PaginaAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

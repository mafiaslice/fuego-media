import { Routes, Route, Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/ServicePage";
import AboutPage from "./pages/AboutPage";
import ForAgenciesPage from "./pages/ForAgenciesPage";
import BtsArchivePage from "./pages/BtsArchivePage";
import BtsDispatchPage from "./pages/BtsDispatchPage";

function Layout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/documentary" element={<ServicePage category="documentary" />} />
        <Route path="/commercials" element={<ServicePage category="commercial" />} />
        <Route path="/live" element={<ServicePage category="live" />} />
        <Route path="/content" element={<ServicePage category="content" />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/for-agencies" element={<ForAgenciesPage />} />
        <Route path="/bts" element={<BtsArchivePage />} />
        <Route path="/bts/:slug" element={<BtsDispatchPage />} />
      </Route>
    </Routes>
  );
}

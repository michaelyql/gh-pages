import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import LandingPage from "./LandingPage";
import Layout from "./Layout";
import Posts from "./components/Posts";
import "./sass/App.scss";

const InnerRoutes = () => {
  return (
    <>
      <Routes>
        {/* Every page will have header and footer in layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/posts/*" element={<Posts />} />
          <Route path="*" element={<ErrorPage />} />
          {/* Catch-all error page */}
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <InnerRoutes />
    </BrowserRouter>
  );
}

export default App;

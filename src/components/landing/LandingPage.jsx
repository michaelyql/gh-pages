import { createContext, useState } from "react";
import { Link } from "react-router-dom";
import MainContent from "./MainContent";
import MobileMenu from "./MobileMenu";
import TopNav from "./TopNav";

export const LandingPageContext = createContext();

const LandingPage = (props) => {
  const [isToolbarOpen, setIsToolbarOpen] = useState(true);

  return (
    <LandingPageContext.Provider value={{ isToolbarOpen }}>
      <div className="landing">
        <TopNav
          isToolbarOpen={isToolbarOpen}
          setIsToolbarOpen={setIsToolbarOpen}
        />
        <MainContent />
        <MobileMenu />
        <Link to="/blog">Link to blog</Link>
      </div>
    </LandingPageContext.Provider>
  );
};

export default LandingPage;

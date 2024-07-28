import { Link } from "react-router-dom";
import MainContent from "./MainContent";
import MobileMenu from "./MobileMenu";
import TopNav from "./TopNav";
const LandingPage = (props) => {
  return (
    <div className="landing">
      <TopNav />
      <MainContent />
      <MobileMenu />
      <Link to="/blog">Link to blog</Link>
    </div>
  );
};

export default LandingPage;

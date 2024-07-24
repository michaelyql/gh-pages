import { Link } from "react-router-dom";
const LandingPage = (props) => {
  return (
    <div className="landing">
      <h1>Landing Page Content</h1>
      <Link to="/blog">Link to blog</Link>
      <div className="google"></div>
    </div>
  );
};

export default LandingPage;

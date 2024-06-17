import { Link } from "react-router-dom";
const LandingPage = (props) => {
  return (
    <>
      <h1>Landing Page Content</h1>
      <Link to="/blog">Link to blog</Link>
    </>
  );
};

export default LandingPage;

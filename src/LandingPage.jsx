import { Link } from "react-router-dom";
const LandingPage = (props) => {
  return (
    <>
      <h1>Landing Page Content</h1>
      <Link to="posts">Link to posts</Link>
    </>
  );
};

export default LandingPage;

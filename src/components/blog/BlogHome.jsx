import { Link } from "react-router-dom";

const BlogHome = () => {
  return (
    <>
      <h1>Blog home</h1>
      <Link to="posts">Posts</Link>
    </>
  );
};

export default BlogHome;

import { Outlet } from "react-router-dom";
import BlogHeader from "./BlogHeader";

const BlogLayout = () => {
  return (
    <>
      <BlogHeader />
      <div className="blog-layout">
        <Outlet />
      </div>
    </>
  );
};

export default BlogLayout;

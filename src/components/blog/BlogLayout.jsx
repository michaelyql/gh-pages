import { Outlet } from "react-router-dom";

const BlogLayout = () => {
  return (
    <>
      {/* <BlogHeader /> */}
      <div className="blog-layout">
        <Outlet />
      </div>
    </>
  );
};

export default BlogLayout;

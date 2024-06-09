import { createContext, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import Post from "./Post";
import PostsIndex from "./PostsIndex";

export const PostContext = createContext(null);

const Posts = () => {
  const posts = useMemo(() => {
    return require
      .context("../posts", false, /\.md$/)
      .keys()
      .map((filename) => `../posts/${filename.substring(2)}`);
  }, []);

  return (
    <PostContext.Provider value={posts}>
      <Routes>
        <Route index element={<PostsIndex />} />
        <Route path=":postId" element={<Post />} />
      </Routes>
    </PostContext.Provider>
  );
};

export default Posts;

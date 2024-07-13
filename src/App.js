import Prism from "prismjs";
// cpp depends on clike, which depends on c, so all have to be imported
import "prismjs/components/prism-c";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css";
import { createContext, useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BlogHome from "./components/blog/BlogHome";
import BlogLayout from "./components/blog/BlogLayout";
import LandingPage from "./components/LandingPage";
import Post from "./components/post/Post";
import Posts from "./components/post/Posts";
import "./sass/App.scss";

Prism.disableWorkerMessageHandler = false;

export const PostContext = createContext(null);

function App() {
  const posts = useMemo(() => {
    return require
      .context("./posts", false, /\.md$/)
      .keys()
      .map((filename) => `${filename.substring(2)}`);
  }, []);

  return (
    <PostContext.Provider value={posts}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogLayout />}>
            <Route index element={<BlogHome />} />
            <Route path="posts" element={<Posts />} />
            <Route path="posts/:id" element={<Post />} />
            <Route path="*" element={<Navigate to="." />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </PostContext.Provider>
  );
}

export default App;

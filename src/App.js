import Prism from "prismjs";
// cpp depends on clike, which depends on c, so all have to be imported
import matter from "gray-matter";
import "prismjs/components/prism-c";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-tomorrow.css";
import { createContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BlogHome from "./components/blog/BlogHome";
import BlogLayout from "./components/blog/BlogLayout";
import LandingPage from "./components/LandingPage";
import Post from "./components/post/Post";
import Posts from "./components/post/Posts";
import "./sass/App.scss";

Prism.disableWorkerMessageHandler = false;

function formatFilename(file) {
  if (!file) return "";
  return file
    .substring(2)
    .replace(/\.md$/, "")
    .replace(/-/, " ")
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.substring(1))
    .join(" ");
}

function getAllPosts() {
  const _posts = [];
  require
    .context("./posts", false, /\.md$/)
    .keys()
    .map(async (filename, idx) => {
      let content, data;
      await import(`./posts/${filename.substring(2)}`)
        .then((res) => {
          const md = res.default;
          const { content: _content, data: _data } = matter(md);
          content = _content;
          data = _data;
        })
        .catch((error) => console.log(error));
      _posts.push({
        filename: formatFilename(filename),
        idx,
        content,
        data,
      });
      return filename;
    });
  return _posts;
}

const posts = getAllPosts();

export const PostContext = createContext(posts);

function App() {
  return (
    <PostContext.Provider value={posts}>
      <BrowserRouter basename="gh-pages">
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

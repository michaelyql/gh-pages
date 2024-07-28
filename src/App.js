import Prism from "prismjs";
// cpp depends on clike, which depends on c, so all have to be imported
import matter from "gray-matter";
import "prismjs/components/prism-c";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/themes/prism-okaidia.css";
import { createContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BlogHome from "./components/blog/BlogHome";
import BlogLayout from "./components/blog/BlogLayout";
import { Highlight } from "./components/customHtmlElements/Highlight";
import LandingPage from "./components/landing/LandingPage";
import Post from "./components/post/Post";
import Posts from "./components/post/Posts";
import "./sass/App.scss";

Prism.disableWorkerMessageHandler = false;

// Valid custom name documentation can be found here:
// https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
customElements.define("highlight-text", Highlight);

function formatFilename(file) {
  if (!file) return "";
  return file
    .substring(2)
    .replace(/\.md$/, "")
    .replaceAll(/-/g, " ")
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.substring(1))
    .join(" ");
}

function getAllPosts() {
  const posts = [];

  const keys = require.context("./posts", false, /\.md$/).keys();
  const postCount = keys.length;

  keys.map(async (filename, idx) => {
    let content, data;
    await import(`./posts/${filename.substring(2)}`)
      .then((res) => {
        const md = res.default;
        const { content: _content, data: _data } = matter(md);
        content = _content;
        data = _data;
      })
      .catch((error) => console.log(error));
    posts.push({
      filename: formatFilename(filename),
      idx,
      content,
      data,
    });
    return filename;
  });
  return { posts, postCount };
}

const { posts, postCount } = getAllPosts();

export const PostContext = createContext({ posts, postCount });

function App() {
  return (
    <PostContext.Provider value={{ posts, postCount }}>
      <BrowserRouter basename="/gh-pages">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogLayout />}>
            <Route index element={<BlogHome />} />
            <Route path="posts" element={<Posts />} />
            {posts
              .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
              .map((post, index) => (
                <Route
                  path={`posts/${index + 1}`}
                  element={<Post id={index + 1} />}
                  key={index}
                />
              ))}
            <Route path="*" element={<Navigate to="." />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </PostContext.Provider>
  );
}

export default App;

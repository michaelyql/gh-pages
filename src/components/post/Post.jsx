import { Typography } from "@mui/material";
import { Anchor } from "antd";
import { Buffer } from "buffer";
import Prism from "prismjs";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Markdown from "react-markdown";
import { Navigate } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import { PostContext } from "../../App";
import PostFooter from "./PostFooter";
import PostHeader, { CustomBreadcrumbs } from "./PostHeader";

// Polyfill to resolve matter's dependency on buffer
// https://stackoverflow.com/questions/70420479/react-uncaught-referenceerror-buffer-is-not-defined
if (!window.Buffer) {
  window.Buffer = Buffer;
}

// id is 1-indexed
const Post = ({ id }) => {
  const { posts } = useContext(PostContext);
  const [metadata, setMetadata] = useState(null);
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [anchorItems, setAnchorItems] = useState([]);

  useEffect(() => {
    // Dynamic imports
    // See this webpage for an example https://my-blog-tutorials.netlify.app/
    // Webpack transforms imported markdown file into a raw string, then matter parses it
    const idx = parseInt(id) - 1;

    if (isNaN(idx) || idx >= posts.length) {
      setRedirect(true);
      return;
    }
    const post = posts[idx];
    setMetadata(post.data);
    setContent(post.content);
    setLoaded(true);
  }, [id, posts]);

  // Trigger highlight only after content has been loaded
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  // Extract heading tags only after DOM has loaded with content
  useLayoutEffect(() => {
    const postBody = document.querySelector(".post-body");
    const h2Elements = [...postBody.querySelectorAll("h2")];
    const h3NestedElements = new Array(h2Elements.length);
    for (let i = 0; i < h2Elements.length; i++) {
      h3NestedElements[i] = [];
    }

    for (let i = 0; i < h2Elements.length; i++) {
      const h2Parent = h2Elements[i];
      h2Parent.setAttribute("id", `para-${i}`);
      h2Parent.setAttribute("key", `para-${i}`);
      let sibling = h2Parent.nextElementSibling;
      let j = 1;
      while (sibling && sibling.tagName !== "H2") {
        if (sibling.tagName === "H3") {
          sibling.setAttribute("id", `para-${i}-${j}`);
          sibling.setAttribute("key", `para-${i}-${j}`);
          h3NestedElements[i].push({
            key: sibling.getAttribute("key"),
            href: `#${sibling.getAttribute("id")}`,
            title: sibling.innerText,
            target: "_self",
          });
          j += 1;
        }
        sibling = sibling.nextElementSibling;
      }
    }

    const _anchorItems = h2Elements.map((item, index) => {
      return {
        key: item.getAttribute("key"),
        href: `#${item.getAttribute("id")}`,
        title: item.innerText,
        target: "_self",
        children: h3NestedElements[index],
      };
    });
    setAnchorItems([..._anchorItems]);
  }, [content]);

  if (redirect) {
    return <Navigate to="/blog/posts" />;
  }

  return (
    <div className="post">
      <CustomBreadcrumbs />
      <div className="post-wrapper">
        <div className="content">
          <PostHeader props={metadata} isLoaded={loaded} />
          <div className="post-body">
            <Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
          </div>

          <PostFooter postIndex={id} />
        </div>
        <div className="toc">
          {anchorItems.length > 0 && (
            <>
              <Typography variant="overline" className="toc-header">
                Contents
              </Typography>
              <Anchor items={anchorItems} offsetTop={96} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;

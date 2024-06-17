import { Buffer } from "buffer";
import matter from "gray-matter";
import Prism from "prismjs";
import { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Navigate, useParams } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import { PostContext } from "../../App";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";

// Polyfill to resolve matter's dependency on buffer
// https://stackoverflow.com/questions/70420479/react-uncaught-referenceerror-buffer-is-not-defined
if (!window.Buffer) {
  window.Buffer = Buffer;
}

const Post = () => {
  const { id } = useParams();
  const posts = useContext(PostContext);
  const [metadata, setMetadata] = useState(null);
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Dynamic imports
    // See this webpage for an example https://my-blog-tutorials.netlify.app/
    // Webpack transforms imported markdown file into a raw string, then matter parses it
    const postId = parseInt(id) - 1;

    if (isNaN(postId) || postId >= posts.length) {
      setRedirect(true);
      return;
    }
    const filename = posts[postId];
    import(`../../posts/${filename}`)
      .then((res) => {
        const md = res.default;
        const { content, data } = matter(md);
        setContent(content);
        setMetadata(data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, posts]);

  // Trigger highlight only after content has been loaded
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  if (redirect) {
    return <Navigate to="/blog/posts" />;
  }

  return (
    <div className="post">
      <PostHeader props={metadata} isLoaded={loaded} />
      <div className="post-body">
        <Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
      </div>
      <PostFooter />
    </div>
  );
};

export default Post;

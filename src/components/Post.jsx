import parseMD from "parse-md";
import { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import { PostContext } from "./Posts";

const Post = () => {
  const { postId } = useParams();
  const posts = useContext(PostContext);
  const [metadata, setMetadata] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    const { _metadata, _content } = parseMD(posts[postId]);
    console.log(posts[postId]);
    console.log(_content);
    setMetadata(_metadata);
    setContent(_content);
  }, [postId]);

  return <Markdown>{content}</Markdown>;
};

export default Post;

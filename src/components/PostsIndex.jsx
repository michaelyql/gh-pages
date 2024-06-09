import { useContext } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "./Posts";

const PostsIndex = () => {
  const posts = useContext(PostContext);
  console.log(posts);
  return (
    <>
      <h1>Posts Index</h1>
      <ul>
        {posts.map((post, idx) => {
          return (
            <li key={idx}>
              <Link to={`${idx}`}>
                {post}
                <br />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PostsIndex;

import { useContext } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../../App";

function capitalizeFirstLetter(str) {
  return str
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

const Posts = () => {
  const posts = useContext(PostContext);

  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.map((post, idx) => {
          const postName = post.replace(/-/g, " ").replace(/\.md$/, "");
          const formattedPostName = capitalizeFirstLetter(postName);
          return (
            <li key={idx}>
              <Link to={`${idx + 1}`}>
                {formattedPostName}
                <br />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Posts;

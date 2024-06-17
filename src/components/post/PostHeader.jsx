import { Badge } from "react-bootstrap";

function formatDate(date) {
  return `${date
    .toLocaleString("default", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/(\s\w+)$/, ",$1")}`; // Add a comma before the year
}

const PostHeader = ({ props, isLoaded }) => {
  console.log(props);
  return isLoaded ? (
    <div className="post-header">
      <h1>{props.title}</h1>
      <h3>{formatDate(props.date)}</h3>
      <div className="post-tags">
        {props.tags.map((tag, index) => (
          <Badge pill key={index}>
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  ) : (
    <h3>Loading... </h3>
  );
};

export default PostHeader;

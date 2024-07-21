import { faBookmark, faFile, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumbs, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export function formatDate(date) {
  return `${date
    .toLocaleString("default", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/(\s\w+)$/, ",$1")}`; // Add a comma before the year
}

export const CustomBreadcrumbs = ({ className }) => {
  const location = useLocation();
  const mapLocationToPath = (location) =>
    location.pathname
      .split("/")
      .slice(1)
      .map((crumb) => crumb.charAt(0).toLocaleUpperCase() + crumb.slice(1));
  const [path, setPath] = useState(() => mapLocationToPath(location));
  useEffect(() => {
    setPath(mapLocationToPath(location));
  }, [location]);
  return (
    <div className={`home-link mb-4 mt-2 ${className}`}>
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        {path.map((crumb, idx) => {
          const isBlogPath = crumb === "Blog";
          const isPostsPath = crumb === "Posts";
          const redirectTo = isBlogPath
            ? "/blog"
            : isPostsPath
              ? "/blog/posts"
              : "./";
          const icon = (
            <FontAwesomeIcon
              icon={isBlogPath ? faHouse : isPostsPath ? faBookmark : faFile}
              className="me-2"
            />
          );
          return (
            <Link key={idx} to={redirectTo}>
              <Button variant="soft">
                {icon} {crumb}
              </Button>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

const PostHeader = ({ props, isLoaded }) => {
  return (
    <>
      <div className="post-header">
        {isLoaded ? (
          <>
            <h1>{props.title}</h1>
            <h3>{formatDate(props.date)}</h3>
            <div className="post-tags">
              {props.tags.map((tag, index) => (
                <Badge pill key={index}>
                  {tag}
                </Badge>
              ))}
            </div>
          </>
        ) : (
          <h3>Loading... </h3>
        )}
      </div>
    </>
  );
};

export default PostHeader;

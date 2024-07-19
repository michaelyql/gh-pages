import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../../App";

// postIndex is 1-indexed
const PostFooter = ({ postIndex }) => {
  const { posts, postCount } = useContext(PostContext);
  const [hasPrev, setHasPrev] = useState(() => postIndex > 1);
  const [hasNext, setHasNext] = useState(() => postIndex < postCount);

  useEffect(() => {
    setHasPrev(postIndex > 1);
    setHasNext(postIndex < postCount);
  }, [postIndex]);

  return (
    <div className="post-footer">
      {hasPrev ? (
        <div className="post-prev">
          <Link to={`../posts/${postIndex - 1}`} className="nav-link">
            <FontAwesomeIcon icon={faChevronLeft} />
            Previous
          </Link>
        </div>
      ) : (
        <></>
      )}
      {hasNext ? (
        <div className="post-next">
          <Link to={`../posts/${postIndex + 1}`} className="nav-link">
            Next
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostFooter;

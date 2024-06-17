import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const PostFooter = () => {
  const [hasPrev, setHasPrev] = useState(true); // change to false
  const [hasNext, setHasNext] = useState(true);

  return (
    <div className="post-footer">
      {hasPrev ? (
        <div className="post-prev">
          <Link to=".">
            <FontAwesomeIcon icon={faChevronLeft} />
            Previous
          </Link>
        </div>
      ) : (
        <></>
      )}
      {hasNext ? (
        <div className="post-next">
          <Link to=".">
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

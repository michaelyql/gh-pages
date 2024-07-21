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
  const [prevPostData, setPrevPostData] = useState(() =>
    postIndex > 1 ? posts[postIndex - 2].data.title : ""
  );
  const [nextPostData, setNextPostData] = useState(() =>
    postIndex < postCount ? posts[postIndex].data.title : ""
  );

  useEffect(() => {
    setHasPrev(postIndex > 1);
    setHasNext(postIndex < postCount);
    setPrevPostData(postIndex > 1 ? posts[postIndex - 2].data.title : "");
    setNextPostData(postIndex < postCount ? posts[postIndex].data.title : "");
  }, [postIndex]);

  return (
    <div className="post-footer">
      {hasPrev ? (
        <div className="post-prev">
          <Link to={`../posts/${postIndex - 1}`} className="nav-link">
            <FontAwesomeIcon className="me-2" icon={faChevronLeft} />
            {prevPostData}
          </Link>
        </div>
      ) : (
        <></>
      )}
      {hasNext ? (
        <div className="post-next">
          <Link to={`../posts/${postIndex + 1}`} className="nav-link">
            <div className="next-post-data">
              {nextPostData}
              <FontAwesomeIcon className="ms-2" icon={faChevronRight} />
            </div>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostFooter;

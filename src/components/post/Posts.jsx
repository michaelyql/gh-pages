import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../../App";
import imageMap from "../../assets/Images";
import { formatDate } from "./PostHeader";

const categoryMapping = {
  cp: "Competitive Programming",
  ds: "Data Structures & Algorithms",
  spring: "Frameworks",
};

const Posts = () => {
  const { posts, postCount } = useContext(PostContext);
  const expandCategoryName = (category) => {
    return categoryMapping[category];
  };

  const getBackgroundImageForCategory = (category) => {
    if (imageMap[category] !== undefined) {
      return imageMap[category];
    }
    return "";
  };

  if (posts.length === 0)
    return <Skeleton variant="rounded" width="100%" height={200} />;

  return (
    <>
      <h1>Posts</h1>
      <div
        className={`posts-container d-flex flex-wrap flex-md-row flex-sm-column align-items-center justify-content-center`}
      >
        {posts.length === postCount ? (
          posts
            .sort((a, b) => {
              return new Date(b.data.date) - new Date(a.data.date);
            })
            .map((post, idx) => {
              const { filename, data } = post;
              return (
                <Card className={`post-card`} key={idx} sx={{ margin: "4px" }}>
                  <CardActionArea>
                    <Link to={`${idx + 1}`}>
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <CardContent>
                          <Typography
                            variant="caption"
                            sx={{ color: "#808080" }}
                          >
                            {formatDate(data.date)}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            className="mb-2"
                            sx={{ fontWeight: 400, fontSize: "1.25rem" }}
                          >
                            {filename}
                          </Typography>

                          {data.category &&
                          categoryMapping[data.category] !== undefined ? (
                            <>
                              <Divider />
                              <Typography variant="caption">
                                {expandCategoryName(data.category)}
                              </Typography>
                            </>
                          ) : (
                            <></>
                          )}
                        </CardContent>
                        <img
                          className="card-bg me-4"
                          src={getBackgroundImageForCategory(data.category)}
                          alt=""
                        />
                      </div>
                    </Link>
                  </CardActionArea>
                </Card>
              );
            })
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Posts;

import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Skeleton,
  TablePagination,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../../App";
import imageMap from "../../assets/Images";
import { CustomBreadcrumbs, formatDate } from "./PostHeader";

const categoryMapping = {
  cp: "Competitive Programming",
  ds: "Data Structures & Algorithms",
  spring: "Frameworks",
  intellij: "Java",
  java: "Java",
  postgres: "Backend/Database",
  git: "Source Control",
  react: "Frameworks",
};

const Posts = () => {
  const { posts, postCount } = useContext(PostContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const expandCategoryName = (category) => {
    return categoryMapping[category];
  };

  const getBackgroundImageForCategory = (category) => {
    if (imageMap[category] !== undefined) {
      return imageMap[category];
    }
    return "";
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (posts.length === 0)
    return <Skeleton variant="rounded" width="100%" height={200} />;

  return (
    <>
      <CustomBreadcrumbs />
      <div
        className={`posts-container d-flex flex-wrap flex-md-row flex-sm-column align-items-center justify-content-center`}
      >
        {posts
          .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
          .map((post, idx) => {
            const { filename, data } = post;
            const relativePostIndex = page * rowsPerPage + idx + 1;
            return (
              <Card className={`post-card`} key={idx} sx={{ margin: "4px" }}>
                <CardActionArea>
                  <Link to={`${relativePostIndex}`}>
                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <CardContent>
                        <Typography variant="caption" sx={{ color: "#808080" }}>
                          {formatDate(data.date)}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          className="mb-2 mt-2"
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
          })}
      </div>
      <TablePagination
        component="div"
        count={postCount}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[4, 8, 12, 16, 24]}
      />
    </>
  );
};

export default Posts;

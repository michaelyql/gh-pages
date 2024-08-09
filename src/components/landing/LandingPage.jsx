import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, IconButton, Snackbar } from "@mui/material";
import React, { createContext, useState } from "react";
import { Link } from "react-router-dom";
import MainContent from "./MainContent";
import MobileMenu from "./MobileMenu";
import TopNav from "./TopNav";

export const LandingPageContext = createContext();

const LandingPage = (props) => {
  const [isToolbarOpen, setIsToolbarOpen] = useState(true);
  const [isSnackbarOpen, setisSnackbarOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setisSnackbarOpen(false);
  };

  const closeSnackbar = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <FontAwesomeIcon icon={faClose} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <LandingPageContext.Provider value={{ isToolbarOpen }}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={isSnackbarOpen}
        autoHideDuration={null}
        onClose={handleClose}
        action={closeSnackbar}
      >
        <Alert severity="info" onClose={handleClose}>
          This page is still under development!
        </Alert>
      </Snackbar>
      <div className="landing">
        <TopNav
          isToolbarOpen={isToolbarOpen}
          setIsToolbarOpen={setIsToolbarOpen}
        />
        <MainContent />
        <MobileMenu />
        <Link to="/blog">Link to blog</Link>
      </div>
    </LandingPageContext.Provider>
  );
};

export default LandingPage;

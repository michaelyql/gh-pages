import { useContext, useEffect, useRef } from "react";
import { LandingPageContext } from "./LandingPage";

const Emails = () => {
  const { isToolbarOpen } = useContext(LandingPageContext);
  const emailElement = useRef(null);
  useEffect(() => {
    if (isToolbarOpen) {
      emailElement.current.classList.remove("margin-left");
    } else {
      emailElement.current.classList.add("margin-left");
    }
  }, [isToolbarOpen]);
  return (
    <div className="emails" ref={emailElement}>
      <div className="top-toolbar"></div>
      <div className="tabs"></div>
      Email Content
    </div>
  );
};

export default Emails;

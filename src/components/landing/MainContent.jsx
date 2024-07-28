import Emails from "./Emails";
import SideToolbar from "./SideToolbar";

const MainContent = () => {
  return (
    <div className="main-content">
      <SideToolbar />
      <Emails />
    </div>
  );
};

export default MainContent;

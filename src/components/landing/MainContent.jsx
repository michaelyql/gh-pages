import Emails from "./Emails";
import RightToolbar from "./RightToolbar";
import SideToolbar from "./SideToolbar";

const MainContent = () => {
  return (
    <div className="main-content">
      <SideToolbar />
      <Emails />
      <RightToolbar />
    </div>
  );
};

export default MainContent;

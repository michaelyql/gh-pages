import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faMagnifyingGlass,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@mui/material";
import NineDots from "./NineDots";
import Settings from "./Settings";

const TopNav = () => {
  return (
    <div className="top-nav">
      <div className="left-icons">
        <FontAwesomeIcon className="bars fa-fw fa-lg" icon={faBars} />
        <div className="logo">Logo Img</div>
      </div>
      <div className="search">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="fa-fw magnifying-glass"
        />
        <FontAwesomeIcon className="bars fa-fw fa-lg" icon={faBars} />
        <Input className="search-text" placeholder="Search mail" />
        <FontAwesomeIcon icon={faSliders} className="fa-fw sliders" />
        {/* Avatar wrapper to prevent avatar icon from being squashed */}
        <div className="avatar-wrapper">
          <div className="avatar">M</div>
        </div>
      </div>
      <div className="right-icons">
        <FontAwesomeIcon
          icon={faCircleQuestion}
          className="fa-fw fa-lg question-mark"
        />
        <Settings />
        <NineDots />
        <div className="avatar-wrapper">
          <div className="avatar">M</div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;

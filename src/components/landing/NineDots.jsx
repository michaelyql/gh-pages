import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NineDots = () => {
  return (
    <div className="nine-dots">
      <div className="svg-wrapper">
        <FontAwesomeIcon icon={faEllipsis} className="fa-fw fa-lg" />
        <FontAwesomeIcon icon={faEllipsis} className="fa-fw fa-lg" />
        <FontAwesomeIcon icon={faEllipsis} className="fa-fw fa-lg" />
      </div>
    </div>
  );
};

export default NineDots;

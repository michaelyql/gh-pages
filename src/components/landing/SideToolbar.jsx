import { useContext, useEffect, useMemo, useRef, useState } from "react";
import ClockFilled from "../../assets/clock-filled.png";
import ClockUnfilled from "../../assets/clock-unfilled.png";
import InboxFilled from "../../assets/inbox-filled.png";
import InboxUnfilled from "../../assets/inbox-unfilled.png";
import Pen from "../../assets/pen.png";
import SentFilled from "../../assets/sent-filled.png";
import SentUnfilled from "../../assets/sent-unfilled.png";
import StarFilled from "../../assets/star-filled.png";
import StarUnfilled from "../../assets/star-unfilled.png";
import { LandingPageContext } from "./LandingPage";

const sidebarItems = ["Inbox", "Starred", "Sent", "Drafts", "More"];

const unfilledSidebarIcons = [
  <img src={InboxUnfilled} alt="inbox unfilled" />,
  <img src={StarUnfilled} alt="star unfilled" />,
  <img src={ClockUnfilled} alt="clock unfilled" />,
  <img src={SentUnfilled} alt="sent unfilled" />,
];

const filledSidebarIcons = [
  <img src={InboxFilled} alt="inbox filled" />,
  <img src={StarFilled} alt="star filled" />,
  <img src={ClockFilled} alt="clock filled" />,
  <img src={SentFilled} alt="sent filled" />,
];

const SideToolbar = () => {
  const [selectedPage, setSelectedPage] = useState(sidebarItems[0]);
  const toolbarElement = useRef(null);
  const inboxElement = useRef(null);
  const starredElement = useRef(null);
  const sentElement = useRef(null);
  const draftsElement = useRef(null);
  const moreElement = useRef(null);

  const itemRefs = useMemo(
    () => [
      inboxElement,
      starredElement,
      sentElement,
      draftsElement,
      moreElement,
    ],
    []
  );

  const { isToolbarOpen } = useContext(LandingPageContext);

  useEffect(() => {
    if (isToolbarOpen) {
      toolbarElement.current.classList.add("open");
    } else {
      toolbarElement.current.classList.remove("open");
    }
  }, [isToolbarOpen]);

  return (
    <div className="side-toolbar" ref={toolbarElement}>
      <div className="compose-wrapper">
        <div className="compose">
          <img src={Pen} className="pen-icon" alt="pen" />
          {isToolbarOpen && <span className="d-block">Compose</span>}
        </div>
      </div>
      <div className="main">
        {sidebarItems.map((item, i) => {
          const isSelected = selectedPage === item;
          const _className =
            item.toLowerCase() + (isSelected ? " selected" : "");
          return (
            <div
              key={i}
              className={_className}
              ref={itemRefs[i]}
              onClick={() => setSelectedPage(item)}
            >
              {isSelected ? filledSidebarIcons[i] : unfilledSidebarIcons[i]}
              {isToolbarOpen && <span className="d-block me-auto">{item}</span>}
              {isToolbarOpen && item === "Inbox" && (
                <span className="d-block">1,438</span>
              )}
            </div>
          );
        })}
      </div>
      <div className="labels"></div>
    </div>
  );
};

export default SideToolbar;

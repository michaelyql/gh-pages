import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faArrowRotateRight,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faEllipsisV,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ArchiveUnfilled from "../../assets/archived-unfilled.png";
import BlueAvatar from "../../assets/google-avatar.png";
import InboxFilledBlue from "../../assets/inbox-filled-blue.png";
import InboxUnfilled from "../../assets/inbox-unfilled.png";
import InfoFilled from "../../assets/info-filled-blue.png";
import InfoUnfilled from "../../assets/info-unfilled.png";
import Spam from "../../assets/spam-unfilled.png";
import StarFilledYellow from "../../assets/star-filled-yellow.png";
import StarUnfilledDisabled from "../../assets/star-unfilled-disabled.png";
import TagFilled from "../../assets/tag-filled.png";
import TagUnfilled from "../../assets/tag.png";
import UserFilled from "../../assets/user-filled-blue.png";
import UserUnfilled from "../../assets/user-unfilled.png";
import { LandingPageContext } from "./LandingPage";

const EmailContext = createContext({});

const Emails = () => {
  const { isToolbarOpen } = useContext(LandingPageContext);
  const emailElement = useRef(null);
  const [isEmailDetailViewOpened, setIsEmailDetailViewOpened] = useState(false);
  const [emailDetailViewIndex, setEmailDetailViewIndex] = useState(-1);

  const emailSender = useMemo(() => {
    return {
      0: "Simply Compete Admin",
      1: "ESGTech Admin",
      2: "Taeseong Taekwondo",
    };
  }, []);
  const fullEmail = useMemo(() => {
    return {
      0: "<info@simplycompete.co>",
      1: "<admin@esgtech.co>",
      2: "<taeseongtkd@gmail.com>",
    };
  }, []);
  const emailTitle = useMemo(() => {
    return {
      0: "Membership Registered",
      1: "Successful Application to ESGTech",
      2: "Invoice NOV3590 has been generated",
    };
  }, []);
  const emailDescription = useMemo(() => {
    return {
      0: "Login NOW!",
      1: "Thank you and see you soon! On Thu, May 9, 2024 at 10:04AM ESGTech Admin",
      2: "Invoice NOV3590 for Michael Yang has been generated",
    };
  }, []);
  const emailDates = useMemo(() => {
    return {
      0: "Aug 1",
      1: "Jul 1",
      2: "Jun 2",
    };
  }, []);
  const [readStatus, setReadStatus] = useState(
    new Array(Object.keys(emailSender).length).fill(false)
  );
  const [starredStatus, setStarredStatus] = useState(
    new Array(Object.keys(emailSender).length).fill(false)
  );

  useEffect(() => {
    if (isToolbarOpen) {
      emailElement.current.classList.remove("margin-left");
    } else {
      emailElement.current.classList.add("margin-left");
    }
  }, [isToolbarOpen]);

  return (
    <EmailContext.Provider
      value={{
        isEmailDetailViewOpened,
        setIsEmailDetailViewOpened,
        emailDetailViewIndex,
        setEmailDetailViewIndex,
        readStatus,
        setReadStatus,
        starredStatus,
        setStarredStatus,
        emailSender,
        emailTitle,
        emailDescription,
        emailDates,
        fullEmail,
      }}
    >
      <div className="emails" ref={emailElement}>
        {!isEmailDetailViewOpened ? (
          <>
            <TopToolbar />
            <Tabs />
            <EmailTable />
          </>
        ) : (
          <EmailDetailView />
        )}
      </div>
    </EmailContext.Provider>
  );
};

const TopToolbar = () => {
  return (
    <div className="top-toolbar">
      <div className="left-icons">
        <div className="checkbox-wrapper d-inline-block square">
          <input type="checkbox" className="checkbox" />
        </div>
        <FontAwesomeIcon
          icon={faCaretDown}
          className="fa-fw square caret-down"
        />
        <FontAwesomeIcon
          icon={faArrowRotateRight}
          className="fa-fw circle refresh"
        />
        <FontAwesomeIcon icon={faEllipsisV} className="fa-fw circle" />
      </div>
      <div className="right-icons">
        <span className="d-inline-block square mail-count">1-50 of 2,015</span>
        <FontAwesomeIcon icon={faCaretLeft} className="fa-fw circle disabled" />
        <FontAwesomeIcon icon={faCaretRight} className="fa-fw circle" />
        <FontAwesomeIcon icon={faKeyboard} className="fa-fw square" />
        <FontAwesomeIcon
          icon={faCaretDown}
          className="fa-fw square caret-down"
        />
      </div>
    </div>
  );
};

const Tabs = () => {
  const tabItems = useMemo(
    () => ["Primary", "Promotions", "Social", "Updates"],
    []
  );
  const tabSubtitles = useMemo(
    () => ["", "Moomoo", "LinkedIn", "Notifications"],
    []
  );
  const tabChips = useMemo(
    () => [
      { text: "", bgColor: "" },
      { text: "1 new", bgColor: "#178038" },
      { text: "5 new", bgColor: "#1c73e8" },
      { text: "1 new", bgColor: "#e37401" },
    ],
    []
  );

  const unfilledTabItemIcons = [
    <img src={InboxUnfilled} alt="inbox" />,
    <img src={TagUnfilled} alt="promotions" />,
    <img src={UserUnfilled} alt="socials" />,
    <img src={InfoUnfilled} alt="info" />,
  ];
  const filledTabItemIcons = [
    <img src={InboxFilledBlue} alt="inbox" />,
    <img src={TagFilled} alt="promotions" />,
    <img src={UserFilled} alt="socials" />,
    <img src={InfoFilled} alt="info" />,
  ];

  const [activeTab, setActiveTab] = useState(tabItems[0]);

  return (
    <div className="tabs">
      {tabItems.map((item, i) => {
        const isActiveTab = activeTab === item;
        return (
          <div
            className={`${item} ${isActiveTab ? "active" : ""}`}
            onClick={() => setActiveTab(item)}
            key={i}
          >
            {isActiveTab ? filledTabItemIcons[i] : unfilledTabItemIcons[i]}
            <div className="tab-text">
              <span className="tab-title">
                {item}
                <div
                  className="tab-chip"
                  style={{ backgroundColor: tabChips[i].bgColor }}
                >
                  <span>{tabChips[i].text}</span>
                </div>
              </span>
              <span className="tab-subtitle">{tabSubtitles[i]}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const EmailTable = () => {
  const {
    setIsEmailDetailViewOpened,
    setEmailDetailViewIndex,
    emailSender,
    emailTitle,
    emailDescription,
    emailDates,
    readStatus,
    setReadStatus,
    starredStatus,
    setStarredStatus,
  } = useContext(EmailContext);

  const handleEmailClick = (event, idx) => {
    // Update read status
    const newStatus = readStatus;
    newStatus[idx] = true;
    setReadStatus([...newStatus]);

    // Open email detail view
    setEmailDetailViewIndex(idx);
    setIsEmailDetailViewOpened(true);
  };
  const updateStarredStatus = (event, idx) => {
    event.stopPropagation();
    const newStarredStatus = starredStatus;
    newStarredStatus[idx] = !starredStatus[idx];
    setStarredStatus([...newStarredStatus]);
  };
  return (
    <div className="email-table">
      <table>
        <tbody>
          {Object.keys(emailSender).map((i) => {
            const isRead = readStatus[i];
            const isStarred = starredStatus[i];
            return (
              <tr
                key={i}
                onClick={(event) => handleEmailClick(event, i)}
                className={`${isRead ? "read" : ""}`}
              >
                <td>
                  <input type="checkbox" className="checkbox"></input>
                </td>
                <td>
                  <div
                    className="star-wrapper"
                    onClick={(event) => updateStarredStatus(event, i)}
                  >
                    {isStarred ? (
                      <img src={StarFilledYellow} alt="starred" />
                    ) : (
                      <img src={StarUnfilledDisabled} alt="unstarred" />
                    )}
                  </div>
                </td>
                <td className={`email-sender ${isRead ? "read" : ""}`}>
                  {emailSender[i]}
                </td>
                <td className="email-info">
                  <span className={`email-title ${isRead ? "read" : ""}`}>
                    {emailTitle[i]}
                  </span>
                  <span className="seperator">{" - "}</span>
                  <span className="email-description">
                    {emailDescription[i]}
                  </span>
                </td>
                <td className={`email-date ${isRead ? "read" : ""}`}>
                  {emailDates[i]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const EmailDetailView = () => {
  const {
    setIsEmailDetailViewOpened,
    emailDetailViewIndex: idx,
    emailSender,
    emailTitle,
    emailDescription,
    emailDates,
    fullEmail,
  } = useContext(EmailContext);
  return (
    <div className="email-detail-view">
      <div className="email-detail-toolbar top-toolbar">
        <div className="left-icons">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="fa-fw circle me-3"
            onClick={() => setIsEmailDetailViewOpened(false)}
          />
          <div className="icon-wrapper circle">
            <img src={ArchiveUnfilled} alt="archive" className="archive" />
          </div>
          <div className="icon-wrapper circle">
            <img src={Spam} alt="spam" className="spam" />
          </div>
          <FontAwesomeIcon icon={faTrashCan} className="fa-fw circle trash" />
        </div>
        <div className="right-icons">right icons</div>
      </div>
      <div className="content-wrapper">
        <div className="email-detail-title">{emailTitle[idx]}</div>
        <div className="email-detail-content">
          <div className="sender-avatar">
            <img src={BlueAvatar} alt="avatar" />
          </div>
          <div className="detail-main">
            <div className="email-detail-header">
              <div className="sender-name">{emailSender[idx]}</div>
              <div className="sender-full-email">{fullEmail[idx]}</div>
              <div className="email-detail-date">{emailDates[idx]}</div>
            </div>

            <div className="email-detail-desc">{emailDescription[idx]}</div>
            <div className="email-actions">
              <div className="reply-btn">Reply</div>
              <div className="forward-btn">Forward</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emails;

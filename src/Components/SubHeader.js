import {
  BsLayoutSidebar,
  BsLayoutSplit,
  BsLayoutThreeColumns,
} from "react-icons/bs";
import BookmarkTab from "./BookmarkTab.js";
import CreateThreadPopUp from "./CreateThreadPopUp.js";

export default function SubHeader({
  clickedCreateThread,
  SetClickedCreateThread,
  titleTextareaInput,
  textareaInput,
  SetTitleTextareaInput,
  SetTextareaInput,
  handleTitleTextareaChange,
  handleTextareaChange,
  handleSubmitThread,
  handleCreateThreadPopup,
  threadLayout,
  SetThreadLayout,
  SetClickedHideThreads,
  clickedHideThreads,
  SetThreadImage,
  SetClickedBks,
  clickedBks,
  bkcopy,
  SetbkCopy,
}) {
  return (
    <div className="SubHeader">
      <CreateThreadPopUp
        clickedCreateThread={clickedCreateThread}
        SetClickedCreateThread={SetClickedCreateThread}
        titleTextareaInput={titleTextareaInput}
        textareaInput={textareaInput}
        SetTitleTextareaInput={SetTitleTextareaInput}
        SetTextareaInput={SetTextareaInput}
        handleTitleTextareaChange={handleTitleTextareaChange}
        handleTextareaChange={handleTextareaChange}
        handleSubmitThread={handleSubmitThread}
        SetThreadImage={SetThreadImage}
      />

      <a
        onClick={handleCreateThreadPopup}
        className="HyperText"
        style={{
          position: "absolute",
          left: "0",
          marginLeft: "15px",
        }}
      >
        [Create Thread]
      </a>
      <a className="HyperText" onClick={() => SetClickedBks(!clickedBks)}>
        [Bookmarks]
      </a>
      <BookmarkTab
        clickedBks={clickedBks}
        SetClickedBks={SetClickedBks}
        bkcopy={bkcopy}
        SetbkCopy={SetbkCopy}
      />
      <div className="dropdown">
        <a className="HyperText dropdownParent">[Change Layout]</a>
        <div className="dropdownContent">
          <a
            className="HyperText dropdownOption"
            style={{
              transform: "rotate(90deg)",
              backgroundColor:
                threadLayout == 1 ? "rgb(76, 76, 76)" : "rgb(56, 56, 56)",
            }}
            onClick={() => SetThreadLayout(1)}
          >
            <BsLayoutSidebar size={20} />
          </a>
          <a
            className="HyperText dropdownOption"
            onClick={() => SetThreadLayout(2)}
            style={{
              backgroundColor:
                threadLayout == 2 ? "rgb(76, 76, 76)" : "rgb(56, 56, 56)",
            }}
          >
            <BsLayoutSplit size={20} />
          </a>
          <a
            className="HyperText dropdownOption"
            onClick={() => SetThreadLayout(3)}
            style={{
              backgroundColor:
                threadLayout == 3 ? "rgb(76, 76, 76)" : "rgb(56, 56, 56)",
            }}
          >
            <BsLayoutThreeColumns size={20} />
          </a>
        </div>
      </div>
      <a
        className="HyperText"
        onClick={() => SetClickedHideThreads(!clickedHideThreads)}
      >
        {clickedHideThreads ? "[Reveal Threads]" : "[Hide Threads]"}
      </a>
      <a
        className="HyperText"
        style={{
          textDecoration: "none",
          display: "inline-block",
        }}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        [Scroll to Top]
      </a>
      <a
        className="HyperText"
        onClick={() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }}
      >
        [Scroll to Bottom]
      </a>
    </div>
  );
}

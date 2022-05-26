import { useEffect, useState } from "react";
import "./App.css";
import { Threads } from "./Threads.js";
import Thread from "./Thread.js";
import SubHeader from "./SubHeader.js";
import { FaJoint } from "react-icons/fa";
import { Bookmarks } from "./Bookmarks.js";

import Masonry from "react-masonry-css";

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = "rgb(66, 65, 65)";
    document.body.style.overflowX = "hidden";
  });

  let Bks = [...Bookmarks];

  const [clickedCreateThread, SetClickedCreateThread] = useState(false);
  const [textareaInput, SetTextareaInput] = useState("");
  const [titleTextareaInput, SetTitleTextareaInput] = useState("");
  const [clickedHideThreads, SetClickedHideThreads] = useState(false);
  const [threadLayout, SetThreadLayout] = useState(1);
  const [threadImage, SetThreadImage] = useState();
  const [clickedBks, SetClickedBks] = useState(false);
  const [bkcopy, SetbkCopy] = useState(Bks);
  const [highlightEmptyField, SetHighlightEmptyField] = useState(false);

  const uuid = require("react-uuid");

  function handleCreateThreadPopup() {
    SetClickedCreateThread(!clickedCreateThread);
    SetTextareaInput("");
    SetTitleTextareaInput("");
  }

  function handleSubmitThread() {
    if (textareaInput === "" || titleTextareaInput === "") {
      SetHighlightEmptyField(true);
    } else {
      Threads.push({
        threadTextValue: textareaInput,
        threadTitle: titleTextareaInput,
        ID: uuid(),
        key: Threads.length,
        threadTime: new Date().toLocaleTimeString(),
        threadImage: threadImage,
        ThreadReplies: [
          {
            replyTextValue: "",
            ID: 0,
            key: 0,
            replyTime: "",
            replyingtoReply: true,
            replyingto: "",
            replyingtoTextValue: "",
            repliestoThisReply: [{ repID: "", repVal: "" }],
          },
        ],
      });

      SetThreadImage(undefined);
      SetClickedCreateThread(false);
      SetTextareaInput("");
      SetTitleTextareaInput("");
      SetHighlightEmptyField(false);
    }
  }

  function handleTextareaChange(textareaInputChange: any) {
    SetTextareaInput(textareaInputChange.target.value);
  }

  function handleTitleTextareaChange(titleTextareaInputChange: any) {
    SetTitleTextareaInput(titleTextareaInputChange.target.value);
  }

  return (
    <div className="Container">
      <div className="Header" id="top" style={{ userSelect: "none" }}>
        <span style={{ transform: "scaleX(-1)" }}>
          <FaJoint size={25} />
        </span>{" "}
        765 Forums <FaJoint size={25} />{" "}
      </div>
      <SubHeader
        clickedCreateThread={clickedCreateThread}
        SetClickedCreateThread={SetClickedCreateThread}
        titleTextareaInput={titleTextareaInput}
        textareaInput={textareaInput}
        SetTitleTextareaInput={SetTitleTextareaInput}
        SetTextareaInput={SetTextareaInput}
        handleTitleTextareaChange={handleTitleTextareaChange}
        handleTextareaChange={handleTextareaChange}
        handleSubmitThread={handleSubmitThread}
        handleCreateThreadPopup={handleCreateThreadPopup}
        threadLayout={threadLayout}
        SetThreadLayout={SetThreadLayout}
        SetClickedHideThreads={SetClickedHideThreads}
        clickedHideThreads={clickedHideThreads}
        SetThreadImage={SetThreadImage}
        clickedBks={clickedBks}
        SetClickedBks={SetClickedBks}
        bkcopy={bkcopy}
        SetbkCopy={SetbkCopy}
        highlightEmptyField={highlightEmptyField}
        SetHighlightEmptyField={SetHighlightEmptyField}
      />
      <Masonry
        breakpointCols={threadLayout}
        className="masongrid"
        columnClassName="masongridcolumn"
      >
        {Threads.map((item) => (
          <div
            key={item.ID}
            style={{
              display: item.key == 0 ? "none" : "block",
            }}
          >
            <Thread
              threadTextValue={item.threadTextValue}
              threadTitle={item.threadTitle}
              ID={item.ID}
              itemkey={item.key}
              threadTime={item.threadTime}
              threadImage={item.threadImage}
              clickedHideThreads={clickedHideThreads}
              bkcopy={bkcopy}
              SetbkCopy={SetbkCopy}
            />
          </div>
        ))}
      </Masonry>

      <div className="Footer">
        {" "}
        <a className="HyperText" style={{ display: "inline-block" }}>
          [Page 1]
        </a>{" "}
      </div>
    </div>
  );
}

export default App;

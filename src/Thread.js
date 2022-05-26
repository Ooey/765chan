import { useState } from "react";
import { Threads } from "./Threads";
import { Bookmarks } from "./Bookmarks";
import PostReplyPopUp from "./PostReplyPopUp";
import ReplyingHoverPopUp from "./ReplyingHoverPopUp";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

//1) Implement replying to replies and also implement user ID's
//2) Implement to be able to make a thread that has a poll in it
//3) user can input a posterID when he makes a thread, and also a password
//he will be able to delete or add images to a thread with captions after he has created
//as long as he writes the correct password (and posterID (posterID is public))
//4) button on thread that when clicked smooth scrolls to next thread

function Thread(props) {
  const [clickedPostReply, SetClickedPostReply] = useState(false);
  const [replyTextareaInput, SetReplyTextareaInput] = useState("");
  const [clickedThreadImage, SetClickedThreadImage] = useState(false);
  const [clickedRevealThread, SetClickedRevealThread] = useState(false);
  const [clickedRevealReplies, SetClickedRevealReplies] = useState(true);
  const [clickedReplytoReply, SetClickedReplytoReply] = useState(false);
  const [ReplytoReplyto, SetReplytoReplyto] = useState("");
  const [ReplytoReplytoKey, SetReplytoReplytoKey] = useState("");
  const [highlightThread, SetHighlightThread] = useState(false);
  const [highlightThisReply, SetHighlightThisReply] = useState("");
  const [highlightThisReplyTextValue, SetHighlightThisReplyTextValue] =
    useState("");
  const [hovering, SetHovering] = useState(false);
  const [mouseCord, SetMouseCord] = useState({ x: 0, y: 0 });
  const [bked, Setbked] = useState(false);
  const [unbked, SetUnbked] = useState("");

  const handleMouseMove = (e) => {
    SetMouseCord({ x: e.screenX, y: e.clientY + window.pageYOffset });
  };

  function handleClickRevealThread() {
    SetClickedRevealThread(!clickedRevealThread);
  }
  function handleClickRevealReplies() {
    SetClickedRevealReplies(!clickedRevealReplies);
  }
  function handleReplyTextareaChange(replyTextareaInputChange) {
    SetReplyTextareaInput(replyTextareaInputChange.target.value);
  }
  function handleClickThreadImage() {
    SetClickedThreadImage(!clickedThreadImage);
  }
  function handlePostReplyPopUp() {
    SetClickedPostReply(!clickedPostReply);
    SetClickedReplytoReply(false);
    SetReplyTextareaInput("");
  }

  const renderReplies = Threads[props.itemkey].ThreadReplies.map((reply) => (
    <li
      style={{
        display: reply.key == 0 ? "none" : "block",
        backgroundColor:
          reply.ID == highlightThisReply
            ? "rgb(79, 78, 78)"
            : "rgb(59, 58, 58)",
        transition: ".2s",
        transitionTimingFunction: "ease-out",
      }}
      className="ThreadReply"
      key={reply.ID}
      id={reply.ID}
    >
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "-20px -20px 0px -20px",
          backgroundColor: "rgb(25, 25, 25)",
        }}
      >
        <a
          className="HyperText"
          style={{
            fontSize: "small",
          }}
          onClick={() => {
            if (clickedReplytoReply == false) {
              SetClickedReplytoReply(true);
              SetClickedPostReply(false);
              SetReplytoReplyto(reply.ID);
              SetReplytoReplytoKey(reply.key);
            } else {
              SetClickedReplytoReply(false);
              SetClickedPostReply(false);
              SetReplytoReplyto("");
              SetReplytoReplytoKey("");
              SetReplyTextareaInput("");
            }
          }}
        >
          [Reply]
        </a>{" "}
        <div
          style={{
            backgroundColor: "rgb(22, 22, 22)",
            borderBottom: "1px solid rgb(12, 12, 12)",
          }}
        ></div>{" "}
        <ul
          style={{
            listStyleType: "none",
            float: "left",
            display: reply.repliestoThisReply.length != 1 ? "block" : "none",
          }}
        >
          {Threads[props.itemkey].ThreadReplies[
            reply.key
          ].repliestoThisReply.map((rep) => (
            <div key={rep.repID}>
              <li
                onMouseEnter={() => {
                  SetHighlightThisReply(rep.repID);
                  SetHighlightThisReplyTextValue(rep.repVal);
                  SetHovering(true);
                }}
                onMouseLeave={() => {
                  SetHighlightThisReply("");
                  SetHighlightThisReplyTextValue("");
                  SetHovering(false);
                }}
                onMouseMove={handleMouseMove}
                style={{
                  display: rep.repID == "" ? "none" : "block",
                  float: "left",
                  fontSize: "smaller",
                }}
              >
                {" "}
                <a className="HyperText">
                  {">>"}
                  {rep.repID}
                </a>
              </li>{" "}
            </div>
          ))}
        </ul>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <a
          className="HyperTextnoHover"
          style={{ fontSize: "small", float: "left" }}
        >
          ID: {reply.ID}
        </a>
        <a
          style={{ fontSize: "small", float: "left" }}
          className="HyperTextnoHover"
        >
          {reply.replyTime}
        </a>
        <a
          href={reply.replyingto}
          className="HyperText"
          style={{ fontSize: "small" }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(reply.replyingto).scrollIntoView({
              behavior: "smooth",
            });
            SetHighlightThisReply(reply.replyingto);
          }}
          onMouseEnter={
            !reply.replyingtoReply
              ? () => SetHighlightThread(true)
              : () => {
                  SetHighlightThisReply(reply.replyingto);
                  SetHighlightThisReplyTextValue(reply.replyingtoTextValue);
                  SetHovering(true);
                }
          }
          onMouseLeave={
            !reply.replyingtoReply
              ? () => SetHighlightThread(false)
              : () => {
                  SetHighlightThisReply("");
                  SetHighlightThisReplyTextValue("");
                  SetHovering(false);
                }
          }
          onMouseMove={handleMouseMove}
        >
          Replying to:{" "}
          {reply.replyingtoReply ? reply.replyingto : Threads[props.itemkey].ID}
          <br />
        </a>{" "}
        <a
          className="HyperText"
          style={{ fontSize: "smaller", marginRight: "0em" }}
        >
          Send Chat Request to Poster
        </a>
      </div>
      <div style={{ fontSize: "large", fontFamily: "monospace" }}>
        {reply.replyTextValue}
      </div>
      <ReplyingHoverPopUp
        mouseCord={mouseCord}
        hovering={hovering}
        replyingtoTextValue={reply.replyingtoTextValue}
        key={reply.ID}
        highlightThisReply={highlightThisReply}
        highlightThisReplyTextValue={highlightThisReplyTextValue}
      />
    </li>
  ));

  return (
    <div
      className="ThreadContainer"
      style={{
        backgroundColor: highlightThread
          ? "rgb(42, 40, 40)"
          : "rgb(32, 30, 30)",
        transition: ".2s",
      }}
      key={props.ID}
    >
      <a
        className="HyperText"
        onClick={handleClickRevealThread}
        style={{ display: "inline-block" }}
      >
        {clickedRevealThread ? "Reveal Thread <..." : "Collapse Thread >..."}
      </a>
      <a
        className="HyperText"
        style={{ textAlign: "right", float: "right" }}
        onClick={handlePostReplyPopUp}
      >
        [Post Reply to Thread]
      </a>{" "}
      <div
        style={{ float: "left" }}
        onClick={() => {
          Setbked(!bked);
          if (!bked) {
            props.bkcopy.push({ threadID: props.ID });
          } else {
            SetUnbked(props.ID);
            for (let i = 0; i < props.bkcopy.length; i++) {
              if (unbked == props.bkcopy[i].threadID) {
                props.bkcopy.splice(i, 1);
              }
            }
            props.bkcopy.pop();
          }

          console.log(props.bkcopy);
        }}
      >
        {bked ? (
          <AiFillStar size={25} className="HyperText" />
        ) : (
          <AiOutlineStar size={25} className="HyperText" />
        )}
      </div>
      <div
        style={{
          float: "right",
          right: "2rem",
          position: "fixed",
        }}
      >
        <PostReplyPopUp
          ThreadReplies={Threads[props.itemkey].ThreadReplies}
          clickedPostReply={clickedPostReply}
          SetClickedPostReply={SetClickedPostReply}
          replyTextareaInput={replyTextareaInput}
          SetReplyTextareaInput={SetReplyTextareaInput}
          handleReplyTextareaChange={handleReplyTextareaChange}
          clickedReplytoReply={clickedReplytoReply}
          SetClickedReplytoReply={SetClickedReplytoReply}
          threadID={Threads[props.itemkey].ID}
          ReplytoReplyto={ReplytoReplyto}
          ReplytoReplytoKey={ReplytoReplytoKey}
        />
      </div>
      <h1
        style={{
          color: "white",
          textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          fontSize: "1.2rem",
        }}
      >
        {props.threadTime}
      </h1>
      <h3
        style={{
          color: "white",
          textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        Thread ID: {props.ID}
        <br />
        Poster ID: {}
      </h3>
      <p className="ThreadTitle">{props.threadTitle}</p>
      <div
        style={{
          display: clickedRevealThread ? "none" : "block",
        }}
      >
        <div
          style={{
            display: props.clickedHideThreads ? "none" : "block",
          }}
        >
          {props.threadImage != undefined && (
            <>
              <a className="HyperTextnoHover">{props.threadImage[1]}</a>
              <img
                style={{ cursor: "pointer" }}
                src={props.threadImage[0]}
                width={clickedThreadImage ? "400" : "200"}
                height={clickedThreadImage ? "400" : "200"}
                className="ThreadImg"
                onClick={handleClickThreadImage}
              />
            </>
          )}
          <p className="ThreadText" style={{ wordWrap: "break-word" }}>
            {props.threadTextValue}
          </p>
          <div style={{ clear: "both" }}></div>
          <a
            className="HyperText"
            style={{ display: "inline-block" }}
            onClick={handleClickRevealReplies}
          >
            {Threads[props.itemkey].ThreadReplies.length - 1}{" "}
            {Threads[props.itemkey].ThreadReplies.length == 2
              ? "Reply"
              : "Replies"}
            {", "}
            {clickedRevealReplies ? "Collapse <..." : "Reveal >..."}
          </a>
          {clickedRevealReplies && <div>{renderReplies}</div>}
        </div>
      </div>
    </div>
  );
}
export default Thread;
import { FiX } from "react-icons/fi";
import Draggable from "react-draggable";

function PostReplyPopUp(props) {
  const uuid = require("react-uuid");
  function handlePostReply() {
    if (props.replyTextareaInput === "") {
      console.log("empty");
    } else {
      props.ThreadReplies.push({
        replyTextValue: props.replyTextareaInput,
        ID: uuid(),
        key: props.ThreadReplies.length,
        replyTime: new Date().toLocaleTimeString(),
        replyingtoReply: props.clickedReplytoReply ? true : false,
        replyingto: props.ReplytoReplyto,
        replyingtoTextValue: "",
        repliestoThisReply: [{ repID: "", repVal: "" }],
      });
      if (props.clickedReplytoReply) {
        props.ThreadReplies[props.ReplytoReplytoKey].repliestoThisReply.push({
          repID: props.ThreadReplies[props.ThreadReplies.length - 1].ID,
          repVal:
            props.ThreadReplies[props.ThreadReplies.length - 1].replyTextValue,
        });
      }

      if (props.clickedReplytoReply) {
        for (let i = 1; i < props.ThreadReplies.length; i++) {
          if (
            props.ThreadReplies[i].ID ==
            props.ThreadReplies[props.ThreadReplies.length - 1].replyingto
          ) {
            props.ThreadReplies[
              props.ThreadReplies.length - 1
            ].replyingtoTextValue = props.ThreadReplies[i].replyTextValue;
          }
        }
      }

      props.SetClickedPostReply(false);
      props.SetClickedReplytoReply(false);
      props.SetReplyTextareaInput("");
    }
  }

  function closePostReply() {
    props.SetClickedPostReply(false);
    props.SetClickedReplytoReply(false);
    props.SetReplyTextareaInput("");
  }

  return (
    <div
      style={{
        display:
          props.clickedPostReply || props.clickedReplytoReply
            ? "block"
            : "none",
      }}
    >
      <div
        className="ThreadTypeWindow"
        style={{ position: "fixed", textAlign: "center" }}
      >
        <div className="ThreadModalTopBar" id="topbar">
          <a className="HyperText" onClick={closePostReply}>
            <FiX size={25} />
          </a>
        </div>

        <a className="HyperText" style={{ cursor: "auto", margin: "10px" }}>
          Reply to:{" "}
          {props.clickedReplytoReply ? props.ReplytoReplyto : props.threadID}
        </a>
        <textarea
          className="ThreadInputArea"
          value={props.replyTextareaInput}
          onChange={props.handleReplyTextareaChange}
        ></textarea>

        <h2
          className="HyperText"
          style={{ textAlign: "center" }}
          onClick={handlePostReply}
        >
          [Submit]
        </h2>
      </div>
    </div>
  );
}

export default PostReplyPopUp;

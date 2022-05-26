import { FiX } from "react-icons/fi";
import Draggable from "react-draggable";
import { Bookmarks } from "./Bookmarks.js";

export default function BookmarkTab(props) {
  const renderBookmarks = props.bkcopy.map((bk) => (
    <div style={{ color: "white", margin: "20px" }} key={bk.threadID}>
      {bk.threadID}
    </div>
  ));

  return (
    <div>
      {props.clickedBks && (
        <Draggable handle=".ThreadModalTopBar">
          <div className="ThreadTypeWindow" style={{ position: "fixed" }}>
            <div className="ThreadModalTopBar" id="#topbar">
              <a
                className="HyperText"
                onClick={() => props.SetClickedBks(!props.clickedBks)}
              >
                <FiX size={25} />
              </a>
            </div>
            <div>
              {Bookmarks.length == 0 ? (
                <a className="HyperTextnoHover">
                  Bookmarks are Empty, Add some by clicking the stars on threads
                </a>
              ) : (
                <div>{renderBookmarks}</div>
              )}
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
}

import { FiX } from "react-icons/fi";
import Draggable from "react-draggable";

function CreateThreadPopUp({
  clickedCreateThread,
  SetClickedCreateThread,
  titleTextareaInput,
  handleTitleTextareaChange,
  textareaInput,
  SetTitleTextareaInput,
  SetTextareaInput,
  handleTextareaChange,
  handleSubmitThread,
  SetThreadImage,
  highlightEmptyField,
  SetHighlightEmptyField,
}) {
  function closeCreateThread() {
    SetClickedCreateThread(false);
    SetTitleTextareaInput("");
    SetTextareaInput("");
    SetHighlightEmptyField(false);
  }

  return (
    <div>
      {clickedCreateThread && (
        <Draggable handle=".ThreadModalTopBar">
          <div className="ThreadTypeWindow" style={{ position: "fixed" }}>
            <div className="ThreadModalTopBar" id="#topbar">
              <a className="HyperText" onClick={closeCreateThread}>
                <FiX size={25} />
              </a>
            </div>
            <a className="HyperText" style={{ cursor: "auto" }}>
              Thread Title:
            </a>
            <textarea
              style={{
                backgroundColor: highlightEmptyField
                  ? "rgba(66, 25, 25,0.5)"
                  : "rgb(66, 64, 64)",
              }}
              className="ThreadTitleInputArea"
              value={titleTextareaInput}
              onChange={handleTitleTextareaChange}
            ></textarea>
            <a className="HyperText" style={{ cursor: "auto" }}>
              Thread Content:
            </a>
            <textarea
              style={{
                backgroundColor: highlightEmptyField
                  ? "rgba(66, 25, 25,0.5)"
                  : "rgb(66, 64, 64)",
              }}
              className="ThreadInputArea"
              value={textareaInput}
              onChange={handleTextareaChange}
            ></textarea>
            <div>
              <a
                className="HyperText"
                style={{ cursor: "auto", float: "left" }}
              >
                Thread Image:
              </a>
              <br />
              <br />
              <div style={{}}>
                <label className="FileInputPrompt HyperText">
                  Select Image
                  <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={(event) => {
                      const [file] = event.target.files;
                      const fileList = event.target.files;
                      console.log(fileList);
                      SetThreadImage([
                        URL.createObjectURL(file),
                        file.name,
                        fileList[0].width,
                        fileList[0].height,
                      ]);
                    }}
                  />
                </label>
              </div>
            </div>
            <h2
              className="HyperText"
              style={{ textAlign: "center" }}
              onClick={handleSubmitThread}
            >
              [Submit]
            </h2>
          </div>
        </Draggable>
      )}
    </div>
  );
}

export default CreateThreadPopUp;

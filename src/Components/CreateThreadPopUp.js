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
}) {
  function closeCreateThread() {
    SetClickedCreateThread(false);
    SetTitleTextareaInput("");
    SetTextareaInput("");
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
              className="ThreadTitleInputArea"
              value={titleTextareaInput}
              onChange={handleTitleTextareaChange}
            ></textarea>
            <a className="HyperText" style={{ cursor: "auto" }}>
              Thread Content:
            </a>
            <textarea
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
              <input
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

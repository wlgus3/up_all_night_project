"use client";
// import styles from "../contents/QuillEditor.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useMemo } from "react";
// import { imageApi } from "../../../apis/posts";

const imageHandler = () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.addEventListener("change", async () => {
    const file = input.files[0];

    try {
      const res = await imageApi({ img: file });
      const imgUrl = res.data.imgUrl;
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();
      editor.insertEmbed(range.index, "image", imgUrl);
      editor.setSelection(range.index + 1);
    } catch (error) {
      console.log(error);
    }
  });
};

export default function QuillEditor({ html, setHtml }) {
  const quillRef = useRef(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
          // ["image"], //! 일단 에디터에서 이미지 입력은 제외
        ],
        // handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "align", "image"];

  return (
    <ReactQuill
      // style={{ width: "70vw", height: "400px" }}
      className="quill_Editor"
      ref={quillRef}
      // onChange={setHtml}
      // className={styles.quill}
      modules={modules}
      formats={formats}
      // value={html}
      placeholder={"본문의 글을 입력하세요"}
      theme="snow"
    />
  );
}

import { Editor as EditorTinymce } from "@tinymce/tinymce-react";

const Editor = ({ onChange, value }) => {
  return (
    <EditorTinymce
      height={300}
      onEditorChange={onChange}
      value={value}
      apiKey="17qepenhep6dntokydj6tl05q0uudfpkppz3rjhobn5ct7ag"
      init={{
        height: 300,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "preview",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    ></EditorTinymce>
  );
};

export default Editor;

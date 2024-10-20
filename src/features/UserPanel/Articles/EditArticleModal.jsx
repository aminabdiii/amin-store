import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CircularProgress, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import ProductsInputBox from "../products/ProductsInputBox";

import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Heading,
  Underline,
  Link,
  BlockQuote,
  Table,
  FontColor,
  Highlight,
  HorizontalLine,
  FontSize,
  List,
} from "ckeditor5";
import { HiUpload } from "react-icons/hi";
import { useArticleInformation } from "./useArticleInformation";
import { toast } from "react-toastify";
import { useUpdateArticle } from "./useUpdateArticle";
import { useState } from "react";

function EditArticleModal({ onClose, articleId }) {
  const { handleSubmit, register } = useForm();
  const { articleInformation, isLoading } = useArticleInformation({
    articleId,
  });
  const { updateArticle } = useUpdateArticle();
  const [content, setContent] = useState("");

  if (isLoading) {
    return (
      <Modal open={articleId} onClose={onClose}>
        <div className="absolute left-1/2 top-1/2 flex h-[600px] w-11/12 max-w-4xl -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-white">
          <CircularProgress />
        </div>
      </Modal>
    );
  }
  const {
    title,
    content: alreadyContent,
    image: alreadyImageUrl,
  } = articleInformation;
  const newImageUrl = `https://ddjggonagtvxnthvjxtr.supabase.co/storage/v1/object/public/articles/${title}`;

  function handleEditArticle({ title, image }) {
    updateArticle({
      id: articleId,
      title,
      image: image.length ? newImageUrl : alreadyImageUrl,
      content: content || alreadyContent,
    });
  }
  function handleErrorEditArticle(errors) {
    for (let key in errors) {
      toast.error(errors[key].message);
    }
  }
  const validateImage = (fileList) => {
    const file = fileList[0];

    if (!file) return true;
    if (!file.type.includes("image")) return "Only image files are allowed";
    if (file.size > 1048576) return "File size should be less than 1 MB";

    return true;
  };

  return (
    <Modal open={articleId} onClose={onClose}>
      <div className="absolute left-1/2 top-1/2 h-[600px] w-11/12 max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white p-5">
        <form
          onSubmit={handleSubmit(handleEditArticle, handleErrorEditArticle)}
          className="flex flex-col gap-5"
        >
          {/* Title */}
          <div>
            <ProductsInputBox
              title="title"
              type={"text"}
              defaultValue={title}
              register={register("title", {
                required: "title field is required",
              })}
            />
          </div>
          {/* upload article image */}
          <div className="relative basis-1/2 overflow-hidden rounded border bg-white py-3">
            <div className="flex w-full items-center justify-center gap-1 text-base font-medium">
              <span>
                <HiUpload size={20} />
              </span>
              <span>upload article image</span>
            </div>
            <input
              className="absolute inset-0 cursor-default opacity-0"
              type="file"
              {...register("image", {
                validate: validateImage,
              })}
            />
          </div>
          {/* CKEditor */}
          <div className="mx-auto w-full">
            <CKEditor
              data={`${alreadyContent}`}
              editor={ClassicEditor}
              config={{
                toolbar: {
                  items: [
                    "undo",
                    "redo",
                    "|",
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "underline",
                    "link",
                    "horizontalLine",
                    "|",
                    "blockQuote",
                    "insertTable",
                    "fontColor",
                    "highlight",
                    "fontSize",
                    "numberedList",
                  ],
                },
                plugins: [
                  Bold,
                  Essentials,
                  Italic,
                  Mention,
                  Paragraph,
                  Undo,
                  Heading,
                  Underline,
                  Link,
                  BlockQuote,
                  Table,
                  FontColor,
                  Highlight,
                  HorizontalLine,
                  FontSize,
                  List,
                ],
                fontFamily: { options: "Montserrat" },
              }}
              onChange={(_, event) => setContent(event.getData())}
            />
          </div>

          {/* Buttons */}
          <div className="sticky -bottom-5 flex w-full items-center justify-center gap-5 bg-white p-3 font-semibold xs:col-span-2">
            <button
              className="basis-1/2 rounded-lg bg-violet-500 py-2 uppercase text-white xs:basis-1/4"
              type="submit"
            >
              submit
            </button>
            <button
              onClick={onClose}
              className="basis-1/2 rounded-lg bg-gray-300 py-2 uppercase xs:basis-1/4"
              type="button"
            >
              close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditArticleModal;

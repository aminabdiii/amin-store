import { CKEditor } from "@ckeditor/ckeditor5-react";
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

import "/src/Styles/ckEditor.css";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

import { HiUpload } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUploadProductImages } from "../products/useUploadProductImages";
import { useInsertNewArticle } from "./useInsertNewArticle";
import { useArticles } from "../../Articles/useArticles";
import { Skeleton } from "@mui/material";

import UserPanelContainer from "../UserPanelContainer";
import ArticleItemAdminPanel from "./ArticleItemAdminPanel";
import ProductsInputBox from "../products/ProductsInputBox";
import EditArticleModal from "./EditArticleModal";

function AdminArticlesPage() {
  const { register, handleSubmit, reset, watch } = useForm();

  const [content, setContent] = useState("");
  const [editArticleId, setEditArticleId] = useState("");

  const { uploadProductImage } = useUploadProductImages();
  const { insertNewArticle } = useInsertNewArticle();

  const { articles, isLoading } = useArticles();

  const title = watch("title");
  const newArticleImageUrl = `https://ddjggonagtvxnthvjxtr.supabase.co/storage/v1/object/public/articles/${title}`;

  function submitNewArticleHandler({ image, title }) {
    if (!content) {
      toast.error("content field is required");
      return;
    }
    uploadProductImage({
      path: "articles",
      fileName: title,
      fileBody: image[0],
    });
    insertNewArticle(
      {
        content,
        image: newArticleImageUrl,
        title,
      },
      {
        onSuccess: () => {
          reset();
          setContent("");
        },
      },
    );
  }
  function submitArticleErrorHandler(errors) {
    if (!content) {
      toast.error("content field is required");
    }
    for (let key in errors) {
      toast.error(errors[key].message);
    }
  }
  function resetHandler() {
    reset();
    setContent("");
  }

  if (isLoading) {
    return (
      <UserPanelContainer>
        <div className="flex flex-col gap-5">
          <Skeleton animation="wave" />
          <Skeleton animation="wave" variant="rounded" height={41.6} />
          <Skeleton animation="wave" variant="rounded" height={339} />
          <Skeleton animation="wave" variant="rounded" height={48} />
          <div className="flex items-center justify-center gap-5">
            <Skeleton
              variant="rounded"
              animation="wave"
              height={40}
              className="basis-1/2 xs:basis-1/4"
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              height={40}
              className="basis-1/2 xs:basis-1/4"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 xs:grid-cols-3 lg:gap-6">
          <Skeleton variant="rounded" animation="wave" height={275} />
          <Skeleton variant="rounded" animation="wave" height={275} />
          <Skeleton variant="rounded" animation="wave" height={275} />
          <Skeleton variant="rounded" animation="wave" height={275} />
        </div>
      </UserPanelContainer>
    );
  }

  return (
    <UserPanelContainer>
      <form
        onSubmit={handleSubmit(
          submitNewArticleHandler,
          submitArticleErrorHandler,
        )}
        className="flex flex-col gap-5"
      >
        <ProductsInputBox
          title="title"
          type={"text"}
          register={register("title", {
            required: "title field is required",
          })}
        />
        <div className="mx-auto w-[99%]">
          <CKEditor
            data={content}
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
            onBlur={(event, editor) => setContent(editor.getData())}
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
              required: "generalImage field is required",
            })}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-5 font-semibold xs:col-span-2">
          <button
            className="basis-1/2 rounded-lg bg-violet-500 py-2 uppercase text-white xs:basis-1/4"
            type="submit"
          >
            submit
          </button>
          <button
            className="basis-1/2 rounded-lg bg-gray-300 py-2 uppercase xs:basis-1/4"
            type="button"
            onClick={resetHandler}
          >
            clear
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {articles.map((article) => {
          return (
            <ArticleItemAdminPanel
              key={`article-${article.id}`}
              setEditArticleId={setEditArticleId}
              article={article}
            />
          );
        })}
      </div>

      {editArticleId && (
        <EditArticleModal
          onClose={() => setEditArticleId("")}
          articleId={editArticleId}
        />
      )}
    </UserPanelContainer>
  );
}

export default AdminArticlesPage;

/* eslint-disable no-useless-escape */
import { Rating, styled } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useInsertComment } from "./useInsertComment";

function CommentForm({ user, commentsLength }) {
  const { handleSubmit, register, reset } = useForm();
  const [rate, setRate] = useState(3);
  const { insertComment } = useInsertComment();

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#663dff ",
    },
  });

  function commentSubmitHandler({ comment }) {
    if (!user?.id) {
      toast.info("please first sign in to the site", {
        autoClose: 2000,
        draggable: "mouse",
      });
      return;
    }
    insertComment({
      userId: user.id,
      useravatar: user.user_metadata.avatar,
      userName: user.user_metadata.userName,
      rate,
      content: comment,
    });
    reset();
  }
  function commentSubmitErrorHandler({ comment }) {
    if (!user?.id) {
      toast.info("please first sign in to the site");
      return;
    }
    toast.error(comment.message);
  }

  return (
    <section className="flex w-full flex-col gap-5 md:w-1/2">
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-bold">Comments</h3>
        <span className="block rounded-full bg-[#663dff] px-2 py-0.5 text-sm font-bold text-white">
          {commentsLength}
        </span>
      </div>
      <form
        onSubmit={handleSubmit(commentSubmitHandler, commentSubmitErrorHandler)}
        className="flex flex-col items-center gap-5 py-5"
      >
        <div className="flex w-full items-center justify-between">
          <label htmlFor="rating" className="font-medium text-neutral-500">
            Rating:
          </label>

          <StyledRating
            onChange={(event) => setRate(event.target.value)}
            id="rating"
            name="size-large"
            color="inherit"
            value={rate}
            size="large"
          />
        </div>
        <div className="w-full">
          <textarea
            {...register("comment", {
              required: "comment field is required",
              pattern: {
                value:
                  /^(?=.*\s)[\u0600-\u06FFa-zA-Z0-9\s.,?!؛،؟:()\-]{10,300}$/,
                message:
                  "Please write your honest review and avoid submitting random text",
              },
            })}
            placeholder={"comment..."}
            className="min-h-56 w-full resize-none rounded-xl bg-gray-100 p-3 text-sm outline-none ring-gray-300 transition-all duration-200 focus:ring-1 sm:h-14 sm:text-base"
          ></textarea>
        </div>
        <div className="flex items-center gap-5">
          <button
            type="submit"
            className="w-24 rounded-xl bg-violet-500 p-3 text-center font-medium uppercase text-white"
          >
            submit
          </button>
          <button
            onClick={() => reset()}
            type="button"
            className="w-24 rounded-xl border p-3 text-center font-medium uppercase"
          >
            clear
          </button>
        </div>
      </form>
    </section>
  );
}

export default CommentForm;

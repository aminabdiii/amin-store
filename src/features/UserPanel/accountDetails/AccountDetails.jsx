import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiCalendarDays } from "react-icons/hi2";
import { IoReceiptOutline } from "react-icons/io5";
import { supabaseUrl } from "../../../../supabase";
import { useEffect } from "react";
import { useUploadAvatar } from "./useUploadAvatar";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateUser } from "./useUpdateUser";
import { CircularProgress } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

import DetailsBox from "./DetailsBox";
import DetailsBoxContainer from "./DetailsBoxContainer";
import WelcomeMessageTitle from "./WelcomeMessageTitle";
import InputBox from "./InputBox";
import InputsContainer from "./InputsContainer";
import ChangePassword from "./ChangePassword";
import HeadLine from "./HeadLine";
import UploadImageSection from "./UploadImageSection";
import { useUpdateUserAvatarFromComment } from "../../detailsProduct/useUpdateUserAvatarFromComment";
import UserPanelContainer from "../UserPanelContainer";

function AccountDetails({ user, cartItemsLength }) {
  const queryClient = useQueryClient();
  const { avatarUploader, isUploading } = useUploadAvatar();
  const { updateUser, isUpdatingUser } = useUpdateUser();
  const { register, handleSubmit } = useForm();
  const { updateUserCommentsAvatar } = useUpdateUserAvatarFromComment();

  const {
    user_metadata: {
      email,
      fullName: userFullName,
      userName,
      avatar: avatarUrlPath,
    },
  } = user;
  const createdAt = new Date(user.created_at).toLocaleDateString();

  const avatarName =
    user.id.split("-").slice(0, 2).join("") +
    userName +
    Math.floor(Math.random() * 1000000);

  const imageUrl = `${supabaseUrl}/storage/v1/object/public/usersProfile/${avatarName}`;

  // update after than update user information
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["user"],
    });
  }, [imageUrl, queryClient]);

  function handleUpdateUser({ avatar, fullName }) {
    if (avatar[0]) {
      avatarUploader({ name: avatarName, file: avatar[0] });
      updateUser({ avatar: imageUrl, fullName });
      updateUserCommentsAvatar({ useravatar: imageUrl, userId: user?.id });
    } else {
      updateUser({ avatar: avatarUrlPath ? avatarUrlPath : "", fullName });
    }
  }
  function handleUpdateUserError(errors) {
    toast.error(errors["fullName"].message);
  }

  return (
    <UserPanelContainer>
      <WelcomeMessageTitle fullName={userFullName} /> {/* Welcome, ... dear */}
      <DetailsBoxContainer>
        <DetailsBox
          backgroundColor="#663dff"
          icon={<HiOutlineShoppingBag size={32} />}
          title="Cart Items Count"
          value={`${cartItemsLength} Product`}
        />

        <DetailsBox
          backgroundColor="#cc4499"
          icon={<HiCalendarDays size={32} />}
          title="Registered Date"
          value={createdAt}
        />
      </DetailsBoxContainer>
      <form
        onSubmit={handleSubmit(handleUpdateUser, handleUpdateUserError)}
        className="space-y-6 rounded-2xl bg-white p-[18px]"
      >
        <HeadLine>Account Details</HeadLine>
        <UploadImageSection
          avatarUrlPath={avatarUrlPath}
          isUploading={isUploading}
          register={{ ...register("avatar") }}
        />

        <InputsContainer>
          <InputBox
            title="FullName"
            id="FullName"
            defaultValue={userFullName}
            register={{
              ...register("fullName", {
                required: "full name field is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Only english letters are allowed",
                },
              }),
            }}
          />
          <InputBox
            title="UserName"
            id="UserName"
            defaultValue={userName}
            isDisabled={true}
          />
          <InputBox
            title="Email"
            id="Email"
            defaultValue={email}
            isDisabled={true}
            className="sm:col-span-2"
          />
        </InputsContainer>
        <div className="text-center xs:text-start">
          <button
            type="submit"
            className="w-24 rounded-xl bg-violet-500 p-3 text-center font-medium uppercase text-white"
            disabled={isUploading || isUpdatingUser}
          >
            {isUploading || isUpdatingUser ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              "submit"
            )}
          </button>
        </div>
      </form>
      <ChangePassword />
    </UserPanelContainer>
  );
}

export default AccountDetails;

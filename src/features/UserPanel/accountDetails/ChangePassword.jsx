import { useForm } from "react-hook-form";
import InputsContainer from "./InputsContainer";
import InputBox from "./InputBox";
import { toast } from "react-toastify";
import { useUpdateUserPassword } from "./useUpdateUserPassword";
import { CircularProgress } from "@mui/material";
import HeadLine from "./HeadLine";

function ChangePassword() {
  const { handleSubmit, register, watch, reset } = useForm();
  const { updatePassword, isUpdatingUserPassword } = useUpdateUserPassword();

  function handleChangePassword({ currentPassword, password }) {
    updatePassword({ currentPassword, password }, { onSuccess: () => reset() });
  }
  function handleChangePasswordError({
    currentPassword,
    password,
    confirmPassword,
  }) {
    if (currentPassword) toast.error(currentPassword.message);
    if (password) toast.error(password.message);
    if (confirmPassword) toast.error(confirmPassword.message);
  }

  return (
    <div className="space-y-6 rounded-2xl bg-white p-[18px]">
      <HeadLine>Change Password</HeadLine>
      <form
        onSubmit={handleSubmit(handleChangePassword, handleChangePasswordError)}
        className="flex flex-col gap-6"
      >
        <InputsContainer>
          <InputBox
            type="password"
            title="Current Password"
            id="current-password"
            register={register("currentPassword", {
              required: "Enter your current password.",
            })}
          />
          <InputBox
            type="password"
            title="Password"
            id="Password"
            register={{
              ...register("password", {
                required: "password field is required",
                minLength: {
                  value: 12,
                  message: "Use at least 12 characters.",
                },
                maxLength: {
                  value: 128,
                  message: "Use at most 128 characters.",
                },
              }),
            }}
          />
          <InputBox
            type="password"
            title="Confirm Password"
            id="confirm-password"
            register={{
              ...register("confirmPassword", {
                required: "confirm password field is required",
                validate: (value) =>
                  value === watch("password") ||
                  "Password & confirm password must be the same",
              }),
            }}
          />
        </InputsContainer>
        <div className="text-center xs:text-start">
          <button
            type="submit"
            disabled={isUpdatingUserPassword}
            className="w-24 rounded-xl bg-violet-500 p-3 text-center font-medium uppercase text-white"
          >
            {isUpdatingUserPassword ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              "submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;

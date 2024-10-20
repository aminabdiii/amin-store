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

  function handleChangePassword({ password }) {
    updatePassword({ password });
    reset();
  }
  function handleChangePasswordError({ password, confirmPassword }) {
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
            title="Password"
            id="Password"
            register={{
              ...register("password", {
                required: "password field is required",
                pattern: {
                  value: /^[A-Za-z0-9@]{8,}$$/,
                  message: "please enter a valid password!",
                },
              }),
            }}
          />
          <InputBox
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

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginUser } from "@store/userSlice/user.types";
import Heading from "@UI/Heading/Heading";
import Field from "@UI/Input/Field";
import Button from "@UI/Button/Button";
import { useActions } from "@hooks/useActions";
import { useAppSelector } from "@hooks/reduxHooks";
import { useAuthRedirect } from "@hooks/useAuthRedirect";

const Auth = () => {
  useAuthRedirect();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState("");
  const user = useAppSelector((store) => store.user);
  const { login } = useActions();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginUser>({ mode: "onChange" });

  useEffect(() => {
    if (user.isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user.isLoading]);

  const onSubmit: SubmitHandler<LoginUser> = async (data) => {
    const response: any = await login(data);
    setAuthError(response.payload);
    reset();
  };

  return (
    <section className="flex justify-center m-40">
      <div
        className="rounded-2xl bg-gradient-to-r from-blue to-purple shadow-2xl mins-w-2/5 p-10"
        style={{ width: "600px" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading className="capitalize text-center mb-4 text-white">
            Authorization
          </Heading>
          <Field
            center
            {...formRegister("username", {
              required: "Username is required",
            })}
            placeholder="Username"
            type="text"
            color="white"
            error={errors.username?.message}
          />
          <Field
            center
            {...formRegister("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Min length should more 6 symbols",
              },
            })}
            color="white"
            type="password"
            placeholder="Password"
            error={errors.password?.message}
          />
          <div className="flex justify-center text-red">{authError}</div>
          <div className="flex flex-col justify-around mt-3">
            <Button
              className="mt-3"
              type="submit"
              variant="orange"
              isLoading={isLoading}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Auth;

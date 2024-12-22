"use client";
import { updateProfilePassword } from "@/actions/auth/update-pasword";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { TextInput } from "@tremor/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const UserChangePassword = ({ user }: { user: User }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleChangePassword = async (data) => {
    await updateProfilePassword(
      data.currentPassword,
      data.newPassword,
      data.confirmPassword,
    )
      .then((r) => {
        if (r === "ok") {
          toast.success("Contraseña cambiada con éxito");
          reset();
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text text-base font-semibold leading-7">
          Change password{" "}
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">Update password</p>
      </div>

      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="md:col-span-2"
      >
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          {user.password && (
            <div className="col-span-full">
              <label
                htmlFor="current-password"
                className="text block text-sm font-medium leading-6"
              >
                Current password
              </label>
              <div className="mt-2">
                <TextInput
                  placeholder=""
                  id={"current-passwor"}
                  {...register("currentPassword", {
                    required: true,
                  })}
                />
              </div>
            </div>
          )}

          <div className="col-span-full">
            <label
              htmlFor="new-password"
              className="text block text-sm font-medium leading-6"
            >
              New password
            </label>
            <div className="mt-2">
              <TextInput
                placeholder=""
                id={"new-password"}
                {...register("newPassword", {
                  required: true,
                })}
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="confirmPassword"
              className="text block text-sm font-medium leading-6"
            >
              Confirm the new password
            </label>
            <div className="mt-2">
              <TextInput
                placeholder=""
                id={"confirmPassword"}
                {...register("confirmPassword", {
                  required: true,
                })}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
};

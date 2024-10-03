/* eslint-disable @next/next/no-img-element */
"use client";

import { deleteTenantMember } from "@/actions/global/tenantSystem/delete-member-from-tenant";
import { getTenantMembers } from "@/actions/global/tenantSystem/get-tenant-members";
import { tenantSendInvitation } from "@/actions/global/tenantSystem/tenant-send-invitation";
import { isTenantAdmin } from "@/actions/global/tenantSystem/tenantFacade";
import DeleteModel from "@/components/core/DeleteModel";
import PageName from "@/components/ui/commons/PageName";
import { CustomDialog } from "@/components/ui/componenets/Dialog";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { constants } from "@/lib/constants";
import { ViewMember } from "./components/ViewMember";
import { UserMembershipRole } from "@prisma/client";

import { Button } from "@/components/ui/button";

const AgentesPage = () => {
  const [members, setMembers] = useState([]);
  const { register, setValue, watch } = useForm();

  const getMembers = async () => {
    await getTenantMembers()
      .then((response) => {
        setMembers(response);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getMembers();
  }, []);

  const handleAddMember = async () => {
    const payload = {
      email: watch("email"),
      name: watch("name"),
      password: watch("password"),
      role: watch("role") ?? "MEMBER",
    };

    if (!payload.email || !payload.name) {
      toast.error("Info required");
      return;
    }

    await tenantSendInvitation(payload)
      .then(() => {
        getMembers();
        toast.success("Member successfully added");
        setValue("name", "");
        setValue("email", "");
        setValue("password", "");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const generateRandomPassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    setValue("password", randomPassword);
  };

  const handleDeleteTenantRefresh = () => {
    console.log("dd");

    getMembers();
  };

  return (
    <div>
      <PageName name="Agentes" />
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <div className="col-span-1">
          <ul role="list" className="divide-y divide-gray-100">
            {members?.map((person, index) => (
              <li
                key={person.id + index}
                className="relative flex justify-between gap-x-6 py-5"
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    alt=""
                    src={person.user.avatar ?? "/assets/img/avatar.png"}
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      <a href={person.href}>
                        <span className="absolute inset-x-0 -top-px bottom-0" />
                        {person.user.name}
                      </a>
                    </p>
                    <p className="mt-1 flex text-xs leading-5  text">
                      <a
                        href={`mailto:${person.user.email}`}
                        className="relative truncate hover:underline"
                      >
                        {person.user.email}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex z-0 shrink-0 items-center gap-x-4">
                  <div className="  sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {person.role}
                    </p>
                  </div>
                  <div className="flex items-center   space-x-3 ">
                    <div>
                      {!isTenantAdmin(person.permissions) && (
                        <DeleteModel
                          callbackAction={handleDeleteTenantRefresh}
                          deleteAction={deleteTenantMember}
                          modelId={person.id}
                        />
                      )}
                    </div>

                    <CustomDialog
                      activateUrl="add-sender"
                      style="link"
                      label=""
                      icon={
                        <EyeIcon aria-hidden="true" className="w-6 mb-2 h-6" />
                      }
                    >
                      <div className="flex h-full   flex-col bg-main overflow-auto  ">
                        <ViewMember member={person} />
                      </div>
                    </CustomDialog>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1">
          <div className="bg-main p-6 rounded-lg">
            <h2 className="text-title">
              Add a member to the {constants.tanantModelName}
            </h2>
            <div className="flex flex-col space-y-3 max-w-lg pt-7">
              <div className="flex flex-col">
                <label htmlFor="">Name</label>
                <input
                  className="input-text"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Email</label>
                <input
                  className="input-text"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Role</label>
                <div className="flex gap-3">
                  {Object.keys(UserMembershipRole).map((key) => {
                    return (
                      <Button
                        onClick={() =>
                          setValue("role", UserMembershipRole[key])
                        }
                        variant={
                          watch("role") === UserMembershipRole[key]
                            ? "default"
                            : "secondary"
                        }
                        value={UserMembershipRole[key]}
                      >
                        {UserMembershipRole[key]}
                      </Button>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <label htmlFor="">Password</label>
                  <button
                    onClick={generateRandomPassword}
                    className="btn-secondary"
                  >
                    Generate random
                  </button>
                </div>
                <input
                  className="input-text"
                  {...register("password", { required: true })}
                />
              </div>

              <div className="flex flex-col mt-2">
                <Button onClick={handleAddMember}>Agregar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentesPage;

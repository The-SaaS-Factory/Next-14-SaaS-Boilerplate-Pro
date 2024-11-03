import { getMembership } from "@/utils/facades/serverFacades/userFacade";
import { UserChangePassword } from "./components/UserChangePassword";
import { getUserById } from "@/actions/auth/get-user-by-email";

const AdminSettingsModuleProfilePage = async () => {
  const { user } = await getMembership();

  const fullUser = await getUserById(user.id);

  return (
    <div>
      <div className="mt-1">
        <div className="divide-y divide-white/5">
          <UserChangePassword user={fullUser} />
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsModuleProfilePage;

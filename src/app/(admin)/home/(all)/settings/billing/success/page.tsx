import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const SuccessPaymentPage = async () => {
  revalidatePath("/", "layout");

  redirect("/home/settings/billing/planActive?paymentStatus=success");

  return <div></div>;
};

export default SuccessPaymentPage;

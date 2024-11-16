import { createConnectAccount } from "@/utils/facades/serverFacades/stripeFacade";

export async function POST() {
  try {
    const account = await createConnectAccount();
    return Response.json({ account: account.id });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error.message });
  }
}

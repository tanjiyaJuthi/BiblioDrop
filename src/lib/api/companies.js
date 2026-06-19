import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getRecruiterCompany = async (recruiterId) => {
    return serverFetch(`/api/companies?recruiterId=${recruiterId}`);
}

export const getLoggedInRecruiterCompany = async () => {
    const user = await getUserSession();
    return getRecruiterCompany(user?.id);
}
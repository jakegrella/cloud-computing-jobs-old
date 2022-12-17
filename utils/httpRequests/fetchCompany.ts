import { ICompany } from "../../types";

export async function fetchCompany(username: string | string[]) {
  try {
    const data: ICompany = await (
      await fetch(`/api/companies/${username}`, {
        method: "get",
        headers: new Headers({
          Authorization: "Bearer " + process.env.API_SECRET_KEY,
        }),
      })
    ).json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

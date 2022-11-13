import { addCompany } from "../companies/addCompany";

export async function test() {
  // format them to fit database
  // add to database

  const date = new Date().toISOString();

  const body = {
    name: "Test Company",
    username: `test-${date}`,
    logo: "https://pbs.twimg.com/profile_images/1567214665670819840/qzAIgm8i_400x400.jpg",
    mission: "This is a test company",
    overview: "This is a test company",
    headquarters: 1,
    locations: [1],
  };

  try {
    const response = await addCompany(body);
    return response;
  } catch (err) {
    throw new Error();
  }
}

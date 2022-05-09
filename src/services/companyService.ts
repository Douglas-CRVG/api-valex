import * as companyRepository from "../repositories/companyRepository.js";
export async function findByApiKey(apiKey: string) {
  const company = await companyRepository.findByApiKey(apiKey);

  if (company) return company;

  throw { type: "unauthorized" };
}

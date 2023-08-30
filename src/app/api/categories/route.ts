import { apiHandler } from "src/helpers/server/api/api-handler";

import { searchRepo } from "src/helpers/server/search-repo";

module.exports = apiHandler({
  GET: search,
});

async function search(req: Request) {
  const categories = await searchRepo.getCategory();
  return categories;
}

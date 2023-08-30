import { apiHandler } from "src/helpers/server/api/api-handler";
import { searchRepo } from "src/helpers/server/search-repo";

module.exports = apiHandler({
  GET: search,
});

async function search(req: Request) {
  const url = new URL(req.url!);
  const queryParams = new Map(url.searchParams.entries());

  const title = queryParams.get("title") || "";
  const category = queryParams.get("category") || "";
  const page = parseInt(queryParams.get("page") || "10", 10);
  const id = parseInt(queryParams.get("id") || "1");
  return searchRepo.getPosts(title, category, page, id);
}

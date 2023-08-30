import DB from "./blog.json";

export const searchRepo = {
  getCategory,
  getPosts,
};

async function getCategory() {
  return DB.categories;
}

async function getPosts(
  title: string,
  category: string,
  page: number,
  id: number
) {
  try {
    const categoryId = DB.categories.filter((item) => {
      return item.slug.toLowerCase() === category.toLowerCase();
    })[0].id;
    const postWithTitle = DB.posts.filter((item) => {
      return item.title.toLowerCase().includes(title.toLowerCase());
    });
    console.log(postWithTitle.length);
    console.log(DB.posts.length);
    const postWithCategoryId = postWithTitle.filter((item) => {
      const category = item.categories.filter((items) => {
        return items === categoryId;
      });
      return category.length > 0;
    });
    console.log(postWithCategoryId);
    return postWithCategoryId.slice(id * page - 10, id * page - 1);
  } catch {
    const postWithTitle = DB.posts.filter((item) => {
      return item.title.toLowerCase().includes(title.toLowerCase());
    });
    return postWithTitle.slice(id * page - 10, id * page - 1);
  }
}

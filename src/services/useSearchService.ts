import { create } from "zustand";
import { useFetch } from "src/helpers/client";
import { useRouter, useSearchParams } from "next/navigation";

export { useSearchService };

const initialState = {
  posts: undefined,
  categories: undefined,
};

const searchStore = create<ISearchStore>(() => initialState);

function useSearchService(): ISearchService {
  const fetch = useFetch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { posts, categories } = searchStore();
  return {
    posts,
    categories,
    getAll: async () => {
      searchStore.setState({ posts: await fetch.get("/api/search") });
    },
    getPosts: async (
      title: string | null,
      category: string | null,
      page: number,
      id: number
    ) => {
      searchStore.setState({
        posts: await fetch.get(
          `/api/search/?title=${title}&category=${category}&page=${page}&id=${id}`
        ),
      });
    },
    getCategory: async () => {
      searchStore.setState({ categories: await fetch.get("/api/categories") });
    },
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: Array<number>;
}

interface ISearchStore {
  posts: Array<Post>;
  categories: Array<Category>;
}

interface ISearchService extends ISearchStore {
  getAll: () => Promise<void>;
  getCategory: () => Promise<void>;
  getPosts: (
    title: string | null,
    category: string | null,
    page: number,
    id: number
  ) => Promise<void>;
}

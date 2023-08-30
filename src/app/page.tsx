"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SingleBlog from "src/components/single_blog";
import { useSearchService } from "src/services";

export default function Home() {
  const [formData, setFormData] = useState<FormDataType>({
    id: 1,
    title: "",
    category: "",
  });

  const searchService = useSearchService();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const internalFormData = new FormData(event.target);
    const title = internalFormData.get("title");
    const category = internalFormData.get("category");
    setFormData({
      id: 1,
      title: title,
      category: category,
    });
  };

  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const categories = searchService.categories;
  const posts = searchService.posts;

  useEffect(() => {
    searchService.getCategory();
  }, []);

  useEffect(() => {
    if (formData) {
      const { title, category, id } = formData;
      searchService.getPosts(title, category, 10, id);
    }
  }, [formData]);

  return (
    <main className="flex bg-white min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full items-center justify-between font-mono text-sm text-black">
        <h1 className="text-2xl text-center font-bold">From the blog</h1>
        <p className="text-center mx-52 my-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit
          amet dapibus enim, sit amet faucibus nisi.
        </p>
        <div>
          <form className="flex" onSubmit={onSubmit}>
            <label className="mr-5">Search:</label>
            <input
              type="text"
              placeholder="Search by Title"
              name="title"
              className=" px-2 border rounded-md bg-slate-300"
            />
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              name="category"
              className="bg-slate-200 rounded-md mx-5"
            >
              {categories &&
                categories.map((item: Category, index: number) => (
                  <option key={index} value={item.slug}>
                    {item.name}
                  </option>
                ))}
            </select>
            <button type="submit" className="border rounded-md bg-slate-200 px-3">Search</button>
          </form>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {posts &&
            posts.map((item: Post, index: number) => {
              return (
                <SingleBlog
                  key={index}
                  id={item.id}
                  slug={item.slug}
                  title={item.title}
                  excerpt={item.excerpt}
                  imageUrl={item.imageUrl}
                  categories={item.categories}
                  className="translate-y-5 rounded-lg border shadow-lg"
                />
              );
            })}
        </div>
        <div className="flex justify-end font-bold text-md gap-3 text-center mt-10">
          <button
            className="border bg-gray-300"
            onClick={() => {
              if (formData.id) {
                if (formData?.id > 1) {
                  setFormData({ ...formData, id: formData.id - 1 });
                }
              }
            }}
          >
            PREV
          </button>
          <button
            className="border bg-gray-300"
            onClick={() => {
              if (formData.id) {
                setFormData({ ...formData, id: formData.id + 1 });
              }
            }}
          >
            NEXT
          </button>
        </div>
      </div>
    </main>
  );
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

interface FormDataType {
  id: number;
  title: any;
  category: any;
}

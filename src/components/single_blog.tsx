import React from "react";
import Image from "next/image";
import { useSearchService } from "src/services";

interface ISingleBlog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: number[];
  className?: string;
}
const single_blog = ({
  id,
  slug,
  title,
  excerpt,
  imageUrl,
  categories,
  className,
}: ISingleBlog) => {
  const searchService = useSearchService();
  const externalCategories = searchService.categories;
  return (
    <div className={className}>
      <img src={imageUrl} alt={slug} className="w-full rounded-lg" />

      <div className="p-5">
        <div className="flex gap-5">
          {categories &&
            categories.map((item, index) => {
              const categoryList = externalCategories.filter((category) => {
                return category.id === item;
              });
              return (
                <span className="category text-sky-600">
                  {categoryList[0].name}
                </span>
              );
            })}
        </div>
        <h2 className="title text-lg font-bold">{title}</h2>
        <p className="text-md text-gray-600">{excerpt}</p>
      </div>
    </div>
  );
};

export default single_blog;

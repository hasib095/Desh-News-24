import NewsCard from "@/components/NewsCard";
import React from "react";

interface ICategoryNews {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
}
const CategoryNews = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  //console.log(id)

  const res = await fetch(`https://news-api-v2.vercel.app/api/category/${id}`);
  const data = await res.json();
  const categoryNews: ICategoryNews[] = data.data;
  //console.log(data);
  // console.log(categoryNews)
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold border-b-2 border-red-700 mt-5 px-2">
        {data.title}
      </h1>

      <div className="grid grid-cols-3 container mx-auto max-w-7xl gap-3">
        {categoryNews.map((news) => (
          <NewsCard key={news.id} News={news} />
        ))}
      </div>
    </div>
  );
};

export default CategoryNews;

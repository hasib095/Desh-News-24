import Image from "next/image";
import Link from "next/link";
import React from "react";

interface News {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
}

const MainNews = ({ news }: { news: News[] }) => {
  // console.log(news);
  const [firstNews, ...otherNews] = news;
  //console.log(firstNews.id);
  //console.log(firstNews);

  return (
    <div className="flex gap-4 mt-4">
      <Link href={`/news/${firstNews.id}`}>
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <Image
              src={firstNews.imageUrl}
              alt={firstNews.imageAlt}
              height={600}
              width={600}
            />
          </figure>
          <div className="card-body">
            <p className="text-red-500 font-semibold">{firstNews.category}</p>
            <h2 className="card-title text-2xl">{firstNews.title}</h2>
            <p className="text-justify">{firstNews.description}</p>
          </div>
        </div>
      </Link>

        <div className="grid gap-2">
          {otherNews.slice(0, 4).map((on, id) => (
            <div
              key={on.id}
              className="card bg-base-100 border border-gray-300 p-3"
            >
              <p className="text-red-500 font-semibold">{firstNews.category}</p>
              <Link href={`/news/${on.id}`}>  <div className="font-bold">{on.title}</div></Link>
             
            </div>
          ))}
        </div>
     
    </div>
  );
};

export default MainNews;

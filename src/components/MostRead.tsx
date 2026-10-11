import Link from "next/link";
import React from "react";

interface IMostReadNews {
  id: string;
  title: string;
}

const MostRead = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
  const data = await res.json();
  const news: IMostReadNews[] = data.data;
  console.log(news);

  return (
    <div className="card p-3 bg-base-100 border border-gray-300 mt-4">
      <h1 className="font-bold text-red-700">সর্বাধিক পঠিত</h1>
      <div className="grid gap-3">
        {news.map((n, i) => (
          <div key={n.id}>
            <Link href={`/news/${n.id}`}><h2 className="flex gap-2">{`${i + 1}. ${n.title}`}</h2></Link>   
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostRead;

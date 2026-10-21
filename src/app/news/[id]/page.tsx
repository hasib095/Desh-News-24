import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface INewsDetails {
  title: string;
  firstPublished: string;
  description?: {
    blocks?: { text: string }[];
  };
  imageUrl: string;
  text: string;
  topics?: { id: string; name: string }[];
  link?: string;
  source?: string;
}

const NewsDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${id}`
  );

  // if (!res.ok) {
  //   throw new Error("Failed to fetch news details");
  // }

  const data: { data: INewsDetails } = await res.json();
   if(!data){
    notFound()
   }

  const news = data.data;

  const formattedDate = new Date(
    news.firstPublished
  ).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-gray-50 py-8 md:py-12">
      <article className="mx-auto max-w-5xl rounded-2xl bg-white px-5 py-7 shadow-sm sm:px-8 md:px-12 md:py-10">

        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <Link
            href="/"
            className="transition hover:text-red-600"
          >
            প্রচ্ছদ
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">সংবাদ বিস্তারিত</span>
        </div>

        {/* Source */}
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-bold text-white">
            {"DeshNews24"}
          </span>
          <span className="text-sm text-gray-500">
            {formattedDate}
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-5 text-3xl font-extrabold leading-snug text-gray-900 sm:text-4xl md:text-5xl md:leading-tight">
          {news.title}
        </h1>

        {/* Description */}
        {news.description?.blocks?.map((block, index) => (
          <p
            key={index}
            className="mb-7 text-lg leading-9 text-gray-600"
          >
            {block.text}
          </p>
        ))}

        {/* Featured Image */}
        <figure className="mb-8 overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={news.imageUrl}
            alt={news.title}
            width={1200}
            height={675}
            priority
            className="h-auto max-h-[600px] w-full object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </figure>

        {/* Article Content */}
        <div className="mx-auto max-w-3xl">
          <div className="whitespace-pre-line break-words text-justify text-base leading-9 text-gray-800 sm:text-lg sm:leading-10">
            {news.text}
          </div>

          {/* Topics */}
          {news.topics && news.topics.length > 0 && (
            <div className="mt-10 border-t border-gray-200 pt-6">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                সম্পর্কিত বিষয়
              </h2>

              <div className="flex flex-wrap gap-3">
                {news.topics.map((topic) => (
                  <span
                    key={topic.id}
                    className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                  >
                    {topic.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Original Source */}
          {news.link && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500">
                সূত্র: {news.source || "সংবাদ সূত্র"}
              </p>
              
            </div>
          )}
        </div>
      </article>
    </main>
  );
};

export default NewsDetails;
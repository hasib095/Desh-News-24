import MainNews from "@/components/MainNews";
// import Marquee from "@/components/Marquee";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";
// import Image from "next/image";

interface IotherSection {
  curationId:string,
  title: string;
  link:string,
  articles:{
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  }[];
}
export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");

  const data = await res.json();
  const sections = data.data;
  const mainNews = sections[0].articles;
  //console.log(mainNews);
  const filterSection:IotherSection[]=sections.slice(1);
  const otherSection = filterSection.filter((d) => d.link !== null);
 // console.log(otherSection);

  return (
    <div>
     

      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-3">
        {/* news section */}
        <div className="col-span-2">
          <MainNews news={mainNews} />
        </div>

        {/* most read section */}
        <div className="col-span-1">

        <MostRead/>
        </div>
      </div>

      <div className="grid gap-5 mt-5 max-w-7xl mx-auto">
        {otherSection.map((os) => (
          <div key={os.curationId} >
            <h1 className="font-bold border-b-3 border-red-700 p-1">{os.title}</h1>

            <div className="grid grid-cols-3 gap-5 ">
              {os.articles.map((news) => (
              <NewsCard News={news} key={news.id} />
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

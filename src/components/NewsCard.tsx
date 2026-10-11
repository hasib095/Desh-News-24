import Image from 'next/image';
import Link from 'next/link';

interface INews {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
}

const NewsCard = ({ News: news }: { News: INews }) => {
  return (
  <Link href={`/news/${news.id}`}>

    <div className="card bg-base-100 h-[520px] shadow-sm mt-5  ">
      <figure>
        <Image
          src={news.imageUrl}
          alt={news.imageAlt}
          height={600}
          width={600}
        />
      </figure>
      <div className="card-body max-h-[600]">
        <p className="text-red-500 font-semibold">{news.category}</p>
        <h2 className="card-title text-2xl">{news.title}</h2>
        <p className="text-justify">{news.description}</p>
      </div>
    </div>
  
  </Link>
  );
};

export default NewsCard;
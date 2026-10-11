import Image from 'next/image';

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
    <div className="card bg-base-100 shadow-sm mt-5 ">
      <figure>
        <Image
          src={news.imageUrl}
          alt={news.imageAlt}
          height={600}
          width={600}
        />
      </figure>
      <div className="card-body">
        <p className="text-red-500 font-semibold">{news.category}</p>
        <h2 className="card-title text-2xl">{news.title}</h2>
        <p className="text-justify">{news.description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
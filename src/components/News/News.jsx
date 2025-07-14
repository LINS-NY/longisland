import Image from 'next/image';

export default function News({ item }) {
  if (!item) return <div className="text-center py-10">No news item found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
        {/* Image with title overlay */}
        {item.imageUrl && (
          <div className="relative w-full">
            <Image
              src={item.imageUrl}
              alt={item.Title}
              width={200}
              height={200}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white py-4 px-6 text-center">
              <h1 className="text-2xl md:text-4xl font-bold">{item.Title}</h1>
            </div>
          </div>
        )}

        {/* News content */}
        <div className="p-6 md:p-10">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">{item.Date}</p>
          <div
            className="prose prose-lg max-w-none dark:prose-invert prose-img:rounded-xl prose-a:text-blue-600 dark:prose-a:text-blue-400"
            dangerouslySetInnerHTML={{ __html: item.contentRd }}
          />
        </div>
      </div>
    </div>
  );
}

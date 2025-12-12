import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const resourcesDirectory = path.join(process.cwd(), 'data', 'resources');

export default async function ResourcePage({ params }) {
  const { slug } = await params;

  const filePath = path.join(resourcesDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return (
    <>
      <Header />
      <main className="p-6 max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </main>
      <Footer />
    </>
  );
}

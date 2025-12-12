

import Header from '@/components/Header/Header';
import News from '@/components/News/News';
import Footer from '@/components/Footer/Footer';
import { getAllResourcesID, googleDocsGet } from '@lib/resource';


// paste this near the top, after your imports
function safeDecode(value) {
  if (typeof value !== 'string') return value;
  try { return decodeURIComponent(value); } catch (err) {}
  try { return decodeURI(value); } catch (err) {}
  return value.replace(/[\u0000-\u001F\u007F-\u009F]/g, '').trim();
}

// optional: log when the page is built so you can see the failing value in the build output
// (this will print during `next build`)
console.log('IndividualNews route loaded (build-time)');

export default async function Post({params}) {
  const data = await getPosts(params.id)
  return (
    <main className="flex flex-col h-dvh relative">
    <Header/>
    <News className="dark:text-dark" key={data.postData.id} item={data.postData}/>
    <Footer/>
  </main>
  )
}

// app/IndividualNews/[id]/page.js (or wherever generateStaticParams lives)
export async function generateStaticParams() {
  const posts = await getAllResourcesID('1yNeH_9Ddr4hVQKISbSGbZVTat_oU53vV');

  if (!posts || posts.length === 0) {
    console.warn('generateStaticParams: no posts found (Google credentials may be missing).');

    // Only return local fallbacks in development. In production we return [] so Next will not pre-render these pages.
    if (process.env.NODE_ENV === 'development') {
      return [
        { id: 'local-fallback-1' },
        { id: 'local-fallback-2' }
      ];
    }

    return []; // production: no fallback pages
  }

  return posts.map((post) => ({ id: post.params.documentId }));
}



async function getPosts(id) {
  const safeId = safeDecode(id);
  console.log('getPosts called with id:', safeId);
  try {
    const postData = await googleDocsGet(safeId);
    return { postData };
  } catch (err) {
    console.error('Error fetching googleDocsGet for id:', safeId, err && err.message ? err.message : err);
    // return a safe fallback so build can continue (or rethrow if you prefer)
    return { postData: { id: safeId, title: 'Error loading post', content: '' } };
  }
}

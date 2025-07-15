import Header from '../../components/Header/Header';
import Gallery from '../../components/Gallery/Gallery';
import Footer from '../../components/Footer/Footer';

export default function GalleryPage() {
  return (
    <main className="flex flex-col">
      <Header />
      <Gallery />
      <Footer />
    </main>
  );
}

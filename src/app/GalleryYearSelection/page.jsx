import Header from "../../components/Header/Header";
import GalleryYearSelection from "../../components/Gallery/GalleryYearSelection";
import Footer from "../../components/Footer/Footer";

export default function Ab() {
  return (
    <main className="flex flex-col ">
      <Header/>
      <GalleryYearSelection/>
      <Footer/>
    </main>
  );
}

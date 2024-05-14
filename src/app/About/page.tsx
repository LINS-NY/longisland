import Header from "../../components/Header/Header";
import About from "../../components/About/About"
import Footer from "../../components/Footer/Footer"

export default function Ab() {
  return (
    <main className="flex flex-col h-dvh overflow-hidden">
      <Header/>
      <About/>
      <Footer/>
    </main>
  );
}

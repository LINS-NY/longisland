import Header from "../components/Header/Header";
import Body from "../components/Body/Body"
import Footer from "../components/Footer/Footer"

export default function Home() {
  return (
    <main className="flex flex-col h-screen ">
      <Header/>
      <Body/>
      <Footer/>
    </main>
  );
}

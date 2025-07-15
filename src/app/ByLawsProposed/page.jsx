import Header from "../../components/Header/Header";
import ProposedBylaws from "../../components/Bylaws/ProposedBylaws"
import Footer from "../../components/Footer/Footer"

export default function Ab() {
  return (
    <main className="flex flex-col h-dvh ">
      <Header/>
      <ProposedBylaws/>
      <Footer/>
    </main>
  );
}

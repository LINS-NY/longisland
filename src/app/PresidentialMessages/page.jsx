import Header from "../../components/Header/Header";
import PresidentialMessage from "../../components/PresidentialMessage/PresidentialMessage"
import Footer from "../../components/Footer/Footer"

export default function Ab() {
  return (
    <main className="flex flex-col h-dvh">
      <Header/>
      <PresidentialMessage/>
      <Footer/>
    </main>
  );
} 
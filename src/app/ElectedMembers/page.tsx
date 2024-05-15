import Header from "../../components/Header/Header";
import ElectedMembers from "../../components/ElectedMembers/ElectedMembers"
import Footer from "../../components/Footer/Footer"

export default function Ab() {
  return (
    <main className="flex flex-col h-dvh ">
      <Header/>
      <ElectedMembers/>
      <Footer/>
    </main>
  );
}

import Header from "@components/Header/Header";
import MembershipForm from "@components/Member/MembershipForm"
import Footer from "@components/Footer/Footer"

export default function Ab() {
  return (
    <main className="flex flex-col ">
      <Header/>
      <MembershipForm/>
      <Footer/>
    </main>
  );
}

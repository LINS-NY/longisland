import Header from "@components/Header/Header";
import GeneralSecretaryMessage from "@components/GeneralSecretaryMessage/GeneralSecretaryMessage"
import Footer from "@components/Footer/Footer"

export default function Ab() {
  return (
    <main className="flex flex-col h-dvh">
      <Header/>
      <GeneralSecretaryMessage/>
      <Footer/>
    </main>
  );
} 
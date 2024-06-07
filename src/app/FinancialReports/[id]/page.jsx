import Header from "../../../components/Header/Header";
import FinancialReport from "../../../components/FinancialReport/FinancialReport"
import Footer from "../../../components/Footer/Footer"
import {getAllFinances} from '../../../lib/resource'

export default function FinancialReports() {
  return (
    <main class="flex flex-col h-dvh ">
      <Header/>
      <FinancialReport/>
      <Footer/>
    </main>
  );
}


export async function generateStaticParams() {
  const posts = await getAllFinances('16sIVBJl6hsLA-_27vWvvF9CxGsfcRdeq')
  return (posts.map((post) => ({
    id: post.params.documentId,
  })))
}

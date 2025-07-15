import Header from "../../components/Header/Header";
import FinancialReports from "../../components/FinancialReports/FinancialReports";
import Footer from "../../components/Footer/Footer";

export default function FinancialReportsPage() {
  return (
    <main className="flex flex-col h-dvh">
      <Header />
      <FinancialReports />
      <Footer />
    </main>
  );
}

import { getFinancialDocsIN, getAllFinances } from '../../lib/resource';
import Item from './Item';

const monthsOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default async function FinancialReports() {
    const id = await getAllFinances('16sIVBJl6hsLA-_27vWvvF9CxGsfcRdeq');
    let docsData = await Promise.all(id.map(async (document) => {
        return (await getFinancialDocsIN(document.params.documentId));
    }));

    // Sort documents by year and month
    const sortedDocsData = docsData.sort((a, b) => {
        const yearA = a.year || new Date(a.date).getFullYear();
        const yearB = b.year || new Date(b.date).getFullYear();
        const monthA = monthsOrder.indexOf(a.month) || new Date(a.date).getMonth();
        const monthB = monthsOrder.indexOf(b.month) || new Date(b.date).getMonth();
        return yearA - yearB || monthA - monthB;
    });

    // Group documents by year
    const groupedByYear = sortedDocsData.reduce((acc, doc) => {
        const year = doc.year || new Date(doc.date).getFullYear();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(doc);
        return acc;
    }, {});

    let financialItem = [];
    let item = [];

    // Render documents by year and month
    Object.keys(groupedByYear).sort().forEach(year => {
        groupedByYear[year].forEach(i => {
            if (Array.isArray(i)) {
                financialItem.push(<Item title={`${i[0].month}-${i[0].year}`} location={i[0].location} key={i[0].location} />);
            } else {
                item.push(<Item title={i.title} location={i.location} key={i.location} />);
            }
        });
    });

    return (
        <div className="container my-5 sm:my-12 mx-auto px-4 md:px-12">
            <h1 className="text-center text-lg py-4 lg:text-5xl lg:py-10 font-bold whitespace-nowrap text-gray-500 dark:text-gray-400">Reports</h1>
            <div className="flex flex-wrap -mx-1 lg:-mx-4 justify-center">
                <h2 className="text-center text-md py-4 lg:text-4xl lg:py-10 font-bold whitespace-nowrap text-gray-500 dark:text-gray-400">Events Financial Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 px-1">
                    {item}
                </div>
            </div>
            <h2 className="text-center text-md py-4 lg:text-4xl lg:py-10 font-bold whitespace-nowrap text-gray-500 dark:text-gray-400">Bank Financial Details</h2>
            <div className="flex flex-wrap -mx-1 lg:-mx-4 justify-center item-center">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 px-1">
                    {financialItem}
                </div>
            </div>
        </div>
    );
}
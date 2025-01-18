import { Navbar } from "./_components/navbar";
const MarketingLayout = ({
    children
}:{
    children:React.ReactNode;
}) => {
    return ( 
        <div className="flex flex-col min-h-screen dark:bg-[#1F1F1F] overflow-x-hidden">
            <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center pt-20 pb-20">
            {children}
        </main>
        </div>
     );
}
 
export default MarketingLayout;
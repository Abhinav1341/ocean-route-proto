import Image from "next/image";
import PortSelector from "./components/PortSelector";

export default function Home() {
  return (
    <div className="justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-row">
      <div>
        Select Origin :
        <PortSelector />
      </div>
      <div>
        Select Destination :
        <PortSelector />
      </div>
    </div>
  );
}

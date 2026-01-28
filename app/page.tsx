import { navLinksDataType } from "@/lib/typeDefinitions";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";

const navLinksData: navLinksDataType[] = [
  { name: "Men", tag: "men" },
  { name: "Women", tag: "women" },
  { name: "Kids", tag: "kids" },
]

export default function Home() {
  return (
    <>
      <Header visibility={false} />
      <Navbar activePage="home" navLinksData={navLinksData} cartCount={2} />
    </>
  );
}

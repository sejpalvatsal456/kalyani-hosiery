import Header from "./_components/Header";
import Navbar from "./_components/Navbar";

export default function Home() {
  return (
    <>
      <Header visibility={false} />
      <Navbar activePage="home" />
    </>
  );
}

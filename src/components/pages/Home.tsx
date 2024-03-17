import Header from "../sections/Header";

function Home({ isHamburgerMenu, setIsHamburgerMenu }) {
  return (
    <>
      <Header
        isHamburgerMenu={isHamburgerMenu}
        setIsHamburgerMenu={setIsHamburgerMenu}
      />

      <div className="pt-[60px] text-black">Welcome to YoGato</div>

      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default Home;

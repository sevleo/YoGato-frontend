import Header from "../sections/Header";

function Home({ isHamburgerMenu, setIsHamburgerMenu, location, setLocation }) {
  return (
    <>
      <Header
        isHamburgerMenu={isHamburgerMenu}
        setIsHamburgerMenu={setIsHamburgerMenu}
        location={location}
        setLocation={setLocation}
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

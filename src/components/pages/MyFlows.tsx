import Header from "../sections/Header";

function MyFlows({
  isHamburgerMenu,
  setIsHamburgerMenu,
  location,
  setLocation,
}) {
  return (
    <>
      <Header
        isHamburgerMenu={isHamburgerMenu}
        setIsHamburgerMenu={setIsHamburgerMenu}
        location={location}
        setLocation={setLocation}
      />
      <div>My Flows</div>
    </>
  );
}

export default MyFlows;

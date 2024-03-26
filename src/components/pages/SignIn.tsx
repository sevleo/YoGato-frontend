import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../sections/Header";

export default function SignIn({
  isHamburgerMenu,
  setIsHamburgerMenu,
  location,
  setLocation,
}) {
  const [signUpPage, setSignUpPage] = useState("");

  useEffect(() => {
    async function fetchSignUpPage() {
      try {
        const response = await axios.get("http://localhost:3001/sign-up");
        setSignUpPage(response.data);
      } catch (error) {
        console.error("Error fetching sign-up page:", error);
      }
    }
    fetchSignUpPage();
  }, []);

  return (
    <>
      <Header
        isHamburgerMenu={isHamburgerMenu}
        setIsHamburgerMenu={setIsHamburgerMenu}
        location={location}
        setLocation={setLocation}
      />
      <div>
        <h2>Log In</h2>
        <div dangerouslySetInnerHTML={{ __html: signUpPage }} />
      </div>
    </>
  );
}

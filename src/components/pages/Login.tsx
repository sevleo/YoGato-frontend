import { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
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
    <div>
      <h2>Log In</h2>
      <div dangerouslySetInnerHTML={{ __html: signUpPage }} />
    </div>
  );
}

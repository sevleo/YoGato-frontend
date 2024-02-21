import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>Welcome to YoGato</div>
      <br />

      <Link to="/builder">Continue as Guest</Link>
      <br />
      <Link to="/builder">Login</Link>
    </>
  );
}

export default Home;

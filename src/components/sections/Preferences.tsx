import { useUser } from "../utilities/UserContext";

export default function Preferences() {
  const { authState, dispatch } = useUser();
  console.log(authState);
  return <p>Preferences</p>;
}

import Link from "next/link";
import { Container, FormControl } from "react-bootstrap";

export default function Signup() {
  return (
    <Container id="wd-signup-screen" style={{ width: "300px", marginLeft: 0, marginRight: "auto"  }}>
      <h3>Signup</h3>
      <FormControl id="wd-username" placeholder="username" className="mb-2" />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <FormControl
        id="wd-password-verify"
        placeholder="verify password"
        type="password"
        className="mb-2"
      />
      <Link href="Profile" className="btn btn-primary w-100 mb-2">
        Signup
      </Link>
      <Link href="Signin">Signin</Link>
    </Container>
  );
}
import Link from "next/link";
import { Container, FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
  return (
    <Container id="wd-profile-screen" style={{ width: "300px" }}>
      <h3>Profile</h3>
      <FormControl
        id="wd-username"
        defaultValue="alice"
        placeholder="username"
        className="mb-2"
      />
      <FormControl
        id="wd-password"
        defaultValue="123"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <FormControl
        id="wd-firstname"
        defaultValue="Andis"
        placeholder="First Name"
        className="mb-2"
      />
      <FormControl
        id="wd-lastname"
        defaultValue="Rocks"
        placeholder="Last Name"
        className="mb-2"
      />
      <FormControl
        id="wd-dob"
        defaultValue="2000-01-01"
        type="date"
        className="mb-2"
      />
      <FormControl
        id="wd-email"
        defaultValue="andis@nu.com"
        type="email"
        className="mb-2"
      />
      <FormSelect id="wd-role" defaultValue="USER" className="mb-2">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>
      <Link href="/Account/Signin" className="btn btn-danger w-100">
        Signout
      </Link>
    </Container>
  );
}
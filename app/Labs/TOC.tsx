'use client';
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function TOC() {
  const pathname = usePathname();
  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link
          href="/Labs"
          as={Link}
          className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}
        >
          Labs
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/Labs/Lab1"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab1") ? "active" : ""}`}
        >
          Lab 1
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/Labs/Lab2"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab2") ? "active" : ""}`}
        >
          Lab 2
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/Labs/Lab3"
          as={Link}
          className={`nav-link ${pathname.endsWith("Lab3") ? "active" : ""}`}
        >
          Lab 3
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/" as={Link}>
          Kambaz
        </Nav.Link>
      </Nav.Item>
    </Nav>
);}

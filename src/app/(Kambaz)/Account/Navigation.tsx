"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const href = link;
        const isActive = pathname?.toLowerCase().includes(link.toLowerCase());
        const linkId = `wd-account-${link.toLowerCase()}-link`;
        
        return (
          <Link
            key={link}
            href={href}
            id={linkId}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          href="/Account/Users"
          id="wd-account-users-link"
          className={`list-group-item border-0 ${
            pathname?.endsWith('Users') ? "active" : "text-danger"
          }`}
        >
          Users
        </Link>
      )}
    </div>
  );
}

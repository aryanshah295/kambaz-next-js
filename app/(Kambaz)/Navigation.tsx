"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiBook, BiCalendar } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiMiniInboxArrowDown } from "react-icons/hi2";
import { LiaCogSolid } from "react-icons/lia";
export default function KambazNavigation() {
  const pathname = usePathname();
  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    { label: "Course", path: "/Dashboard", icon: BiBook },
    { label: "Calendar", path: "/Calendar", icon: BiCalendar },
    { label: "Inbox", path: "/Inbox", icon: HiMiniInboxArrowDown },
    { label: "Labs", path: "/Labs", icon:  LiaCogSolid },
  ];
  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 110 }}
      id="wd-kambaz-navigation"
    >
      <ListGroup.Item
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroup.Item>
      <ListGroup.Item
        as={Link}
        href="/Account"
        className={`text-center border-0 bg-black
            ${
              pathname.includes("Account")
                ? "bg-white text-danger"
                : "bg-black text-white"
            }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${
            pathname.includes("Account") ? "text-danger" : "text-white"
          }`}
        />
        <br />
        Account
      </ListGroup.Item>
      {links.map((link) => (
        <ListGroup.Item
          key={link.label}
          as={Link}
          href={link.path}
          className={`bg-black text-center border-0
              ${
                pathname.includes(link.label)
                  ? "text-danger bg-white"
                  : "text-white bg-black"
              }`}
        >
          {link.icon({ className: "fs-1 text-danger" })}
          <br />
          {link.label}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
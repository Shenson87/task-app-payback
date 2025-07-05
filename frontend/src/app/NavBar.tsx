"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgGoogleTasks } from "react-icons/cg";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Tasks", href: "/tasks" },
    { label: "Projects", href: "/projects" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <CgGoogleTasks />
      </Link>
      {links.map((link) => (
        <Link
          key={link.href}
          className={classNames({
            "text-zinc-900 font-bold": currentPath === link.href,
            "text-zinc-500": currentPath !== link.href,
            "hover:text-zinc-800 transform-colors": true,
          })}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;

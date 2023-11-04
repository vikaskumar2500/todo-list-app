"use client";

import { headerLinks } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  
  const path = usePathname();
  return (
    <header className=" fixed top-0 left-0 w-full bg-stone-200 py-5 flex items-center justify-around">
      <h2 className="hidden lg:block md:block font-bold  text-3xl">Todo-List</h2>
      <nav className="">
        <ul className="flex items-center justify-center gap-5">
          {headerLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`${
                  link.path == path
                    ? "text-xl text-red-600 underline"
                    : "text-xl"
                }`}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

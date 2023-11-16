import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TodoProvider from "@/context-api/todo-context";
import TanstackProvider from "@/utils/tanstackProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vikas | Todo-list",
  description:
    "This is all about to create a todo-list according to our convenients.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}h-screen w-screen`}>

        <TanstackProvider>
          <Toaster />
          <Header />
          <TodoProvider>{children}</TodoProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/navbar";
import { AntdRegistry } from "@ant-design/nextjs-registry";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Generate Image",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <div>
            <AntdRegistry>
              <Navbar></Navbar>
            </AntdRegistry>
          </div>
        </header>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}

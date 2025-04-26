import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Flight Review",
  description: "Rate your flights easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="">{children}</div>
      </body>
    </html>
  );
}

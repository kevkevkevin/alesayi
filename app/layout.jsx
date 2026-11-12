import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata = {
  title: "Alesayi Textiles | Fine Fabrics Since 1975",
  description: "Discover Alesayi’s fabrics for bridalwear, eveningwear and special occasions. Explore our collections and visit a showroom in Saudi Arabia.",
  icons: { icon: "/media/alesayi.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import Header from "./components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="relative min-h-screen pb-12">
          <Header />
          <main className="pt-6 md:pt-10">{children}</main>
        </div>
      </body>
    </html>
  );
}

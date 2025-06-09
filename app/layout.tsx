import "./globals.css";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='relative'>
        <NavBar />
        {children}
        <Footer  />
      </body>
    </html>
  );
}

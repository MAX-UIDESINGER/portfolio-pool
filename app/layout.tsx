import "./globals.css";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import './gradient-float.css'; // crea este archivo con los estilos de animación

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='relative overflow-x-hidden overflow-y-auto'>
        <div className="overflow-hidden relative min-h-screen">
           {/* Gradiente decorativo en la esquina superior izquierda */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 -top-32 -z-10 w-[900px] h-[900px] opacity-30 blur-[160px]"
          >
            <div
              style={{
                clipPath:
                  'polygon(70.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 80.1% 44.1%)',
              }}
              className="w-full h-full bg-gradient-to-br from-[#ff80b5] to-[#9089fc] animate-lava-lamp"
            />
          </div>

          {/* Gradiente decorativo abajo a la derecha */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 -z-10 w-[900px] h-[600px] opacity-25 blur-[120px] translate-x-1/4"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="w-full h-full bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] animate-lava-lamp"
            />
          </div>
          <NavBar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

"use client";
import { useState, useEffect } from "react";
import { Menu, X } from 'lucide-react';
import ModalContratar from "./Modal/ModalContratar";

const NavBar = ({ navPadding = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false); // Cierra el menú móvil si está abierto
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      // Calcula el ancho de la barra de scroll
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.classList.add('overflow-hidden');
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = '';
    };
  }, [isModalOpen]);


  return (
    <div>
      <nav
        className={`border-b border-gray-800/50 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-gray-900/30 backdrop-blur-md " : ""
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 ">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-teal-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">PM</span>
              </div>
              <div>
                <h1 className="text-lg font-bold">Pool Martin</h1>
                <p className="text-xs text-gray-400">
                  Ing. Sistemas & infomatico{" "}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#blog"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                sobre Mi
              </a>
              <a
                href="#contact"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Contacto
              </a>
              <button
                onClick={openModal}
                className="bg-blue-600/80 hover:bg-blue-600 transition-colors px-4 py-2 rounded-lg text-sm font-medium"
              >
                Contratar
              </button>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 p-4 rounded-xl bg-gray-900/80 navbar-blur border border-gray-800/50">
              <div className="space-y-3">
                <a
                  href="#blog"
                  className="block py-2 px-3 rounded-lg text-gray-300 hover:bg-gray-800/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sobre Mí
                </a>
                <a
                  href="#proyectos"
                  className="block py-2 px-3 rounded-lg text-gray-300 hover:bg-gray-800/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Proyectos
                </a>
                <a
                  href="#contact"
                  className="block py-2 px-3 rounded-lg text-gray-300 hover:bg-gray-800/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </a>
                <button
                  onClick={openModal}
                  className="w-full bg-blue-600/80 hover:bg-blue-600 transition-colors px-4 py-2 rounded-lg text-sm font-medium mt-3"
                >
                  Contratar
                </button>
              </div>
            </div>
          )}


        </div>
      </nav>
      {/* Modal de Contratación */}
      <ModalContratar isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default NavBar;

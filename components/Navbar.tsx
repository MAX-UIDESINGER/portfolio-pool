"use client";
import { useState, useEffect } from "react";
import { Menu, X, Code, Globe, Smartphone, Mail, Phone, Calendar } from 'lucide-react';

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
    <nav
      style={{ paddingRight: navPadding }}
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
        {/* Modal de Contratación */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              className="bg-gray-900 rounded-2xl border border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del Modal */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <div>
                  <h2 className="text-2xl font-bold text-white">¡Trabajemos Juntos!</h2>
                  <p className="text-gray-400 mt-1">Frontend + Backend Development</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contenido del Modal */}
              <div className="p-6 space-y-6">
                {/* Servicios */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Mis Servicios</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <Globe className="w-5 h-5 text-blue-400" />
                        <h4 className="font-medium text-white">Desarrollo Frontend</h4>
                      </div>
                      <p className="text-sm text-gray-400">Interfaces modernas con React, Vue. Diseño responsivo y optimizado.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <Code className="w-5 h-5 text-green-400" />
                        <h4 className="font-medium text-white">Backend Básico</h4>
                      </div>
                      <p className="text-sm text-gray-400">APIs, bases de datos, integraciones. Lo necesario para que funcione.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <Smartphone className="w-5 h-5 text-purple-400" />
                        <h4 className="font-medium text-white">Aplicaciones Web</h4>
                      </div>
                      <p className="text-sm text-gray-400">Desde landing pages hasta sistemas completos. Todo responsive.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <Mail className="w-5 h-5 text-orange-400" />
                        <h4 className="font-medium text-white">Consultoría Digital</h4>
                      </div>
                      <p className="text-sm text-gray-400">Te ayudo a digitalizar tu negocio con las mejores herramientas.</p>
                    </div>
                  </div>
                </div>

                {/* Proceso */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">¿Cómo Trabajamos?</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white mt-1">1</div>
                      <div>
                        <h4 className="font-medium text-white">Consulta Gratuita (30 min)</h4>
                        <p className="text-sm text-gray-400">Hablamos de tu proyecto, necesidades y objetivos.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white mt-1">2</div>
                      <div>
                        <h4 className="font-medium text-white">Propuesta Detallada</h4>
                        <p className="text-sm text-gray-400">Tiempos, costos y alcance claramente definidos.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white mt-1">3</div>
                      <div>
                        <h4 className="font-medium text-white">Desarrollo + Revisiones</h4>
                        <p className="text-sm text-gray-400">Entregas parciales semanales. Ves el progreso constantemente.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white mt-1">4</div>
                      <div>
                        <h4 className="font-medium text-white">Entrega + Soporte</h4>
                        <p className="text-sm text-gray-400">Te capacito y doy soporte post-entrega.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl text-center">
                  <h3 className="text-xl font-bold text-white mb-2">¿Listo para digitalizar tu negocio?</h3>
                  <p className="text-blue-100 mb-4">Conversemos gratis sobre tu proyecto</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="bg-white text-blue-600 hover:bg-gray-100 transition-colors px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>WhatsApp: +51 999 999 999</span>
                    </button>
                    <button className="bg-blue-800 hover:bg-blue-700 transition-colors px-6 py-3 rounded-lg font-medium text-white flex items-center justify-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Agendar Llamada</span>
                    </button>
                  </div>
                </div>

                {/* Garantías */}
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-green-400 font-bold text-lg">✓</div>
                    <p className="text-sm text-gray-300">Entrega en tiempo acordado</p>
                  </div>
                  <div>
                    <div className="text-green-400 font-bold text-lg">✓</div>
                    <p className="text-sm text-gray-300">Código limpio y documentado</p>
                  </div>
                  <div>
                    <div className="text-green-400 font-bold text-lg">✓</div>
                    <p className="text-sm text-gray-300">Soporte técnico incluido</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default NavBar;

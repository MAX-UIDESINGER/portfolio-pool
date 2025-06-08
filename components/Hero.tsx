"use client";

import { Calendar, ExternalLink, Download, MapPin, Github, Linkedin, Mail, Menu, X, ChevronUp, MessageCircle } from 'lucide-react';
import { Code, Database, Terminal, Settings, Monitor, Server, Smartphone, Globe } from "lucide-react";
import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface Repo {
  productionUrl: any;
  isPrivate: any;
  id: number;
  name: string;
  description: string;
  url: string;
  image: string;
  language: string;
  homepage?: string;
  topics?: string[];
  stargazers_count?: number;
  forks_count?: number;
  updated_at?: string;
}

const Hero = ({ repos }: { repos: Repo[] }) => {
  const [activeSection, setActiveSection] = useState('proyectos');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  // Función específica para WhatsApp
  const handleWhatsApp = () => {
    const whatsappNumber = "51906099090"; // Cambia por tu número real
    const message = "¡Hola Pool! Me interesa trabajar contigo en un proyecto web. ¿Podemos conversar?";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleGmail = () => {
    const email = "maxcuba773@gmail.com";
    const subject = "Consulta sobre desarrollo web";
    const body = "Hola Pool,%0D%0A%0D%0AMe interesa trabajar contigo en un proyecto web. Me gustaría conocer más sobre tus servicios.%0D%0A%0D%0ASaludos!";
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${body}`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // En móvil, intenta abrir Gmail app (solo Android), si no, usa mailto
      if (navigator.userAgent.toLowerCase().includes("android")) {
        window.location.href = `intent://compose?to=${email}&subject=${encodeURIComponent(subject)}&body=${body}#Intent;scheme=mailto;package=com.google.android.gm;end`;
        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 500);
      } else {
        window.location.href = mailtoUrl;
      }
    } else {
      // En escritorio, abre Gmail web
      window.open(gmailWebUrl, "_blank");
    }
  };

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Monitor className="w-6 h-6 text-blue-400" />,
      description: "Tecnologías para interfaces de usuario modernas y responsivas",
      skills: [
        { name: "React.js", icon: <Code className="w-5 h-5 text-cyan-400" /> },
        { name: "React Native", icon: <Smartphone className="w-5 h-5 text-blue-400" /> },
        { name: "Vite.js", icon: <Globe className="w-5 h-5 text-purple-400" /> },
        { name: "Next.js", icon: <Code className="w-5 h-5 text-gray-300" /> },
        { name: "HTML", icon: <Globe className="w-5 h-5 text-orange-400" /> },
        { name: "CSS", icon: <Globe className="w-5 h-5 text-blue-400" /> },
        { name: "Tailwind", icon: <Code className="w-5 h-5 text-teal-400" /> },
        { name: "Material UI", icon: <Code className="w-5 h-5 text-blue-500" /> }
      ],
      color: "blue"
    },
    {
      title: "Conocimientos Backend",
      icon: <Database className="w-6 h-6 text-purple-400" />,
      description: "Principios básicos de backend y gestión de datos",
      skills: [
        { name: "Consumo de APIs", icon: <Globe className="w-5 h-5 text-indigo-400" /> },
        { name: "Principios SQL", icon: <Database className="w-5 h-5 text-blue-400" /> },
        { name: "Firebase", icon: <Database className="w-5 h-5 text-yellow-400" /> },
        { name: "Laravel (básico)", icon: <Database className="w-5 h-5 text-red-400" /> },
        { name: "Spring Boot (básico)", icon: <Server className="w-5 h-5 text-green-400" /> }
      ],
      color: "purple"
    },
    {
      title: "Lenguajes de Programación",
      icon: <Terminal className="w-6 h-6 text-green-400" />,
      description: "Lenguajes dominados para desarrollo multiplataforma",
      skills: [
        { name: "JavaScript", icon: <Code className="w-5 h-5 text-yellow-400" /> },
        { name: "TypeScript", icon: <Code className="w-5 h-5 text-blue-500" /> },
        { name: "C#", icon: <Code className="w-5 h-5 text-purple-500" /> },
        { name: "VB", icon: <Code className="w-5 h-5 text-blue-600" /> },
        { name: "Java", icon: <Code className="w-5 h-5 text-orange-500" /> }
      ],
      color: "green"
    },
    {
      title: "Herramientas y Tecnologías Familiares",
      icon: <Settings className="w-6 h-6 text-orange-400" />,
      description: "Herramientas y conceptos con los que tengo experiencia práctica",
      skills: [
        { name: "Node.js", icon: <Server className="w-5 h-5 text-green-500" /> },
        { name: "Diseño Orientado a Objetos", icon: <Code className="w-5 h-5 text-indigo-400" /> },
        { name: "Git y GitHub", icon: <Terminal className="w-5 h-5 text-orange-500" /> },
        { name: "npm", icon: <Terminal className="w-5 h-5 text-red-400" /> },
        { name: "Cpanel", icon: <Settings className="w-5 h-5 text-blue-400" /> },
        { name: "Visual Studio Code", icon: <Code className="w-5 h-5 text-blue-500" /> },
        { name: "Android Studio", icon: <Smartphone className="w-5 h-5 text-green-400" /> }
      ],
      color: "orange"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowScrollTop(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showModal) {
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
  }, [showModal]);


  const closeModal = () => {
    setShowModal(false);
    setSelectedRepo(null);
  };

  const handlePrivateRepoClick = (repo: Repo) => {
    setSelectedRepo(repo);
    setShowModal(true);
  };

  function getColorClasses(color: string) {
    const colors: Record<string, string> = {
      blue: "bg-blue-600/10 border-blue-600/20 hover:bg-blue-600/20",
      purple: "bg-purple-600/10 border-purple-600/20 hover:bg-purple-600/20",
      green: "bg-green-600/10 border-green-600/20 hover:bg-green-600/20",
      orange: "bg-orange-600/10 border-orange-600/20 hover:bg-orange-600/20"
    };
    return colors[color] || colors.blue;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* Main Content  */}
      <main className="relative overflow-hidden pt-24 p-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 relative z-10">

          {/* Left Sidebar - Profile */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky ">
              {/* Profile Card */}
              <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-6 border border-gray-800/50 mb-6">
                <div className="text-center">
                  <div className="relative w-[150px] h-[150px] mx-auto rounded-full bg-gray-700 overflow-hidden border-2 border-gray-600/50 shadow-xl">
                    <Image
                      src="/images/foto.jpg"
                      alt="Pool Martin Cuba Nuñez"
                      width={150}
                      height={150}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h1 className="text-2xl font-bold mb-3.5">Pool Martin Cuba Nuñez</h1>
                  <p className="text-gray-300 text-sm mb-2">INGENIERÍA DE SISTEMAS E INFORMÁTICA</p>

                  <div className="flex-1 pb-2">
                    <p className="text-gray-300 text-sm mb-1">
                      <span className="text-blue-400 font-semibold">Desarrollador de Software</span> con sólida experiencia en desarrollo de aplicaciones móviles y web. He liderado proyectos de transformación digital e implementado soluciones tecnológicas que optimizan procesos empresariales y generan resultados medibles.
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a
                      onClick={handleGmail}
                      className="group p-3 bg-gray-800/40 rounded-xl hover:bg-blue-600/20 border border-gray-700/50 hover:border-blue-500/50 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <Mail className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/pool-martin-cuba-nu%C3%B1ez/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3 bg-gray-800/40 rounded-xl hover:bg-blue-600/20 border border-gray-700/50 hover:border-blue-500/50 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </a>
                    <a
                      href="https://github.com/MAX-UIDESINGER"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3 bg-gray-800/40 rounded-xl hover:bg-gray-600/20 border border-gray-700/50 hover:border-gray-500/50 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/20"
                    >
                      <Github className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Experience Timeline Card */}
              <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-6 border border-gray-800/50 mb-6">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  <h3 className="font-semibold text-sm">Experiencia</h3>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500"></div>

                  <div className="space-y-6">
                    <div className="space-y-6">
                      {/* INFOMATICA SERVICIOS GENERALES S.A.C - Current */}
                      <div className="relative flex items-start space-x-4">
                        <div className="relative z-10 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-gray-900 shadow-lg">
                          <span className="text-xs font-bold text-white">IS</span>
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-sm text-white">Infomatica Servicios Generales S.A.C</h4>
                            <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 text-green-400 text-xs rounded-full">Actual</span>
                          </div>
                          <p className="text-xs text-gray-400 mb-2">Analista Programador - Área de TI Desarrollo</p>
                          <p className="text-xs text-gray-300 mb-1">Desarrollo de proyectos web y móvil con TypeScript, React y microservicios usando metodologías ágiles Scrum</p>
                          <span className="text-xs text-gray-500">Mayo 2024 — Febrero 2025 (9 meses)</span>
                        </div>
                      </div>

                      {/* COVISIAN ESPAÑA */}
                      <div className="relative flex items-start space-x-4">
                        <div className="relative z-10 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-gray-900 shadow-lg">
                          <span className="text-xs font-bold text-white">CE</span>
                        </div>
                        <div className="flex-1 pb-2">
                          <h4 className="font-semibold text-sm text-white mb-1">Covisian España S.L., Sucursal en Perú</h4>
                          <p className="text-xs text-gray-400 mb-2">Comunicación con clientes y soluciones comerciales</p>
                          <p className="text-xs text-gray-300 mb-1">Comunicación activa con clientes y búsqueda de soluciones para satisfacer necesidades comerciales</p>
                          <span className="text-xs text-gray-500">Septiembre 2023 (1 día)</span>
                        </div>
                      </div>

                      {/* HOSPITAL LAURA ESTHER RODRIGUEZ DULANTO */}
                      <div className="relative flex items-start space-x-4">
                        <div className="relative z-10 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-gray-900 shadow-lg">
                          <span className="text-xs font-bold text-white">HL</span>
                        </div>
                        <div className="flex-1 pb-2">
                          <h4 className="font-semibold text-sm text-white mb-1">Hospital "Laura Esther Rodriguez Dulanto"</h4>
                          <p className="text-xs text-gray-400 mb-2">Líder de proyectos de innovación</p>
                          <p className="text-xs text-gray-300 mb-1">Lideré proyectos de innovación en servidores, mejorando la confiabilidad y seguridad de los datos del hospital</p>
                          <span className="text-xs text-gray-500">Noviembre 2022 — Enero 2023 (3 meses)</span>
                        </div>
                      </div>

                      {/* COLPEX INTERNATIONAL */}
                      <div className="relative flex items-start space-x-4">
                        <div className="relative z-10 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-gray-900 shadow-lg">
                          <span className="text-xs font-bold text-white">CI</span>
                        </div>
                        <div className="flex-1 pb-2">
                          <h4 className="font-semibold text-sm text-white mb-1">Colpex International S.A.C</h4>
                          <p className="text-xs text-gray-400 mb-2">Colaboración con equipos de logística y desarrollo móvil</p>
                          <p className="text-xs text-gray-300 mb-1">Trabajé en estrecha colaboración con el equipo de logística y desarrollo móvil, adaptando soluciones tecnológicas</p>
                          <span className="text-xs text-gray-500">Diciembre 2021 — Septiembre 2022 (10 meses)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 flex items-center justify-center space-x-2 bg-gray-800/60 hover:bg-gray-700/60 transition-colors py-2 px-4 rounded-lg text-sm border border-gray-700/50">
                  <Download className="w-4 h-4" />
                  <span>Descargar CV</span>
                </button>
              </div>

              {/* Contact Card */}
              <div id="contact" className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-6 border border-gray-800/50">
                <div className="flex items-center space-x-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <h3 className="font-semibold text-sm">Lima, Perú</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Pool Martin - Desarrollador Full Stack</p>

                {/* Botón principal inteligente */}
                <button
                  onClick={handleGmail}
                  className="w-full bg-blue-600/80 hover:bg-blue-600 transition-colors py-2 px-4 rounded-lg text-sm mb-3 font-medium flex items-center justify-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contactar por Email</span>
                </button>

                <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                  Creando experiencias digitales únicas.
                  ¡Hablemos sobre tu próximo proyecto!
                </p>

                {/* Botones específicos */}
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={handleWhatsApp}
                    className="bg-green-600/20 hover:bg-green-600/30 transition-colors py-2 px-3 rounded text-xs border border-green-600/30 flex items-center justify-center space-x-2 text-green-400"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Escríbeme por WhatsApp</span>
                  </button>
                </div>

                {/* Info adicional */}
                <div className="mt-4 pt-4 border-t border-gray-800/50">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Respuesta en 24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Navigation Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-900/30 backdrop-blur-md rounded-xl p-1 border border-gray-800/50 w-fit">
              <button
                onClick={() => setActiveSection('proyectos')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all text-sm ${activeSection === 'proyectos'
                  ? 'bg-gray-800/70 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                  }`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Proyectos</span>
              </button>
              <button
                onClick={() => setActiveSection('habilidades')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all text-sm ${activeSection === 'habilidades'
                  ? 'bg-gray-800/70 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                  }`}
              >
                <Code className="w-4 h-4" />
                <span>habilidades</span>
              </button>

            </div>

            {/* Content */}
            {activeSection === 'habilidades' && (
              <div className="space-y-6">
                {skillCategories.map((category, index) => (
                  <div
                    key={index}
                    className={`${getColorClasses(category.color)} backdrop-blur-md rounded-2xl p-6 border transition-all duration-300`}
                  >
                    {/* Header */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-gray-800/50 rounded-lg">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                        <p className="text-gray-400 text-sm">{category.description}</p>
                      </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {category.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="flex items-center space-x-2 bg-gray-800/30 rounded-lg p-3 border border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200"
                        >
                          <div className="flex-shrink-0">
                            {skill.icon}
                          </div>
                          <span className="text-gray-200 text-sm font-medium truncate">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Skill Count */}
                    <div className="mt-4 pt-3 border-t border-gray-700/30">
                      <span className="text-gray-400 text-xs">
                        {category.skills.length} tecnologías en esta categoría
                      </span>
                    </div>
                  </div>
                ))}

                {/* Summary Card */}
                <div className="bg-gray-900/40 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center space-x-2 mb-3">
                    <Code className="w-5 h-5 text-indigo-400" />
                    <h4 className="text-lg font-semibold text-white">Resumen Profesional</h4>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Desarrollador Frontend especializado en React.js y tecnologías modernas de interfaz de usuario.
                    Experiencia sólida en desarrollo web responsivo, aplicaciones móviles con React Native,
                    y conocimientos fundamentales en APIs y bases de datos para integración completa de aplicaciones.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="bg-cyan-600/20 border border-cyan-600/30 text-cyan-300 text-xs px-3 py-1 rounded-full">
                      Frontend Developer
                    </span>
                    <span className="bg-blue-600/20 border border-blue-600/30 text-blue-300 text-xs px-3 py-1 rounded-full">
                      React Specialist
                    </span>
                    <span className="bg-green-600/20 border border-green-600/30 text-green-300 text-xs px-3 py-1 rounded-full">
                      UI Developer
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'proyectos' && (
              <div className="space-y-4 md:space-y-6">
                {/* proyectos */}
                {repos.map((repo) => (
                  <div
                    key={repo.id}
                    className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
                      {/* Imagen del proyecto */}
                      <div className="w-full sm:w-24 md:w-32 h-32 sm:h-18 md:h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                        {repo.image ? (
                          <img
                            src={repo.image}
                            alt={repo.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center text-white">
                            <div className="text-xs sm:text-sm font-bold mb-1">{repo.name.substring(0, 8)}</div>
                            <div className="text-xs opacity-80">Project</div>
                          </div>
                        )}

                        {/* Overlay con icono */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          {repo.isPrivate ? (
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Título con enlaces */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                          <h4 className="font-semibold text-base md:text-lg text-white truncate pr-2">{repo.name}</h4>

                          {/* Enlaces para repositorios privados */}
                          {repo.isPrivate ? (
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs px-2 py-1 rounded-full font-medium bg-yellow-600/20 text-yellow-300 border border-yellow-600/30 whitespace-nowrap">
                                🔒 Privado
                              </span>

                              {/* Botón para abrir modal */}
                              <button
                                onClick={() => handlePrivateRepoClick(repo)}
                                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-xs md:text-sm font-medium"
                              >
                                <span className="hidden sm:inline">¿Por qué es privado?</span>
                                <span className="sm:hidden">Info</span>
                                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </button>

                              {/* Enlace a producción si existe */}
                              {repo.productionUrl && (
                                <a
                                  href={repo.productionUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors duration-200 text-xs md:text-sm font-medium"
                                >
                                  <span>Ver Sitio</span>
                                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-3a9 9 0 00-9-9h3m5 5h3" />
                                  </svg>
                                </a>
                              )}
                            </div>
                          ) : (
                            // Enlaces para repositorios públicos
                            <div className="flex flex-wrap items-center gap-2">
                              {repo.url && repo.url.includes('github.com') ? (
                                <>
                                  <a
                                    href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-xs md:text-sm font-medium"
                                  >
                                    <span>GitHub</span>
                                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                  </a>
                                  {repo.homepage && (
                                    <a
                                      href={repo.homepage}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors duration-200 text-xs md:text-sm font-medium"
                                    >
                                      <span>Demo</span>
                                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                      </svg>
                                    </a>
                                  )}
                                </>
                              ) : (
                                <a
                                  href={repo.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors duration-200 text-xs md:text-sm font-medium"
                                >
                                  <span>Ver Sitio</span>
                                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-3a9 9 0 00-9-9h3m5 5h3" />
                                  </svg>
                                </a>
                              )}

                              <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${repo.url && repo.url.includes('github.com')
                                ? 'bg-blue-600/20 text-blue-300 border border-blue-600/30'
                                : 'bg-purple-600/20 text-purple-300 border border-purple-600/30'
                                }`}>
                                {repo.url && repo.url.includes('github.com') ? 'GitHub' : 'Web'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Descripción */}
                        <p className="text-gray-400 text-sm leading-relaxed mb-3 md:mb-4">
                          {repo.description || "Proyecto desarrollado con tecnologías modernas y mejores prácticas de desarrollo."}
                        </p>

                        {/* Lenguajes y tecnologías dinámicos */}
                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3">
                          {/* Lenguaje principal */}
                          {repo.language && (
                            <span className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 border border-blue-600/30 text-blue-300 text-xs px-2 md:px-3 py-1 rounded-full font-medium">
                              {repo.language}
                            </span>
                          )}

                          {/* Tecnologías basadas en el repositorio (solo para repos de GitHub) */}
                          {repo.topics && repo.topics.map((topic) => (
                            <span
                              key={topic}
                              className="bg-gray-800/60 border border-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded-full hover:bg-gray-700/60 transition-colors duration-200"
                            >
                              {topic}
                            </span>
                          ))}

                          {/* Tecnologías predeterminadas para proyectos web */}
                          {repo.url && !repo.url.includes('github.com') && (
                            <>
                              <span className="bg-orange-600/20 border border-orange-600/30 text-orange-300 text-xs px-2 py-1 rounded-full">React</span>
                              <span className="bg-sky-600/20 border border-cyan-600/30 text-sky-300 text-xs px-2 py-1 rounded-full">Material UI</span>
                            </>
                          )}

                          {/* Tecnologías adicionales si no hay topics para repos de GitHub */}
                          {repo.url && repo.url.includes('github.com') && (!repo.topics || repo.topics.length === 0) && (
                            <>
                              <span className="bg-orange-600/20 border border-orange-600/30 text-orange-300 text-xs px-2 py-1 rounded-full">React</span>
                              <span className="bg-purple-600/20 border border-purple-600/30 text-purple-300 text-xs px-2 py-1 rounded-full">CSS</span>
                              <span className="bg-green-600/20 border border-green-600/30 text-green-300 text-xs px-2 py-1 rounded-full">JavaScript</span>
                            </>
                          )}
                        </div>

                        {/* Estadísticas para repos públicos */}
                        {repo.url && repo.url.includes('github.com') && !repo.isPrivate && (
                          <div className="flex flex-wrap gap-3 md:gap-4 text-xs text-gray-500">
                            {repo.stargazers_count !== undefined && (
                              <div className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span>{repo.stargazers_count}</span>
                              </div>
                            )}
                            {repo.updated_at && (
                              <div className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <span className="hidden sm:inline">Actualizado {new Date(repo.updated_at).toLocaleDateString()}</span>
                                <span className="sm:hidden">{new Date(repo.updated_at).toLocaleDateString('es', { month: 'short', day: 'numeric' })}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-700/50 max-w-md w-full mx-4 relative overflow-hidden">
              {/* Header con gradiente */}
              <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-b border-yellow-600/30 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-600/20 rounded-xl flex items-center justify-center border border-yellow-600/30">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Repositorio Privado</h3>
                    <p className="text-yellow-300 text-sm">{selectedRepo?.name}</p>
                  </div>
                </div>
              </div>

              {/* Contenido del modal */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Políticas Corporativas</h4>
                      <p className="text-gray-400 text-sm">
                        Este proyecto está bajo repositorio privado debido a las políticas de confidencialidad y seguridad establecidas por la empresa cliente.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Documentación Sensible</h4>
                      <p className="text-gray-400 text-sm">
                        El código fuente contiene documentación interna, configuraciones específicas y datos que requieren protección según los acuerdos de confidencialidad.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">Proyecto en Funcionamiento</h4>
                      <p className="text-gray-400 text-sm">
                        Aunque el código no esté disponible públicamente, puedes ver el proyecto funcionando en producción para evaluar mi trabajo.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3 mt-6">
                  {selectedRepo?.productionUrl && (
                    <a
                      href={selectedRepo.productionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-center"
                    >
                      Ver Proyecto Live
                    </a>
                  )}
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Entendido
                  </button>
                </div>
              </div>

              {/* Botón cerrar */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-800/80 hover:bg-gray-700/80 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer Mejorado */}
      <footer className="relative mt-20 bg-gray-950/50 backdrop-blur-md border-t border-gray-800/50">
        {/* Northern Lights para el footer */}
        <div className="northern-lights pointer-events-none absolute inset-0 opacity-30">
          <div className="northern-light" style={{ '--duration': '25s', '--delay': '5s', '--x': 20, '--y': 20, '--scale': 0.4 } as React.CSSProperties}></div>
          <div className="northern-light" style={{ '--duration': '30s', '--delay': '10s', '--x': 80, '--y': 60, '--scale': 0.5 } as React.CSSProperties}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

            {/* Logo y Descripción */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-teal-500 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">PM</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Pool Martin</h3>
                  <p className="text-sm text-gray-400">Ing. Sistemas & infomatico</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
                Especializado en crear experiencias digitales únicas y funcionales.
                Transformo ideas en interfaces modernas y atractivas que conectan con los usuarios.
              </p>

              {/* Redes Sociales */}
              <div className="flex space-x-4">
                <div className="p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 cursor-pointer transition-all hover:scale-110">
                  <Github className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                </div>
                <div className="p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 cursor-pointer transition-all hover:scale-110">
                  <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
                </div>
                <div className="p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 cursor-pointer transition-all hover:scale-110">
                  <Mail className="w-5 h-5 text-gray-400 hover:text-green-400 transition-colors" />
                </div>
              </div>
            </div>

            {/* Servicios */}
            <div>
              <h4 className="font-semibold text-white mb-4 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Servicios
              </h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Diseño Web</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Desarrollo Frontend</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Consultoría</a></li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="font-semibold text-white mb-4 flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Contacto
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>Limas, Perù</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>maxcuba773@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Disponible para proyectos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Separador */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Pool Martin C. Nuñez. Todos los derechos reservados.
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-blue-600/80 hover:bg-blue-600 rounded-full shadow-lg backdrop-blur-md border border-blue-500/30 transition-all hover:scale-110"
        >
          <ChevronUp className="w-5 h-5 text-white" />
        </button>
      )}


    </div>
  );
};

export default Hero;
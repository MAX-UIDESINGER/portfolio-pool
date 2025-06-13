'use client';

import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, actualTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const themeOptions = [
    {
      value: 'light' as const,
      label: 'Claro',
      icon: Sun,
      description: 'Tema claro'
    },
    {
      value: 'dark' as const,
      label: 'Oscuro',
      icon: Moon,
      description: 'Tema oscuro'
    },
    {
      value: 'system' as const,
      label: 'Sistema',
      icon: Monitor,
      description: 'Seguir preferencia del sistema'
    }
  ];

  const currentOption = themeOptions.find(option => option.value === theme);
  const CurrentIcon = currentOption?.icon || Monitor;

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg bg-gray-800/50 dark:bg-gray-800/50 hover:bg-gray-700/50 dark:hover:bg-gray-700/50 transition-colors border border-gray-700/50 dark:border-gray-700/50"
        aria-label="Cambiar tema"
      >
        <CurrentIcon className="w-4 h-4 text-gray-300 dark:text-gray-300" />
        <ChevronDown className={`w-3 h-3 text-gray-400 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Overlay para cerrar en móvil */}
          <div 
            className="fixed inset-0 z-40 md:hidden" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menú dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 z-50 bg-gray-900/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl border border-gray-800/50 dark:border-gray-800/50 shadow-xl">
            <div className="p-2">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = theme === option.value;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => handleThemeChange(option.value)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                      isSelected 
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' 
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{option.label}</div>
                      <div className="text-xs text-gray-400">{option.description}</div>
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Indicador del tema actual */}
            <div className="px-3 py-2 border-t border-gray-800/50 dark:border-gray-800/50">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                {actualTheme === 'dark' ? (
                  <Moon className="w-3 h-3" />
                ) : (
                  <Sun className="w-3 h-3" />
                )}
                <span>Tema actual: {actualTheme === 'dark' ? 'Oscuro' : 'Claro'}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSwitcher;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';

function Navbar({ isDarkMode, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav className="bg-white shadow-sm dark:bg-secondary-900 dark:border-b dark:border-secondary-800 md:static fixed top-0 inset-x-0 z-50 h-16 md:h-auto">
      <Popup
        isOpen={showInstallPrompt}
        title="MetaMask not detected"
        description="Install MetaMask to connect your Ethereum wallet."
        primaryLabel="Install MetaMask"
        onPrimary={handleInstallMetaMask}
        onClose={() => setShowInstallPrompt(false)}
      />
      <div className="container">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <svg width="30" height="35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="20" r="10" stroke="#0682ff"/>
                  <circle cx="15" cy="20" r="6" stroke="#0682ff" strokeWidth="3"/>
              </svg>  
              <span className="text-2xl font-bold text-primary-600 mt-1.5">BestCity</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-secondary-600 hover:text-primary-600 px-3 py-2 text-sm font-medium dark:text-secondary-200 dark:hover:text-primary-400"
              >
                {item.name}
              </Link>
            ))}
            <button
              type="button"
              onClick={onToggleTheme}
              className="text-secondary-600 hover:text-primary-600 px-3 py-2 text-sm font-medium dark:text-secondary-200 dark:hover:text-primary-400"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button
              className="btn"
            >
              Connect
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden pr-2">
            <button
              type="button"
              className="text-secondary-600 hover:text-primary-600 dark:text-secondary-200 dark:hover:text-primary-400"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <div
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-200 ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            } dark:bg-secondary-900 dark:border-r dark:border-secondary-800`}
          >
            <div className="flex items-center justify-between px-4 h-16 border-b border-secondary-100 dark:border-secondary-800">
              <span className="text-lg font-semibold text-primary-600">Menu</span>
              <button
                type="button"
                className="text-secondary-600 hover:text-primary-600 dark:text-secondary-200 dark:hover:text-primary-400"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <FiX size={22} />
              </button>
            </div>
            <div className="pt-2 pb-4 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-primary-50 dark:text-secondary-200 dark:hover:text-primary-400 dark:hover:bg-secondary-800"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                type="button"
                className="w-full flex items-center rounded-md px-3 py-2 text-base font-medium text-secondary-700 hover:text-primary-600 hover:bg-primary-50 dark:text-secondary-200 dark:hover:text-primary-400 dark:hover:bg-secondary-800"
                onClick={() => {
                  onToggleTheme();
                }}
              >
                {isDarkMode ? <FiSun size={18} className="mr-2" /> : <FiMoon size={18} className="mr-2" />}
                {isDarkMode ? 'Light mode' : 'Dark mode'}
              </button>
              <button
                className="w-full mt-2 px-3 py-2 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-[#007BFF]" />
              <span className="ml-2 text-xl font-bold text-gray-900">Darassa Academy</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#007BFF]">Accueil</Link>
            <Link to="/formations" className="text-gray-700 hover:text-[#007BFF]">Formations</Link>
            <Link to="/programme-mlm" className="text-gray-700 hover:text-[#007BFF]">Affiliation</Link>
            <Link to="/blog" className="text-gray-700 hover:text-[#007BFF]">Blog</Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#007BFF]">Contact</Link>
            <button className="bg-[#007BFF] text-white px-4 py-2 rounded-full hover:bg-[#0056b3] transition-colors">
              Connexion
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Accueil</Link>
            <Link to="/formations" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Formations</Link>
            <Link to="/programme-mlm" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Affiliation</Link>
            <Link to="/blog" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Blog</Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-50">Contact</Link>
            <button className="w-full mt-2 bg-[#007BFF] text-white px-4 py-2 rounded-full hover:bg-[#0056b3] transition-colors">
              Connexion
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header; 
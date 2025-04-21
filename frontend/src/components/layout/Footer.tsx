import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-[#007BFF]" />
              <span className="ml-2 text-xl font-bold">Darassa Academy</span>
            </div>
            <p className="text-gray-400 mb-4">
              Votre partenaire de confiance pour une formation professionnelle de qualité en RDC et en Afrique.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/darassaacademy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#007BFF]">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/darassaacademy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#007BFF]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/darassaacademy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#007BFF]">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/darassaacademy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#007BFF]">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/a-propos" className="text-gray-400 hover:text-white">À propos</Link></li>
              <li><Link to="/formations" className="text-gray-400 hover:text-white">Formations</Link></li>
              <li><Link to="/affiliation" className="text-gray-400 hover:text-white">Programme d'affiliation</Link></li>
              <li><Link to="/opportunites" className="text-gray-400 hover:text-white">Opportunités</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>Kinshasa, RDC</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>+243 8280 8280 7</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>contact@darassa.academy</span>
              </li>
            </ul>
            <Link to="/contact" className="mt-4 inline-block text-[#007BFF] hover:text-[#0056b3]">
              Nous contacter
            </Link>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Restez informé de nos dernières formations et opportunités.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-[#007BFF]"
              />
              <button
                type="submit"
                className="w-full bg-[#007BFF] text-white px-4 py-2 rounded-full hover:bg-[#0056b3] transition-colors"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Darassa Academy. Tous droits réservés.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/mentions-legales" className="text-gray-400 hover:text-white text-sm">Mentions légales</Link>
              <Link to="/politique-confidentialite" className="text-gray-400 hover:text-white text-sm">Politique de confidentialité</Link>
              <Link to="/conditions-utilisation" className="text-gray-400 hover:text-white text-sm">Conditions d'utilisation</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
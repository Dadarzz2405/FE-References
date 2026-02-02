import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, Trophy, Bell, LogIn } from "lucide-react";
import gdaLogo from "@/assets/gda-icon.png";

const Navbar = ({ activatedPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/livescores", label: "Live Scores", icon: Trophy },
    { path: "/announcement", label: "Announcements", icon: Bell },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-gda-gold/20 shadow-gda-navy">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={gdaLogo} 
              alt="GDA Logo" 
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
            />
            <div className="hidden sm:block">
              <span className="font-serif text-lg font-bold text-primary-foreground tracking-wide">
                GDA Houses
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activatedPage === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
                    transition-all duration-300 
                    ${isActive 
                      ? "bg-accent text-accent-foreground shadow-gda-gold" 
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    }
                  `}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
            
            <Link
              to="/login"
              className={`
                flex items-center gap-2 px-4 py-2 ml-2 rounded-lg font-medium text-sm
                transition-all duration-300 border
                ${activatedPage === "/login"
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground"
                }
              `}
            >
              <LogIn size={18} />
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? "max-h-64 pb-4" : "max-h-0"}
          `}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activatedPage === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg font-medium
                    transition-all duration-300
                    ${isActive 
                      ? "bg-accent text-accent-foreground" 
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    }
                  `}
                >
                  <Icon size={20} />
                  {link.label}
                </Link>
              );
            })}
            
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg font-medium border border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              <LogIn size={20} />
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

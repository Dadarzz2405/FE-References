import { useEffect, useState } from "react";
import axios from "axios";

import AlGhuraab from "@/assets/houses/Al-Ghuraab.png";
import AlHudhud from "@/assets/houses/Al-Hudhud.png";
import AlAdiyat from "@/assets/houses/Al-Adiyat.png";
import AnNun from "@/assets/houses/An-Nun.png";
import AnNahl from "@/assets/houses/An-Nahl.png";
import AnNaml from "@/assets/houses/An-Naml.png";
import gdaLogo from "@/assets/gda-logo-full.png";

const houseImages = {
  "Al-Ghuraab": AlGhuraab,
  "Al-Hudhud": AlHudhud,
  "Al-Adiyat": AlAdiyat,
  "An-Nun": AnNun,
  "An-Nahl": AnNahl,
  "An-Naml": AnNaml,
};

function HomePage() {
  const [houses, setHouses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getHouses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/houses");
        let data = [];
        response.data.forEach((house) => {
          data.push({
            id: Math.floor(Math.random() * 10000),
            name: house.name,
          });
        });
        let dataSorted = data.sort((a, b) => a.id - b.id);
        setHouses(dataSorted);
        setTimeout(() => setIsLoaded(true), 100);
      } catch (error) {
        console.error("Failed to fetch houses:", error);
        // Fallback data for demo
        const fallbackHouses = [
          { id: 1, name: "Al-Ghuraab" },
          { id: 2, name: "Al-Hudhud" },
          { id: 3, name: "Al-Adiyat" },
          { id: 4, name: "An-Nun" },
          { id: 5, name: "An-Nahl" },
          { id: 6, name: "An-Naml" },
        ];
        setHouses(fallbackHouses);
        setTimeout(() => setIsLoaded(true), 100);
      }
    };
    getHouses();
  }, []);

  return (
    <div className="min-h-screen bg-navy-stars overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-24 pb-16 flex flex-col items-center justify-center min-h-screen">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/3 rounded-full blur-2xl" />
        </div>

        {/* Title Section */}
        <div className="text-center mb-8 z-10 px-4">
          <div className="mb-6">
            <img 
              src={gdaLogo} 
              alt="Global Darussalam Academy" 
              className="w-24 h-24 mx-auto mb-4 drop-shadow-2xl"
            />
          </div>
          <h1 className="hero-title text-primary-foreground mb-2">
            DARSANIAN'S
          </h1>
          <h2 className="hero-subtitle text-gold-gradient">
            HOUSES
          </h2>
          <p className="mt-6 text-primary-foreground/70 max-w-md mx-auto">
            Six houses united by tradition, competing with honor
          </p>
        </div>

        {/* Houses Fan Display */}
        <div className="relative w-full h-[400px] md:h-[500px] mt-8">
          <div className="absolute inset-0 flex items-center justify-center">
            {houses.map((house, i) => {
              const originX = 50;
              const originY = 900;
              const change = 15;
              const middle = (houses.length - 1) / 2;
              const angle = (i - middle) * change;

              return (
                <div
                  key={house.id ?? i}
                  className={`
                    absolute w-[140px] h-[187px] md:w-[180px] md:h-[240px] lg:w-[200px] lg:h-[267px]
                    cursor-pointer transition-all duration-500 ease-out
                    ${isLoaded ? 'opacity-100' : 'opacity-0'}
                  `}
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: `${originX}% ${originY}px`,
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                    transitionDelay: `${i * 100}ms`,
                    zIndex: houses.length - Math.abs(i - middle),
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.25)';
                    e.currentTarget.style.zIndex = '20';
                    e.currentTarget.style.filter = 'drop-shadow(0 20px 40px rgba(212, 168, 75, 0.4))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
                    e.currentTarget.style.zIndex = String(houses.length - Math.abs(i - middle));
                    e.currentTarget.style.filter = 'none';
                  }}
                >
                  <div
                    className="w-full h-full bg-contain bg-center bg-no-repeat drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
                    style={{
                      backgroundImage: `url(${houseImages[house.name]})`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gda-navy-dark/50 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

export default HomePage;

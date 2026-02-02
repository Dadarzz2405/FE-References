import axios from "axios";
import React, { useEffect, useState } from "react";
import { Trophy, Medal, Star, TrendingUp } from "lucide-react";

const LiveScores = () => {
  const [housesRank, setHousesRank] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getScoresData = async () => {
      try {
        const data = await axios.get("http://localhost:5000/api/live-points");
        let finalData = [];
        data.data.forEach((house) => {
          finalData.push({
            rank: house.rank,
            name: house.name,
            score: house.points,
          });
        });
        setHousesRank(finalData);
      } catch (error) {
        console.error("Failed to fetch scores:", error);
        // Fallback demo data
        setHousesRank([
          { rank: 1, name: "Al-Ghuraab", score: 1250 },
          { rank: 2, name: "An-Nahl", score: 1180 },
          { rank: 3, name: "Al-Hudhud", score: 1050 },
          { rank: 4, name: "Al-Adiyat", score: 980 },
          { rank: 5, name: "An-Naml", score: 920 },
          { rank: 6, name: "An-Nun", score: 850 },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    getScoresData();
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-400" size={24} />;
      case 2:
        return <Medal className="text-gray-300" size={24} />;
      case 3:
        return <Medal className="text-amber-600" size={24} />;
      default:
        return <Star className="text-muted-foreground" size={20} />;
    }
  };

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border-yellow-500/30";
      case 2:
        return "bg-gradient-to-r from-gray-300/20 to-gray-400/10 border-gray-400/30";
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-amber-700/10 border-amber-600/30";
      default:
        return "bg-card hover:bg-secondary/50";
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
            <Trophy className="text-accent" size={32} />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-3">
            Live House Scores
          </h1>
          <p className="text-muted-foreground text-lg">
            Current standings of all Darsanian's Houses
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <TrendingUp size={16} className="text-green-500" />
            <span>Updated in real-time</span>
          </div>
        </div>

        {/* Scores Table */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-xl bg-muted animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {housesRank.map((house, i) => (
              <div
                key={i}
                className={`
                  flex items-center gap-4 p-4 md:p-6 rounded-xl border
                  transition-all duration-300 hover:shadow-lg
                  animate-fade-in ${getRankStyle(house.rank)}
                `}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  {getRankIcon(house.rank)}
                </div>

                {/* Rank Number */}
                <div className="w-8 text-center">
                  <span className={`
                    font-serif font-bold text-2xl
                    ${house.rank <= 3 ? 'text-accent' : 'text-muted-foreground'}
                  `}>
                    {house.rank}
                  </span>
                </div>

                {/* House Name */}
                <div className="flex-1">
                  <h3 className="font-serif font-semibold text-lg md:text-xl text-foreground">
                    {house.name}
                  </h3>
                </div>

                {/* Score */}
                <div className="text-right">
                  <span className="font-mono text-2xl md:text-3xl font-bold text-accent">
                    {house.score.toLocaleString()}
                  </span>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    points
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Trophy className="text-yellow-400" size={18} />
            <span>1st Place</span>
          </div>
          <div className="flex items-center gap-2">
            <Medal className="text-gray-300" size={18} />
            <span>2nd Place</span>
          </div>
          <div className="flex items-center gap-2">
            <Medal className="text-amber-600" size={18} />
            <span>3rd Place</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveScores;

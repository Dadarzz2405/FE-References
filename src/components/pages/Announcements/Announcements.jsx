import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Calendar, User, Home, ChevronRight } from "lucide-react";

const Announcements = () => {
  const [announce, setAnnounce] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAnnounceData = async () => {
      try {
        const data = await axios.get("http://localhost:5000/api/announcements");
        let finalData = [];
        data.data.forEach((a) => {
          finalData.push({
            title: a.title,
            content: a.content,
            date: a.created_at,
            house: a.house?.name ?? "Unknown",
            captain: {
              name: a.captain?.name ?? "Unknown",
              username: a.captain?.username ?? "-",
            },
          });
        });
        setAnnounce(finalData);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
        // Fallback demo data
        setAnnounce([
          {
            title: "Inter-House Sports Competition",
            content: "The annual sports competition will be held next week. All houses are expected to participate.",
            date: "2025-01-15",
            house: "Al-Ghuraab",
            captain: { name: "Ahmad", username: "ahmad123" },
          },
          {
            title: "House Points Update",
            content: "Congratulations to all houses for the excellent performance in the academic week.",
            date: "2025-01-14",
            house: "An-Nahl",
            captain: { name: "Sarah", username: "sarah_cap" },
          },
          {
            title: "Community Service Day",
            content: "Join us for the community service event this Saturday. Points will be awarded for participation.",
            date: "2025-01-13",
            house: "Al-Hudhud",
            captain: { name: "Omar", username: "omar_lead" },
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    getAnnounceData();
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
            <Bell className="text-accent" size={32} />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-3">
            Announcements
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay updated with the latest news from all houses
          </p>
        </div>

        {/* Announcements List */}
        {isLoading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-muted animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        ) : announce.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="mx-auto text-muted-foreground mb-4" size={48} />
            <p className="text-muted-foreground text-lg">No announcements yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {announce.map((value, i) => (
              <article
                key={i}
                className="glass-card p-6 hover-lift animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                    {value.title}
                  </h2>
                  <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                    <Home size={14} />
                    {value.house}
                  </span>
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {value.content}
                </p>

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={16} />
                      <span>{formatDate(value.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User size={16} />
                      <span>
                        {value.captain.name}
                        <span className="text-muted-foreground/60 ml-1">
                          @{value.captain.username}
                        </span>
                      </span>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-1 text-accent text-sm font-medium hover:gap-2 transition-all">
                    Read more
                    <ChevronRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;

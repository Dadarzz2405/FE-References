import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-navy-stars flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="font-serif text-8xl font-bold text-gold-gradient mb-4">404</h1>
        <h2 className="font-serif text-2xl text-primary-foreground mb-4">Page Not Found</h2>
        <p className="text-primary-foreground/70 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold transition-all hover:shadow-gda-gold"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "components/DashboardLayout";
import { useParams, Link } from "react-router-dom";

interface CompetitorDetail {
  id: string;
  name: string;
  location: string;
  category: string;
  rating: number;
  priceRange: string;
  distance: string;
  lastUpdated: string;
  description: string;
  website: string;
  phoneNumber: string;
  openingHours: Record<string, string>;
  popularItems: Array<{
    name: string;
    price: string;
    popularity: number;
  }>;
  reviews: Array<{
    author: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  priceComparison: {
    averageMealPrice: string;
    comparedToYou: string;
    comparedToArea: string;
  };
}

export default function CompetitorProfile() {
  const { id } = useParams<{ id: string }>();
  const [competitor, setCompetitor] = useState<CompetitorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    setTimeout(() => {
      // This would be a real API call in a production app
      const mockCompetitor: CompetitorDetail = {
        id: "1",
        name: "Tasty Bites Cafe",
        location: "123 Main St, Downtown",
        category: "Cafe",
        rating: 4.5,
        priceRange: "$$",
        distance: "0.5 miles",
        lastUpdated: "2025-04-01",
        description: "A cozy cafe offering a variety of breakfast and lunch options with a focus on fresh, locally-sourced ingredients.",
        website: "https://tastybites.example.com",
        phoneNumber: "(555) 123-4567",
        openingHours: {
          "Monday": "7:00 AM - 8:00 PM",
          "Tuesday": "7:00 AM - 8:00 PM",
          "Wednesday": "7:00 AM - 8:00 PM",
          "Thursday": "7:00 AM - 8:00 PM",
          "Friday": "7:00 AM - 9:00 PM",
          "Saturday": "8:00 AM - 9:00 PM",
          "Sunday": "8:00 AM - 6:00 PM"
        },
        popularItems: [
          { name: "Avocado Toast", price: "$12.99", popularity: 95 },
          { name: "Breakfast Burrito", price: "$10.99", popularity: 88 },
          { name: "Cappuccino", price: "$4.50", popularity: 92 }
        ],
        reviews: [
          { author: "John D.", rating: 5, comment: "Best breakfast in town!", date: "2025-03-15" },
          { author: "Sarah M.", rating: 4, comment: "Great food but a bit pricey.", date: "2025-03-20" },
          { author: "Mike T.", rating: 5, comment: "Amazing coffee and friendly staff.", date: "2025-03-25" }
        ],
        priceComparison: {
          averageMealPrice: "$15.99",
          comparedToYou: "-5%",
          comparedToArea: "+10%"
        }
      };
      
      setCompetitor(mockCompetitor);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  // Render star rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">
            {i < fullStars ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            ) : i === fullStars && hasHalfStar ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fillOpacity="0.5" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeWidth="1" />
              </svg>
            )}
          </span>
        ))}
        <span className="ml-1 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  // Render popularity bar
  const renderPopularityBar = (popularity: number) => {
    return (
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full" 
          style={{ width: `${popularity}%` }}
        ></div>
      </div>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (error || !competitor) {
    return (
      <DashboardLayout>
        <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error || "Competitor not found"}</p>
          <Link 
            to="/competitors" 
            className="mt-4 inline-block px-4 py-2 bg-card hover:bg-muted transition-colors rounded-md border border-border"
          >
            Back to Competitors
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center space-x-4 mb-6">
          <Link 
            to="/competitors" 
            className="p-2 bg-card hover:bg-muted transition-colors rounded-md border border-border"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold">Competitor Profile</h1>
        </div>
        
        {/* Overview Card */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{competitor.name}</h2>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                  {competitor.category}
                </span>
                <span className="text-sm text-muted-foreground">{competitor.priceRange}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{competitor.distance}</span>
              </div>
              <p className="text-muted-foreground mb-4">{competitor.description}</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-muted-foreground">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm">{competitor.location}</span>
                </div>
                <div className="flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-muted-foreground">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm">Rating: {renderRating(competitor.rating)}</span>
                </div>
                <div className="flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-muted-foreground">
                    <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 2v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 2v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm">Last Updated: {new Date(competitor.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-end">
              <a 
                href={competitor.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center space-x-2 hover:bg-primary/90 mb-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 3h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Visit Website</span>
              </a>
              <a 
                href={`tel:${competitor.phoneNumber}`}
                className="px-4 py-2 bg-card hover:bg-muted transition-colors rounded-lg flex items-center space-x-2 border border-border"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{competitor.phoneNumber}</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Popular Items */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-4">Popular Menu Items</h3>
              <div className="space-y-4">
                {competitor.popularItems.map((item, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm">{item.price}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">Popularity</span>
                      <div className="flex-1">{renderPopularityBar(item.popularity)}</div>
                      <span className="text-xs font-medium">{item.popularity}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Comparison */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-4">Price Comparison</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Average Meal</p>
                  <p className="text-xl font-bold">{competitor.priceComparison.averageMealPrice}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">vs. Your Prices</p>
                  <p className={`text-xl font-bold ${competitor.priceComparison.comparedToYou.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                    {competitor.priceComparison.comparedToYou}
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">vs. Area Avg</p>
                  <p className={`text-xl font-bold ${competitor.priceComparison.comparedToArea.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                    {competitor.priceComparison.comparedToArea}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Reviews */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {competitor.reviews.map((review, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{review.author}</p>
                        <div className="flex items-center">
                          {renderRating(review.rating)}
                          <span className="text-xs text-muted-foreground ml-2">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Hours */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
              <div className="space-y-2">
                {Object.entries(competitor.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="font-medium">{day}</span>
                    <span className="text-sm">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map would be displayed here</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{competitor.location}</p>
            </div>
            
            {/* Actions */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-4">Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center justify-center space-x-2 hover:bg-primary/90">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Edit Competitor</span>
                </button>
                <button className="w-full px-4 py-2 bg-card hover:bg-muted transition-colors rounded-lg flex items-center justify-center space-x-2 border border-border">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Export Data</span>
                </button>
                <button className="w-full px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors rounded-lg flex items-center justify-center space-x-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

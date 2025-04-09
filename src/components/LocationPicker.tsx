import React, { useState, useEffect, useRef } from "react";
import { MapPin, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "./Slider";

// Define LatLng interface for location coordinates
export interface LatLng {
  lat: number;
  lng: number;
}

export interface Props {
  /** Initial location coordinates */
  initialLocation?: LatLng;
  /** Initial zoom level */
  initialZoom?: number;
  /** Initial radius in miles */
  initialRadius?: number;
  /** Callback when location is selected */
  onLocationSelect?: (location: LatLng, radius: number) => void;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Optional className for additional styling */
  className?: string;
  /** Optional label */
  label?: string;
  /** Whether to show the radius slider */
  showRadiusControl?: boolean;
}

/**
 * LocationPicker component for map-based location selection
 * 
 * Note: This is a placeholder implementation that simulates a map interface
 * In a real implementation, this would integrate with a mapping library like Mapbox or Google Maps
 */
export const LocationPicker = ({
  initialLocation,
  initialZoom = 14,
  initialRadius = 1,
  onLocationSelect,
  disabled = false,
  className = "",
  label,
  showRadiusControl = true,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState<LatLng | undefined>(initialLocation);
  const [radius, setRadius] = useState(initialRadius);
  const [zoom, setZoom] = useState(initialZoom);
  const mapRef = useRef<HTMLDivElement>(null);

  // Simulate location search
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // In a real implementation, this would call a geocoding API
    // For this placeholder, we'll just set a random nearby location
    const baseLocation = location || { lat: 40.7128, lng: -74.006 };
    const newLocation = {
      lat: baseLocation.lat + (Math.random() - 0.5) * 0.01,
      lng: baseLocation.lng + (Math.random() - 0.5) * 0.01,
    };
    
    setLocation(newLocation);
    setSearchQuery("");
    
    if (onLocationSelect) {
      onLocationSelect(newLocation, radius);
    }
  };

  // Handle map click to place pin
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    // Get click coordinates relative to the map container
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert pixel coordinates to simulated geo coordinates
    // In a real implementation, this would use the map library's methods
    const newLocation = {
      lat: 40.7128 + ((rect.height / 2 - y) / rect.height) * 0.1 * (20 - zoom),
      lng: -74.006 + ((x - rect.width / 2) / rect.width) * 0.2 * (20 - zoom),
    };
    
    setLocation(newLocation);
    
    if (onLocationSelect) {
      onLocationSelect(newLocation, radius);
    }
  };

  // Handle radius change
  const handleRadiusChange = (value: number) => {
    setRadius(value);
    
    if (location && onLocationSelect) {
      onLocationSelect(location, value);
    }
  };

  // Format radius for display
  const formatRadius = (value: number) => `${value.toFixed(1)} mi`;

  // Clear location selection
  const clearLocation = () => {
    setLocation(undefined);
    
    if (onLocationSelect) {
      onLocationSelect({ lat: 0, lng: 0 }, 0);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {label && <Label className="font-medium">{label}</Label>}
      
      {/* Search input */}
      <div className="flex space-x-2">
        <Input
          placeholder="Search for a location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
          disabled={disabled}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button 
          variant="secondary" 
          onClick={handleSearch}
          disabled={!searchQuery.trim() || disabled}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Map container */}
      <div 
        ref={mapRef}
        className="relative h-[300px] w-full border border-border rounded-md overflow-hidden bg-muted/30"
        onClick={handleMapClick}
      >
        {/* This is a placeholder for the actual map */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="text-center">
            <p>Map Placeholder</p>
            <p className="text-xs">Click to place pin</p>
          </div>
        </div>
        
        {/* Zoom controls */}
        <div className="absolute right-2 top-2 flex flex-col space-y-1">
          <Button 
            variant="secondary" 
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setZoom(Math.min(zoom + 1, 20))}
            disabled={disabled}
          >
            +
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setZoom(Math.max(zoom - 1, 1))}
            disabled={disabled}
          >
            −
          </Button>
        </div>
        
        {/* Location pin */}
        {location && (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <MapPin className="h-8 w-8 text-primary" />
              
              {/* Radius circle */}
              {showRadiusControl && (
                <div 
                  className="absolute left-1/2 top-1/2 border-2 border-primary/40 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: `${radius * 40}px`,
                    height: `${radius * 40}px`,
                    background: 'rgba(116, 195, 101, 0.1)',
                  }}
                />
              )}
            </div>
          </div>
        )}
        
        {/* Remove pin button */}
        {location && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute left-2 top-2"
            onClick={clearLocation}
            disabled={disabled}
          >
            <X className="mr-1 h-4 w-4" />
            Clear Pin
          </Button>
        )}
      </div>
      
      {/* Radius slider */}
      {location && showRadiusControl && (
        <Slider
          label="Trade Area Radius"
          min={0.5}
          max={5}
          step={0.1}
          value={radius}
          onChange={handleRadiusChange}
          formatValue={formatRadius}
          disabled={disabled}
        />
      )}
      
      {/* Location information */}
      {location && (
        <div className="p-3 border border-border rounded-md bg-muted/30">
          <p className="text-sm">
            <span className="font-medium">Selected Location:</span> {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
          </p>
          {showRadiusControl && (
            <p className="text-sm">
              <span className="font-medium">Radius:</span> {formatRadius(radius)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

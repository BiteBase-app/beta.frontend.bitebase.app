import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Button, 
  Slider,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography
} from '@/extensions/shadcn/components';
import { SidebarLayout } from '@/layouts';
import { 
  ChevronDown, 
  Download, 
  Filter, 
  MapPin, 
  Search,
  BarChart,
  Users,
  Clock,
  DollarSign,
  Building,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

const LocationAnalysis: React.FC = () => {
  const [mapRadius, setMapRadius] = useState(1);
  const [selectedDataLayer, setSelectedDataLayer] = useState('foot-traffic');
  const [selectedLocation, setSelectedLocation] = useState('Market Street Restaurant');
  
  const dataLayers = [
    { id: 'foot-traffic', name: 'Foot Traffic', icon: <Users size={16} className="text-primary" /> },
    { id: 'demographics', name: 'Demographics', icon: <BarChart size={16} className="text-accent" /> },
    { id: 'competitors', name: 'Competitors', icon: <Building size={16} className="text-secondary" /> },
    { id: 'traffic-patterns', name: 'Traffic Patterns', icon: <Clock size={16} className="text-purple-500" /> },
    { id: 'rent-prices', name: 'Rent Prices', icon: <DollarSign size={16} className="text-green-500" /> }
  ];

  const locationScores = {
    'foot_traffic': 92,
    'restaurant_density': 75,
    'income_level': 88,
    'competition': 64,
    'accessibility': 95,
    'parking': 70,
    'public_transport': 85,
    'visibility': 80,
    'overall': 86
  };

  const LocationRating: React.FC<{ score: number, label: string, color: string }> = ({ score, label, color }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium" style={{ color }}>{score}/100</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="h-2 rounded-full" 
          style={{ width: `${score}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );

  const ToggleButton: React.FC<{ id: string, active: boolean, icon: React.ReactNode, name: string, onClick: () => void }> = 
  ({ id, active, icon, name, onClick }) => (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center space-x-2 p-2 rounded-lg w-full text-left text-sm",
        active ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
      )}
    >
      {icon}
      <span>{name}</span>
    </button>
  );

  return (
    <SidebarLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Typography variant="h3">Location Analysis</Typography>
            <Typography variant="muted" className="text-gray-500">
              Analyze locations for potential restaurant sites or evaluate your current location
            </Typography>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filter
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar for controls */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-4">
                <div className="mb-6">
                  <div className="relative mb-4">
                    <input 
                      type="text" 
                      placeholder="Search locations..." 
                      className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Analysis Radius</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-600">0.5 mi</span>
                      <Slider
                        value={[mapRadius]}
                        min={0.5}
                        max={3}
                        step={0.1}
                        onValueChange={(value) => setMapRadius(value[0])}
                      />
                      <span className="text-xs text-gray-600">3 mi</span>
                    </div>
                    <div className="text-center text-sm text-gray-700 mt-1">{mapRadius.toFixed(1)} miles</div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Data Layers</p>
                    <div className="space-y-1">
                      {dataLayers.map(layer => (
                        <ToggleButton 
                          key={layer.id}
                          id={layer.id}
                          active={selectedDataLayer === layer.id}
                          icon={layer.icon}
                          name={layer.name}
                          onClick={() => setSelectedDataLayer(layer.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Saved Locations</p>
                  <div className="space-y-2">
                    <div className={cn(
                      "p-2 rounded-lg border cursor-pointer",
                      selectedLocation === 'Market Street Restaurant' ? "border-primary bg-primary bg-opacity-5" : "border-gray-200 hover:bg-gray-50"
                    )}>
                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-primary bg-opacity-10 mr-3">
                          <MapPin size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Market Street Restaurant</p>
                          <p className="text-xs text-gray-500">123 Market St, San Francisco</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={cn(
                      "p-2 rounded-lg border cursor-pointer",
                      selectedLocation === 'Downtown Location' ? "border-primary bg-primary bg-opacity-5" : "border-gray-200 hover:bg-gray-50"
                    )}>
                      <div className="flex items-start">
                        <div className="p-2 rounded-full bg-blue-100 mr-3">
                          <MapPin size={16} className="text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Downtown Location</p>
                          <p className="text-xs text-gray-500">456 Main St, San Francisco</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 gap-6">
              {/* Map View */}
              <Card>
                <CardContent className="p-0">
                  <div className="h-[500px] w-full relative rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={48} className="mx-auto mb-2 text-primary" />
                      <Typography>Interactive Map Placeholder</Typography>
                      <Typography variant="small" className="text-gray-500">
                        Map would display selected data layers and location analysis
                      </Typography>
                    </div>
                    
                    {/* Legend Panel */}
                    <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-sm text-sm">
                      <p className="font-medium mb-2">Legend</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          <span>Current Location</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-secondary"></div>
                          <span>Competitors</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>High Traffic</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span>Medium Traffic</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Tabs */}
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="demographics">Demographics</TabsTrigger>
                  <TabsTrigger value="competitors">Competitors</TabsTrigger>
                  <TabsTrigger value="traffic">Traffic Patterns</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Location Scores */}
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <Typography variant="h4">Location Scores</Typography>
                          <div className="flex items-center gap-1 text-gray-500 cursor-pointer hover:text-gray-700">
                            <Info size={14} />
                            <span className="text-sm">How scores work</span>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <Typography variant="h2" className="text-4xl font-bold text-primary">
                              {locationScores.overall}
                            </Typography>
                            <div className="text-right">
                              <Typography variant="small" className="text-gray-500">Overall Score</Typography>
                              <Typography variant="small" className="block text-green-600 font-medium">Very Good</Typography>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-primary" 
                              style={{ width: `${locationScores.overall}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <LocationRating 
                          score={locationScores.foot_traffic} 
                          label="Foot Traffic" 
                          color="#74C365" // primary
                        />
                        <LocationRating 
                          score={locationScores.income_level} 
                          label="Income Level" 
                          color="#F4C431" // accent
                        />
                        <LocationRating 
                          score={locationScores.competition} 
                          label="Competition" 
                          color="#E23D28" // secondary
                        />
                        <LocationRating 
                          score={locationScores.accessibility} 
                          label="Accessibility" 
                          color="#3b82f6" // blue
                        />
                        <LocationRating 
                          score={locationScores.visibility} 
                          label="Visibility" 
                          color="#8b5cf6" // purple
                        />
                      </CardContent>
                    </Card>
                    
                    {/* Key Insights */}
                    <Card>
                      <CardContent className="p-6">
                        <Typography variant="h4" className="mb-4">Key Insights</Typography>
                        
                        <div className="space-y-4">
                          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex gap-3">
                              <div className="p-2 rounded-full bg-green-100">
                                <Users size={16} className="text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium text-green-800">High Foot Traffic</p>
                                <p className="text-sm text-green-700">
                                  This location sees an estimated 1,200+ pedestrians daily during peak hours.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex gap-3">
                              <div className="p-2 rounded-full bg-blue-100">
                                <DollarSign size={16} className="text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-blue-800">Strong Income Demographics</p>
                                <p className="text-sm text-blue-700">
                                  Median household income in this area is 33% above the city average.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex gap-3">
                              <div className="p-2 rounded-full bg-yellow-100">
                                <Building size={16} className="text-yellow-600" />
                              </div>
                              <div>
                                <p className="font-medium text-yellow-800">Moderate Competition</p>
                                <p className="text-sm text-yellow-700">
                                  12 similar restaurants within a 1-mile radius, but only 3 direct competitors.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex gap-3">
                              <div className="p-2 rounded-full bg-red-100">
                                <Clock size={16} className="text-red-600" />
                              </div>
                              <div>
                                <p className="font-medium text-red-800">Peak Time Alert</p>
                                <p className="text-sm text-red-700">
                                  Traffic peaks between 11:30am-1:30pm and 5:30pm-7:30pm on weekdays.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="demographics">
                  <Card>
                    <CardContent className="p-6">
                      <Typography variant="h4" className="mb-4">Demographic Analysis</Typography>
                      <Typography variant="small" className="block mb-6 text-gray-500">
                        Population and income data within a {mapRadius.toFixed(1)}-mile radius of selected location
                      </Typography>
                      
                      {/* Placeholder for demographic charts and data */}
                      <div className="flex items-center justify-center p-12 bg-gray-50 rounded-lg">
                        <Typography>Demographic charts and detailed data would be displayed here</Typography>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="competitors">
                  <Card>
                    <CardContent className="p-6">
                      <Typography variant="h4" className="mb-4">Competitor Analysis</Typography>
                      <Typography variant="small" className="block mb-6 text-gray-500">
                        Nearby competitors within a {mapRadius.toFixed(1)}-mile radius
                      </Typography>
                      
                      {/* Placeholder for competitor data */}
                      <div className="flex items-center justify-center p-12 bg-gray-50 rounded-lg">
                        <Typography>Competitor comparison charts and details would be displayed here</Typography>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="traffic">
                  <Card>
                    <CardContent className="p-6">
                      <Typography variant="h4" className="mb-4">Traffic Pattern Analysis</Typography>
                      <Typography variant="small" className="block mb-6 text-gray-500">
                        Foot and vehicle traffic patterns by time of day
                      </Typography>
                      
                      {/* Placeholder for traffic data */}
                      <div className="flex items-center justify-center p-12 bg-gray-50 rounded-lg">
                        <Typography>Traffic pattern charts and heatmaps would be displayed here</Typography>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default LocationAnalysis; 
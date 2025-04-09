import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  Checkbox, 
  FormControl, 
  FormLabel, 
  Input, 
  RadioGroup, 
  Select, 
  Typography 
} from '@/extensions/shadcn/components';
import { Check, Store, PlusCircle, Network } from 'lucide-react';
import { cn } from '@/lib/utils';

type RestaurantType = 'existing' | 'new' | 'franchise' | null;

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const [selectedType, setSelectedType] = useState<RestaurantType>(null);
  const [formData, setFormData] = useState({
    name: '',
    cuisineType: '',
    location: '',
    yearsInOperation: '',
    averageCustomers: '',
    currentChallenge: '',
    goals: {
      increaseFoot: false,
      optimizeMenu: false,
      expandLocations: false,
      improveOnline: false,
      reduceCosts: false
    }
  });

  const handleTypeSelect = (type: RestaurantType) => {
    setSelectedType(type);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleGoalChange = (goal: string, checked: boolean) => {
    setFormData({
      ...formData,
      goals: {
        ...formData.goals,
        [goal]: checked
      }
    });
  };

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const completeOnboarding = () => {
    // Submit data and redirect to dashboard
    console.log('Onboarding complete', { type: selectedType, formData });
    window.location.href = '/dashboard';
  };

  const ProgressStep: React.FC<{ step: number; status: 'completed' | 'active' | 'inactive' }> = ({ step, status }) => {
    return (
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center relative",
        status === 'completed' ? "bg-primary text-white" : 
        status === 'active' ? "bg-accent text-white" : 
        "bg-gray-200 text-gray-500"
      )}>
        {status === 'completed' ? <Check size={16} /> : <span>{step}</span>}
        {step < 4 && (
          <div className={cn(
            "absolute top-1/2 left-full w-14 h-0.5 -translate-y-1/2",
            status === 'completed' ? "bg-primary" : "bg-gray-200"
          )} />
        )}
      </div>
    );
  };

  const OptionCard: React.FC<{ 
    title: string; 
    description: string; 
    icon: React.ReactNode; 
    tag: string; 
    tagColor: string;
    type: RestaurantType;
  }> = ({ title, description, icon, tag, tagColor, type }) => {
    return (
      <Card 
        className={cn(
          "cursor-pointer transition-all hover:transform hover:-translate-y-1 hover:shadow-lg",
          selectedType === type ? "border-2 border-primary" : "border border-gray-200"
        )}
        onClick={() => handleTypeSelect(type)}
      >
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-opacity-20"
               style={{ backgroundColor: tagColor + '20' }}>
            {icon}
          </div>
          <Typography variant="h4" className="mb-2">{title}</Typography>
          <Typography variant="small" className="text-gray-600 mb-4">{description}</Typography>
          <span className={`inline-block px-3 py-1 rounded-full text-xs`}
                style={{ backgroundColor: tagColor + '20', color: tagColor }}>
            {tag}
          </span>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Store className="text-white" size={20} />
            </div>
            <Typography variant="h4" className="font-bold">
              BiteBase<span className="text-secondary">AI</span>
            </Typography>
          </div>
          <Button variant="link">Already have an account? Sign in</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Progress Steps */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center">
            <ProgressStep step={1} status="completed" />
            <ProgressStep step={2} status="completed" />
            <ProgressStep step={3} status={currentStep === 3 ? "active" : "completed"} />
            <ProgressStep step={4} status={currentStep === 4 ? "active" : "inactive"} />
          </div>
        </div>

        {/* Step 3: Restaurant Type Selection */}
        {currentStep === 3 && (
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fadeIn">
            <Typography variant="h2" className="mb-4">What best describes your restaurant?</Typography>
            <Typography className="text-gray-600 mb-8">
              Select the option that matches your current situation to get personalized recommendations.
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <OptionCard 
                title="Existing Restaurant" 
                description="I already have a restaurant and want to optimize performance"
                icon={<Store size={30} className="text-blue-500" />}
                tag="Best for growth"
                tagColor="#3b82f6"
                type="existing"
              />
              
              <OptionCard 
                title="New Restaurant" 
                description="I'm planning to open a new restaurant and need location insights"
                icon={<PlusCircle size={30} className="text-green-500" />}
                tag="Best for startups"
                tagColor="#10b981"
                type="new"
              />
              
              <OptionCard 
                title="Franchise" 
                description="I operate or plan to operate multiple franchise locations"
                icon={<Network size={30} className="text-purple-500" />}
                tag="Best for scaling"
                tagColor="#8b5cf6"
                type="franchise"
              />
            </div>
            
            <Button 
              size="lg" 
              disabled={!selectedType}
              onClick={goToNextStep}
              className={cn(!selectedType && "opacity-50")}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 4: Detailed Information */}
        {currentStep === 4 && selectedType === 'existing' && (
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <Typography variant="h2" className="mb-2 text-center">Tell us about your existing restaurant</Typography>
            <Typography className="text-gray-600 mb-8 text-center">
              This information helps us provide personalized recommendations for your business.
            </Typography>
            
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <FormControl>
                    <FormLabel>Restaurant Name</FormLabel>
                    <Input 
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Cuisine Type</FormLabel>
                    <Select 
                      value={formData.cuisineType}
                      onChange={(e) => handleInputChange('cuisineType', e.target.value)}
                    >
                      <option value="">Select cuisine type</option>
                      <option value="american">American</option>
                      <option value="italian">Italian</option>
                      <option value="mexican">Mexican</option>
                      <option value="asian">Asian</option>
                      <option value="mediterranean">Mediterranean</option>
                      <option value="other">Other</option>
                    </Select>
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Location (Address)</FormLabel>
                    <Input 
                      placeholder="Street address"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Years in Operation</FormLabel>
                    <Select 
                      value={formData.yearsInOperation}
                      onChange={(e) => handleInputChange('yearsInOperation', e.target.value)}
                    >
                      <option value="">Select years</option>
                      <option value="less_than_1">Less than 1 year</option>
                      <option value="1_3">1-3 years</option>
                      <option value="3_5">3-5 years</option>
                      <option value="5_10">5-10 years</option>
                      <option value="10_plus">10+ years</option>
                    </Select>
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Average Daily Customers</FormLabel>
                    <Select 
                      value={formData.averageCustomers}
                      onChange={(e) => handleInputChange('averageCustomers', e.target.value)}
                    >
                      <option value="">Select range</option>
                      <option value="less_than_50">Less than 50</option>
                      <option value="50_100">50-100</option>
                      <option value="100_200">100-200</option>
                      <option value="200_500">200-500</option>
                      <option value="500_plus">500+</option>
                    </Select>
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Current Challenges</FormLabel>
                    <Select 
                      value={formData.currentChallenge}
                      onChange={(e) => handleInputChange('currentChallenge', e.target.value)}
                    >
                      <option value="">Select primary challenge</option>
                      <option value="low_traffic">Low foot traffic</option>
                      <option value="high_competition">High competition</option>
                      <option value="menu_optimization">Menu optimization</option>
                      <option value="staffing">Staffing issues</option>
                      <option value="marketing">Marketing effectiveness</option>
                    </Select>
                  </FormControl>
                </div>
                
                <div className="mb-8">
                  <FormLabel>What are your main goals? (Select all that apply)</FormLabel>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="increase-foot" 
                        checked={formData.goals.increaseFoot}
                        onCheckedChange={(checked) => handleGoalChange('increaseFoot', checked === true)}
                      />
                      <label htmlFor="increase-foot">Increase foot traffic</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="optimize-menu" 
                        checked={formData.goals.optimizeMenu}
                        onCheckedChange={(checked) => handleGoalChange('optimizeMenu', checked === true)}
                      />
                      <label htmlFor="optimize-menu">Optimize menu pricing</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="expand-locations" 
                        checked={formData.goals.expandLocations}
                        onCheckedChange={(checked) => handleGoalChange('expandLocations', checked === true)}
                      />
                      <label htmlFor="expand-locations">Expand to new locations</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="improve-online" 
                        checked={formData.goals.improveOnline}
                        onCheckedChange={(checked) => handleGoalChange('improveOnline', checked === true)}
                      />
                      <label htmlFor="improve-online">Improve online presence</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="reduce-costs" 
                        checked={formData.goals.reduceCosts}
                        onCheckedChange={(checked) => handleGoalChange('reduceCosts', checked === true)}
                      />
                      <label htmlFor="reduce-costs">Reduce operational costs</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={goToPreviousStep}>
                    Back
                  </Button>
                  <Button onClick={completeOnboarding}>
                    Complete Setup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* New Restaurant Form - Not showing all implementation details for brevity */}
        {currentStep === 4 && selectedType === 'new' && (
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <Typography variant="h2" className="mb-2 text-center">Tell us about your new restaurant concept</Typography>
            <Typography className="text-gray-600 mb-8 text-center">
              We'll use this information to find the perfect location and market strategy.
            </Typography>
            
            <Card className="p-8">
              <CardContent className="p-0">
                {/* Similar form fields as existing restaurant form */}
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={goToPreviousStep}>
                    Back
                  </Button>
                  <Button onClick={completeOnboarding}>
                    Complete Setup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Franchise Form - Not showing all implementation details for brevity */}
        {currentStep === 4 && selectedType === 'franchise' && (
          <div className="max-w-4xl mx-auto animate-fadeIn">
            <Typography variant="h2" className="mb-2 text-center">Tell us about your franchise</Typography>
            <Typography className="text-gray-600 mb-8 text-center">
              This information helps us provide tailored analytics across all your locations.
            </Typography>
            
            <Card className="p-8">
              <CardContent className="p-0">
                {/* Similar form fields as other forms */}
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={goToPreviousStep}>
                    Back
                  </Button>
                  <Button onClick={completeOnboarding}>
                    Complete Setup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Onboarding; 
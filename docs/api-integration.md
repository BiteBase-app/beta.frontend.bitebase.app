# API Integration Guide

This document provides detailed instructions for integrating with the BiteBase Intelligence API.

## API Overview

The BiteBase Intelligence API is a RESTful service that allows you to interact with restaurant data, analytics, and AI insights. The API is organized around resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes.

## Base URL

The base URL for all API endpoints is:

```
https://api.bitebase.io/v1
```

For local development, use:

```
http://localhost:3001/api/v1
```

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. Include the token in the Authorization header of your requests:

```
Authorization: Bearer <your_token>
```

### Obtaining a Token

To get an authentication token:

1. Send a POST request to `/auth/login` with your credentials:

```javascript
const response = await fetch('https://api.bitebase.io/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'your-email@example.com',
    password: 'your-password'
  }),
});

const { token } = await response.json();
```

2. Store the token securely and include it in subsequent requests.

### Token Expiration

Tokens expire after 24 hours. You can refresh a token by sending a POST request to `/auth/refresh` with your current token:

```javascript
const response = await fetch('https://api.bitebase.io/v1/auth/refresh', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${currentToken}`,
    'Content-Type': 'application/json',
  },
});

const { token } = await response.json();
```

## API Resources

### Restaurants

#### Get All Restaurants

```
GET /restaurants
```

Query parameters:

- `page` (integer, default: 1): Page number for pagination
- `limit` (integer, default: 20): Number of items per page
- `sort` (string): Field to sort by (e.g., 'name', 'createdAt')
- `order` (string): Sort order ('asc' or 'desc')
- `search` (string): Search term to filter restaurants

Response:

```json
{
  "data": [
    {
      "id": "rest_123456",
      "name": "Pasta Paradise",
      "location": {
        "address": "123 Main St",
        "city": "New York",
        "state": "NY",
        "postalCode": "10001",
        "country": "USA"
      },
      "cuisine": ["Italian", "Mediterranean"],
      "rating": 4.5,
      "priceRange": "$$",
      "operatingHours": {
        "monday": { "open": "11:00", "close": "22:00" },
        "tuesday": { "open": "11:00", "close": "22:00" }
        // other days...
      },
      "createdAt": "2023-01-15T08:30:00Z",
      "updatedAt": "2023-04-20T14:15:00Z"
    }
    // more restaurants...
  ],
  "pagination": {
    "total": 157,
    "pages": 8,
    "page": 1,
    "limit": 20
  }
}
```

#### Get Restaurant by ID

```
GET /restaurants/:id
```

Response:

```json
{
  "id": "rest_123456",
  "name": "Pasta Paradise",
  "description": "Authentic Italian cuisine in the heart of New York.",
  "location": {
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA",
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.006
    }
  },
  "cuisine": ["Italian", "Mediterranean"],
  "rating": 4.5,
  "priceRange": "$$",
  "contactInfo": {
    "phone": "+1-212-555-0123",
    "email": "info@pastapardise.com",
    "website": "https://pastapardise.com"
  },
  "operatingHours": {
    "monday": { "open": "11:00", "close": "22:00" },
    "tuesday": { "open": "11:00", "close": "22:00" }
    // other days...
  },
  "features": ["Outdoor Seating", "Delivery", "Takeout", "Vegetarian Options"],
  "createdAt": "2023-01-15T08:30:00Z",
  "updatedAt": "2023-04-20T14:15:00Z"
}
```

#### Create Restaurant

```
POST /restaurants
```

Request body:

```json
{
  "name": "Sushi Sensation",
  "description": "Fresh and creative sushi in a modern setting.",
  "location": {
    "address": "456 Ocean Ave",
    "city": "San Francisco",
    "state": "CA",
    "postalCode": "94107",
    "country": "USA"
  },
  "cuisine": ["Japanese", "Sushi"],
  "priceRange": "$$$",
  "contactInfo": {
    "phone": "+1-415-555-0124",
    "email": "info@sushisensation.com",
    "website": "https://sushisensation.com"
  },
  "operatingHours": {
    "monday": { "open": "12:00", "close": "22:00" },
    "tuesday": { "open": "12:00", "close": "22:00" }
    // other days...
  },
  "features": ["Reservations", "Private Dining", "Vegan Options"]
}
```

Response:

```json
{
  "id": "rest_789012",
  "name": "Sushi Sensation",
  // other fields...
  "createdAt": "2023-05-10T09:45:00Z",
  "updatedAt": "2023-05-10T09:45:00Z"
}
```

#### Update Restaurant

```
PUT /restaurants/:id
```

Request body:
Include only the fields you want to update.

```json
{
  "description": "Updated description for the restaurant.",
  "rating": 4.7,
  "features": ["Outdoor Seating", "Delivery", "Takeout", "Vegan Options"]
}
```

Response:

```json
{
  "id": "rest_123456",
  "name": "Pasta Paradise",
  "description": "Updated description for the restaurant.",
  // other fields...
  "rating": 4.7,
  "features": ["Outdoor Seating", "Delivery", "Takeout", "Vegan Options"],
  "updatedAt": "2023-05-10T10:30:00Z"
}
```

#### Delete Restaurant

```
DELETE /restaurants/:id
```

Response:

```json
{
  "success": true,
  "message": "Restaurant deleted successfully"
}
```

### Menu Items

#### Get Menu Items for a Restaurant

```
GET /restaurants/:restaurantId/menu-items
```

Query parameters:

- `category` (string): Filter by category (e.g., 'appetizer', 'main', 'dessert')
- `page` (integer, default: 1): Page number for pagination
- `limit` (integer, default: 50): Number of items per page

Response:

```json
{
  "data": [
    {
      "id": "item_123456",
      "restaurantId": "rest_123456",
      "name": "Margherita Pizza",
      "description": "Classic pizza with tomato sauce, mozzarella, and basil",
      "price": 14.99,
      "category": "main",
      "tags": ["vegetarian", "popular"],
      "nutritionalInfo": {
        "calories": 850,
        "protein": 35,
        "carbs": 95,
        "fat": 40
      },
      "imageUrl": "https://cdn.bitebase.io/items/margherita.jpg",
      "active": true,
      "createdAt": "2023-01-20T12:30:00Z",
      "updatedAt": "2023-04-25T09:15:00Z"
    }
    // more menu items...
  ],
  "pagination": {
    "total": 42,
    "pages": 1,
    "page": 1,
    "limit": 50
  }
}
```

#### Create Menu Item

```
POST /restaurants/:restaurantId/menu-items
```

Request body:

```json
{
  "name": "Tiramisu",
  "description": "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream",
  "price": 8.99,
  "category": "dessert",
  "tags": ["popular", "sweet"],
  "nutritionalInfo": {
    "calories": 350,
    "protein": 5,
    "carbs": 40,
    "fat": 18
  },
  "imageUrl": "https://cdn.bitebase.io/items/tiramisu.jpg",
  "active": true
}
```

### Analytics

#### Get Restaurant Performance Metrics

```
GET /analytics/restaurants/:restaurantId/performance
```

Query parameters:

- `startDate` (string, format: YYYY-MM-DD): Start date for the analysis period
- `endDate` (string, format: YYYY-MM-DD): End date for the analysis period
- `metrics` (string, comma-separated): Specific metrics to retrieve (e.g., 'revenue,orders,customers')

Response:

```json
{
  "restaurantId": "rest_123456",
  "period": {
    "start": "2023-01-01",
    "end": "2023-03-31"
  },
  "metrics": {
    "revenue": {
      "total": 245780.50,
      "change": 12.5,
      "monthly": [
        { "month": "January", "value": 78450.25 },
        { "month": "February", "value": 82540.75 },
        { "month": "March", "value": 84789.50 }
      ]
    },
    "orders": {
      "total": 8750,
      "change": 8.2,
      "monthly": [
        { "month": "January", "value": 2845 },
        { "month": "February", "value": 2905 },
        { "month": "March", "value": 3000 }
      ]
    },
    "customers": {
      "total": 4230,
      "change": 6.8,
      "monthly": [
        { "month": "January", "value": 1350 },
        { "month": "February", "value": 1425 },
        { "month": "March", "value": 1455 }
      ]
    }
  }
}
```

#### Get Popular Menu Items

```
GET /analytics/restaurants/:restaurantId/popular-items
```

Query parameters:

- `startDate` (string, format: YYYY-MM-DD): Start date for the analysis period
- `endDate` (string, format: YYYY-MM-DD): End date for the analysis period
- `limit` (integer, default: 10): Number of items to return

Response:

```json
{
  "restaurantId": "rest_123456",
  "period": {
    "start": "2023-01-01",
    "end": "2023-03-31"
  },
  "items": [
    {
      "id": "item_123456",
      "name": "Margherita Pizza",
      "orderCount": 1245,
      "revenue": 18662.55,
      "averageRating": 4.8
    },
    {
      "id": "item_123457",
      "name": "Spaghetti Carbonara",
      "orderCount": 1050,
      "revenue": 15750.00,
      "averageRating": 4.7
    }
    // more items...
  ]
}
```

### AI Insights

#### Get Business Insights

```
GET /ai/restaurants/:restaurantId/insights
```

Query parameters:

- `type` (string): Type of insights ('revenue', 'customer', 'menu', 'operations')

Response:

```json
{
  "restaurantId": "rest_123456",
  "insightType": "menu",
  "timestamp": "2023-05-10T15:30:00Z",
  "insights": [
    {
      "id": "insight_123456",
      "title": "Potential Menu Gap",
      "description": "Your menu lacks vegan main course options, which could be limiting your customer base.",
      "impact": "medium",
      "recommendation": "Consider adding 2-3 vegan main courses to appeal to a growing segment of customers.",
      "supportingData": {
        "competitorAnalysis": "85% of similar restaurants in your area offer vegan options",
        "customerFeedback": "15% of customer reviews mention a lack of vegan options",
        "marketTrend": "Vegan food searches in your area have increased by 35% in the last year"
      }
    },
    {
      "id": "insight_123457",
      "title": "Price Optimization Opportunity",
      "description": "Your appetizer prices are 15% higher than the market average while your dessert prices are 10% lower.",
      "impact": "high",
      "recommendation": "Consider adjusting appetizer prices downward and dessert prices upward for better overall margin.",
      "supportingData": {
        "priceComparison": {
          "appetizers": { "yours": 12.50, "market": 10.75 },
          "desserts": { "yours": 7.50, "market": 8.25 }
        },
        "orderAnalysis": "Dessert orders are 30% higher than industry average, suggesting room for price adjustment"
      }
    }
    // more insights...
  ]
}
```

#### Get Customer Segmentation

```
GET /ai/restaurants/:restaurantId/customer-segments
```

Response:

```json
{
  "restaurantId": "rest_123456",
  "timestamp": "2023-05-10T15:35:00Z",
  "segments": [
    {
      "id": "segment_123456",
      "name": "Loyal Lunch Regulars",
      "size": 28.5,
      "description": "Customers who visit 2-3 times weekly during lunch hours",
      "characteristics": {
        "visitFrequency": "High (8-12 times monthly)",
        "timeOfDay": "Lunch (11:00 - 14:00)",
        "averageSpend": "$18.50 per visit",
        "typicalItems": ["Salads", "Sandwiches", "Quick Pasta Dishes"],
        "loyalty": "Very High",
        "demographics": {
          "ageRange": "30-45",
          "occupation": "Office workers within 1km radius"
        }
      },
      "opportunities": [
        "Implement lunch loyalty program",
        "Create lunch combos for faster service",
        "Consider corporate catering options"
      ]
    },
    // more segments...
  ]
}
```

## Error Handling

The API uses conventional HTTP response codes to indicate the success or failure of an API request:

- 2xx: Success
- 4xx: Client error (invalid request)
- 5xx: Server error

Error responses include a JSON object with the following structure:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid.",
    "details": "The 'name' field is required."
  }
}
```

Common error codes:

- `invalid_request`: The request is malformed or missing required parameters
- `authentication_failed`: Authentication credentials are missing or invalid
- `permission_denied`: The authenticated user doesn't have permission for the requested operation
- `resource_not_found`: The requested resource doesn't exist
- `rate_limit_exceeded`: You've exceeded the API rate limit
- `internal_error`: An error occurred on the server

## Rate Limiting

API requests are limited to 100 requests per minute per API key. The following headers are included in API responses:

- `X-RateLimit-Limit`: The maximum number of requests per minute
- `X-RateLimit-Remaining`: The number of requests remaining in the current window
- `X-RateLimit-Reset`: The time (in seconds) when the rate limit will reset

If you exceed the rate limit, you'll receive a 429 Too Many Requests response.

## Pagination

List endpoints return paginated results. You can control pagination using the following query parameters:

- `page`: The page number (starting from 1)
- `limit`: The number of items per page

The response includes a pagination object with metadata about the result set:

```json
{
  "data": [...],
  "pagination": {
    "total": 157,
    "pages": 8,
    "page": 1,
    "limit": 20
  }
}
```

## Filtering and Sorting

Many endpoints support filtering and sorting using query parameters:

- `sort`: Field to sort by (e.g., 'name', 'createdAt')
- `order`: Sort order ('asc' or 'desc')
- `search`: Search term to filter results
- Specific field filters (e.g., `status=active`)

## Using the API with the Frontend

In the BiteBase Intelligence frontend application, API calls are managed through service modules in the `src/services` directory. Here's how to use them:

### Example: Fetching Restaurants

```typescript
// src/services/restaurantService.ts
import { apiClient } from '../lib/apiClient';
import { Restaurant, PaginatedResponse } from '../types';

export const fetchRestaurants = async (params?: {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}): Promise<PaginatedResponse<Restaurant>> => {
  const response = await apiClient.get('/restaurants', { params });
  return response.data;
};

export const fetchRestaurantById = async (id: string): Promise<Restaurant> => {
  const response = await apiClient.get(`/restaurants/${id}`);
  return response.data;
};
```

### Example: Using the Service in a Component

```tsx
// src/pages/Restaurants.tsx
import React, { useEffect, useState } from 'react';
import { fetchRestaurants } from '../services/restaurantService';
import { Restaurant, PaginatedResponse } from '../types';

const RestaurantsPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetchRestaurants({ 
          page: 1, 
          limit: 20,
          sort: 'name',
          order: 'asc'
        });
        setRestaurants(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load restaurants');
        setLoading(false);
      }
    };
    
    loadRestaurants();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
  return (
    <div>
      <h1>Restaurants</h1>
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantsPage;
```

### Using React Query

For optimal data fetching with caching and refetching capabilities, we recommend using React Query:

```tsx
// src/pages/Restaurants.tsx with React Query
import React from 'react';
import { useQuery } from 'react-query';
import { fetchRestaurants } from '../services/restaurantService';

const RestaurantsPage: React.FC = () => {
  const { data, isLoading, error } = useQuery(
    ['restaurants', { page: 1, limit: 20, sort: 'name', order: 'asc' }],
    () => fetchRestaurants({ page: 1, limit: 20, sort: 'name', order: 'asc' })
  );
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading restaurants</div>;
  
  return (
    <div>
      <h1>Restaurants</h1>
      <ul>
        {data?.data.map(restaurant => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantsPage;
```

## API Client Configuration

The frontend application uses an API client configured with Axios:

```typescript
// src/lib/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { apiClient };
```

## Conclusion

This API integration guide provides the essential information for working with the BiteBase Intelligence API. For more detailed examples or specific use cases, refer to the API reference documentation or contact the API development team.

## Resources

- [Swagger Documentation](https://api.bitebase.io/docs)
- [Postman Collection](https://www.postman.com/bitebase/workspace/bitebase-api)
- [Authentication Guide](./authentication.md)
- [Error Handling Best Practices](./error-handling.md)
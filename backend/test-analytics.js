// Simple test script to check analytics endpoints
const endpoints = [
  'http://localhost:5000/api/analytics/kpi',
  'http://localhost:5000/api/analytics/topics',
  'http://localhost:5000/api/analytics/years',
  'http://localhost:5000/api/analytics/sectors',
  'http://localhost:5000/api/analytics/regions',
  'http://localhost:5000/api/analytics/pestle',
  'http://localhost:5000/api/analytics/countries',
  'http://localhost:5000/api/analytics/scatter',
  'http://localhost:5000/api/analytics/cities'
];

console.log('Analytics API Endpoints:');
endpoints.forEach(endpoint => {
  console.log(`- ${endpoint}`);
});

console.log('\nTo test these endpoints, make sure your server is running and visit the URLs above.');
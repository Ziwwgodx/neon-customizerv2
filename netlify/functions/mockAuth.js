/**
 * Mock Shopify OAuth Authentication
 * Returns a fake token for local development
 */
exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Mock delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate successful OAuth response
    const mockResponse = {
      success: true,
      token: 'mock-shopify-token-' + Date.now(),
      shop: 'lumineon-dev.myshopify.com',
      expires_at: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      scope: 'write_products,read_products,write_orders,read_orders'
    };

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mockResponse)
    };

  } catch (error) {
    console.error('Mock auth error:', error);
    
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: 'Authentication failed',
        message: error.message
      })
    };
  }
};
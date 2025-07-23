const fs = require('fs').promises;
const path = require('path');

/**
 * Mock Shopify Product Creation
 * Accepts POST with custom neon design data
 */
exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const designData = JSON.parse(event.body || '{}');
    
    // Validate required fields
    if (!designData.text || !designData.color) {
      return {
        statusCode: 400,
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields',
          message: 'Text and color are required'
        })
      };
    }

    // Mock delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));

    // Calculate price based on options
    let basePrice = 89.99;
    const options = {
      support: {
        cut: 0,
        printed: 15,
        colored: 25
      },
      mounting: {
        holes: 0,
        chains: 10,
        sticker: 5,
        base: 20,
        stand: 35
      }
    };

    const totalPrice = basePrice + 
      (options.support[designData.support] || 0) + 
      (options.mounting[designData.mounting] || 0);

    // Create mock Shopify product
    const product = {
      id: Date.now(),
      title: `Néon LED Personnalisé - "${designData.text}"`,
      handle: `neon-led-${designData.text.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`,
      product_type: 'Néon LED',
      vendor: 'LumiNéon',
      status: 'draft',
      variants: [
        {
          id: Date.now() + 1,
          price: totalPrice.toFixed(2),
          sku: `NEON-${Date.now()}`,
          inventory_quantity: 1,
          title: `${designData.width}x${designData.height} - ${designData.color}`,
          weight: 0.5,
          weight_unit: 'kg'
        }
      ],
      images: [],
      options: [
        { name: 'Couleur', values: [designData.color] },
        { name: 'Texte', values: [designData.text] },
        { name: 'Dimensions', values: [`${designData.width}x${designData.height}`] }
      ],
      tags: ['néon', 'led', 'personnalisé', 'lumineon'],
      metafields: [
        {
          namespace: 'lumineon',
          key: 'design_config',
          value: JSON.stringify(designData),
          type: 'json'
        }
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Save product data locally for development
    const productsDir = path.join(process.cwd(), '.netlify', 'functions-serve', 'products');
    try {
      await fs.mkdir(productsDir, { recursive: true });
      await fs.writeFile(
        path.join(productsDir, `product-${product.id}.json`),
        JSON.stringify(product, null, 2)
      );
    } catch (fsError) {
      console.warn('Could not save product locally:', fsError.message);
    }

    return {
      statusCode: 201,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        product,
        message: 'Product created successfully',
        admin_url: `https://lumineon-dev.myshopify.com/admin/products/${product.id}`,
        preview_url: `https://lumineon-dev.myshopify.com/products/${product.handle}`
      })
    };

  } catch (error) {
    console.error('Product creation error:', error);
    
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: 'Product creation failed',
        message: error.message
      })
    };
  }
};
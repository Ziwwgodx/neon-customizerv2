const fs = require('fs').promises;
const path = require('path');

/**
 * Image Upload Handler
 * Receives base64 image, converts to PNG, saves locally
 */
exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
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
    const { image, filename, designId } = JSON.parse(event.body || '{}');
    
    // Validate required fields
    if (!image || !filename) {
      return {
        statusCode: 400,
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields',
          message: 'Image data and filename are required'
        })
      };
    }

    // Validate base64 image format
    const base64Match = image.match(/^data:image\/(png|jpeg|jpg);base64,(.+)$/);
    if (!base64Match) {
      return {
        statusCode: 400,
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: false,
          error: 'Invalid image format',
          message: 'Image must be base64 encoded PNG or JPEG'
        })
      };
    }

    const [, imageType, base64Data] = base64Match;
    const buffer = Buffer.from(base64Data, 'base64');

    // Create uploads directory
    const uploadsDir = path.join(process.cwd(), '.netlify', 'functions-serve', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const uniqueFilename = `${timestamp}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}.png`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    // Save file
    await fs.writeFile(filePath, buffer);

    // Get file stats
    const stats = await fs.stat(filePath);
    
    // Create response
    const response = {
      success: true,
      file: {
        filename: uniqueFilename,
        originalName: filename,
        size: stats.size,
        type: 'image/png',
        designId: designId || null,
        uploadedAt: new Date().toISOString(),
        url: `/uploads/${uniqueFilename}`, // In production, this would be a full URL
        localPath: filePath
      },
      message: 'Image uploaded successfully'
    };

    // Save upload metadata
    const metadataFile = path.join(uploadsDir, `${uniqueFilename}.meta.json`);
    await fs.writeFile(metadataFile, JSON.stringify(response.file, null, 2));

    return {
      statusCode: 201,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('Image upload error:', error);
    
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: 'Image upload failed',
        message: error.message
      })
    };
  }
};
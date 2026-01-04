#!/bin/bash

# Quick script to generate QR code

echo "================================================"
echo "  QR Code Generator"
echo "================================================"

# Check if backend is running
if ! curl -s http://localhost:5000/health > /dev/null; then
    echo "❌ Error: Backend is not running"
    echo "   Please start the backend first:"
    echo "   cd backend && npm start"
    exit 1
fi

echo ""
echo "Generating QR code..."

# Generate QR code
response=$(curl -s http://localhost:5000/api/qr/generate)

# Extract fileName from response
fileName=$(echo $response | grep -o '"fileName":"[^"]*"' | cut -d'"' -f4)

if [ -z "$fileName" ]; then
    echo "❌ Error generating QR code"
    echo "Response: $response"
    exit 1
fi

echo "✅ QR code generated successfully!"
echo ""
echo "📁 File saved at: qr-codes/$fileName"
echo ""
echo "🔗 Download URL:"
echo "   http://localhost:5000/api/qr/download/$fileName"
echo ""
echo "💡 Tip: Open the download URL in your browser to save the QR code"

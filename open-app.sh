#!/bin/bash
# Quick launcher for Centric Learning App on Mac

echo "🎓 Centric Learning Claude Agent"
echo "================================"
echo ""

# Check if server is running
if curl -s http://localhost:8000/api/v1/health > /dev/null 2>&1; then
    echo "✅ Server is already running!"
    echo ""
    echo "Opening browser..."
    open "http://localhost:8000/docs"
    echo ""
    echo "✅ API Documentation opened in your browser!"
    echo ""
    echo "📝 You can also open the simple test page:"
    echo "   open simple_test.html"
else
    echo "⚠️  Server is not running yet."
    echo ""
    echo "To start the server, run:"
    echo "   python3 main.py"
    echo ""
    echo "Then run this script again!"
fi

echo ""
echo "Available links:"
echo "  📚 Full API Docs:  http://localhost:8000/docs"
echo "  🧪 Simple Test:    file://$(pwd)/simple_test.html"
echo "  ❤️  Health Check:  http://localhost:8000/api/v1/health"
echo ""

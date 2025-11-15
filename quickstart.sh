#!/bin/bash
# Quickstart script for Centric Learning Claude Agent

set -e

echo "============================================"
echo "  Centric Learning Claude Agent Setup"
echo "============================================"
echo ""

# Check Python version
python_version=$(python3 --version 2>&1 | grep -oE '[0-9]+\.[0-9]+' | head -1)
required_version="3.11"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo "Error: Python 3.11 or higher required. Found: $python_version"
    exit 1
fi

echo "✓ Python version: $python_version"

# Check if .env exists
if [ ! -f .env ]; then
    echo ""
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "✓ Created .env file"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env and add your ANTHROPIC_API_KEY"
    echo ""
    read -p "Press Enter to open .env in your default editor..."
    ${EDITOR:-nano} .env
fi

# Install dependencies
echo ""
echo "Installing Python dependencies..."
pip3 install -r requirements.txt -q
echo "✓ Dependencies installed"

# Extract data if needed
if [ ! -d "extracted_data" ]; then
    echo ""
    echo "Extracting standards data..."
    unzip -q "Centric Courses Strand.zip" -d extracted_data
    echo "✓ Data extracted to extracted_data/"
fi

echo ""
echo "============================================"
echo "  Setup Complete!"
echo "============================================"
echo ""
echo "To start the API server:"
echo "  python3 main.py"
echo ""
echo "To use the CLI:"
echo "  python3 cli.py --help"
echo ""
echo "To run tests:"
echo "  pytest tests/"
echo ""
echo "API documentation will be available at:"
echo "  http://localhost:8000/docs"
echo ""
echo "Happy teaching! 📚"
echo ""

# Centric Learning Agent - Setup Checklist

Use this checklist to set up the Centric Learning Agent from scratch.

---

## ☑️ Pre-Setup Requirements

- [ ] Computer with Python 3.11 or higher
- [ ] Internet connection
- [ ] Credit card for Anthropic API (gets $5 free credits)
- [ ] Text editor or IDE
- [ ] Terminal/Command line access

---

## ☑️ Step 1: Get the Code (2 minutes)

```bash
# Clone the repository
git clone https://github.com/blackandyellowenterprise/Centric-App.git

# Navigate to the directory
cd Centric-App
```

**Verify**: You should see files like `main.py`, `cli.py`, `requirements.txt`

---

## ☑️ Step 2: Install Dependencies (5 minutes)

```bash
# Install Python packages
pip install -r requirements.txt
```

**Verify**: Run `python3 --version` (should show 3.11 or higher)

**If errors**: Try `pip3` instead of `pip`

---

## ☑️ Step 3: Extract Standards Data (1 minute)

```bash
# Extract the educational standards
unzip "Centric Courses Strand.zip" -d extracted_data
```

**Verify**: Check that `extracted_data/` folder has 4 Excel files:
- Centric ELA Strands-2.xlsx
- Centric Math Strands-2.xlsx
- Centric Science Strands-2.xlsx
- Centric Social Studies Strands-3.xlsx

---

## ☑️ Step 4: Get Anthropic API Key (10 minutes)

### 4.1 Create Anthropic Account
- [ ] Go to https://console.anthropic.com
- [ ] Click "Sign Up"
- [ ] Enter email and create password
- [ ] Verify email (check inbox)

### 4.2 Add Payment Method
- [ ] Log in to console
- [ ] Go to "Billing" section
- [ ] Add credit/debit card
- [ ] Note: You get $5 free credits!

### 4.3 Generate API Key
- [ ] Click "API Keys" in menu
- [ ] Click "Create Key"
- [ ] Name it: "Centric Learning Production"
- [ ] **COPY THE KEY** (starts with `sk-ant-`)
- [ ] **SAVE IT SOMEWHERE SAFE** (you can only see it once!)

---

## ☑️ Step 5: Configure Environment (2 minutes)

```bash
# Copy the example environment file
cp .env.example .env

# Edit the file (use nano, vim, or any text editor)
nano .env
```

### Add your API key:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

**Save and exit**:
- In nano: Press `Ctrl+X`, then `Y`, then `Enter`
- In vim: Press `Esc`, type `:wq`, press `Enter`

**Verify**: Run `cat .env` and check your key is there

---

## ☑️ Step 6: Test the Installation (5 minutes)

### 6.1 Run Basic Tests
```bash
python3 test_basic.py
```

**Expected**: All tests should pass with ✓ marks

### 6.2 Test API Server
```bash
# Start the server (leave this running)
python3 main.py
```

**Expected**: Should see "Starting Centric Learning Claude Agent" and "Uvicorn running on http://0.0.0.0:8000"

### 6.3 Test API Endpoints
**In a NEW terminal window:**
```bash
python3 test_api.py
```

**Expected**: All API tests should pass

---

## ☑️ Step 7: Try the Features (10 minutes)

### 7.1 Test CLI Commands
```bash
# Get help
python3 cli.py --help

# Show a standard
python3 cli.py show ELA06.RLa

# List standards
python3 cli.py list ela --grade 6
```

### 7.2 Test AI Features (Requires API Key)
```bash
# Chat with AI
python3 cli.py chat "How do I teach reading comprehension?"

# Generate a lesson plan (takes 15 seconds)
python3 cli.py lesson --subject ela --grade 6 --codes ELA06.RLa --duration 45
```

### 7.3 Try Web Interface
1. Open `centric-app.html` in your browser
2. Click "Test Connection"
3. Should show "✅ Connected to server!"
4. Try clicking "Health Check" button

---

## ☑️ Step 8: Deployment (Optional - 30 minutes)

### For Production Use

#### Option A: Run on Cloud Server
- [ ] Provision Ubuntu 22.04 server (AWS, DigitalOcean, etc.)
- [ ] SSH into server
- [ ] Install Python 3.11+
- [ ] Clone repository
- [ ] Follow Steps 2-6 above
- [ ] Configure firewall to allow port 8000
- [ ] Set up systemd service for auto-start

#### Option B: Run with Docker
```bash
# Build Docker image
docker build -t centric-app .

# Run container
docker run -p 8000:8000 --env-file .env centric-app
```

---

## ✅ Verification Checklist

Run through this checklist to ensure everything works:

### Core Functionality
- [ ] Server starts without errors
- [ ] Can access http://localhost:8000/docs in browser
- [ ] Health check endpoint returns "healthy"
- [ ] Can list subjects (shows 4 subjects)
- [ ] Can list grades (shows 1-12)
- [ ] Can retrieve a standard by code
- [ ] All standards load (ELA, Math, Science, Social Studies)

### AI Features (Requires API Key)
- [ ] Chat command returns responses
- [ ] Lesson plan generation works (takes 10-20 seconds)
- [ ] Student work assessment works
- [ ] Standards search works
- [ ] Activity generation works

### Web Interface
- [ ] HTML file opens in browser
- [ ] Connection test passes
- [ ] Quick test buttons work
- [ ] Lesson plan generator works
- [ ] Chat interface works

---

## 🐛 Troubleshooting

### Problem: "Module not found" error
**Solution**:
```bash
pip install -r requirements.txt
# or
pip3 install -r requirements.txt
```

### Problem: "API key is invalid"
**Solution**:
1. Check your `.env` file
2. Make sure key starts with `sk-ant-`
3. No extra spaces before or after the key
4. Key is on the line `ANTHROPIC_API_KEY=sk-ant-...`

### Problem: "Standards file not found"
**Solution**:
```bash
unzip "Centric Courses Strand.zip" -d extracted_data
ls extracted_data/  # Should show 4 .xlsx files
```

### Problem: "Port 8000 already in use"
**Solution**:
```bash
# Find what's using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>

# Or change the port in .env
PORT=8001
```

### Problem: "Cannot connect to localhost:8000"
**Solution**:
1. Make sure server is running: `python3 main.py`
2. Try http://127.0.0.1:8000 instead
3. Check firewall settings

### Problem: AI features are slow
**Solution**: This is normal! AI generation takes:
- Chat: 3-8 seconds
- Assessment: 5-10 seconds
- Lesson plans: 10-20 seconds
- Search: 5-10 seconds

---

## 📞 Getting Help

### Documentation
1. **README.md** - User guide
2. **ARCHITECTURE.md** - Technical details
3. **HANDOFF_GUIDE.md** - Complete project overview
4. **TEST_RESULTS.md** - Test documentation

### Online Resources
- Anthropic Docs: https://docs.anthropic.com
- FastAPI Docs: https://fastapi.tiangolo.com
- Python Docs: https://docs.python.org

### Community
- GitHub Issues: Report bugs or request features
- Stack Overflow: Search for Python/FastAPI questions

---

## ⏱️ Estimated Time

- **Minimum Setup**: 20 minutes (Steps 1-6)
- **With Testing**: 35 minutes (Steps 1-7)
- **Full Deployment**: 1-2 hours (Steps 1-8)

---

## 🎉 Success!

If you've completed all the checkboxes above, you now have:
✅ A fully functional AI educational assistant
✅ Access to 672+ educational standards
✅ The ability to generate lesson plans, assessments, and more
✅ Both CLI and web interfaces working

**Next**: Share the app with teachers and start using it!

---

**Document Version**: 1.0
**Last Updated**: November 15, 2025

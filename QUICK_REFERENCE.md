# Centric Learning Agent - Quick Reference Card

Print this page for easy reference!

---

## 🚀 Starting the Server

```bash
cd Centric-App
python3 main.py
```

Server URL: `http://localhost:8000`
Documentation: `http://localhost:8000/docs`

---

## 💻 CLI Commands

### Generate Lesson Plan
```bash
python3 cli.py lesson --subject ela --grade 6 --codes ELA06.RLa --duration 45
```

### Assess Student Work
```bash
python3 cli.py assess --subject ela --grade 6 --code ELA06.RLa --work "Student answer here"
```

### Search Standards
```bash
python3 cli.py search "reading comprehension" --subject ela --grade 6
```

### Generate Activities
```bash
python3 cli.py activities ELA06.RLa --level level_2
```

### Chat with AI
```bash
python3 cli.py chat "Your teaching question here"
```

### Show Standard Details
```bash
python3 cli.py show ELA06.RLa
```

### List All Standards
```bash
python3 cli.py list ela --grade 6
```

---

## 🌐 API Endpoints

**Base URL**: `http://localhost:8000/api/v1`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Server health check |
| `/subjects` | GET | List all subjects |
| `/grades` | GET | List all grades |
| `/standards/{subject}` | GET | Get all standards for subject |
| `/standard/{code}` | GET | Get specific standard |
| `/search` | POST | Search standards (AI) |
| `/lesson-plan` | POST | Generate lesson plan (AI) |
| `/assess` | POST | Assess student work (AI) |
| `/activities/{code}/{level}` | GET | Generate activities (AI) |
| `/chat` | POST | Chat with AI |

---

## 📝 Common Standard Codes

### ELA (English Language Arts)
- `ELA06.RLa` - Reading Literature (Grade 6)
- `ELA07.RIa` - Reading Informational (Grade 7)
- `ELA08.AWa` - Argumentative Writing (Grade 8)

### Math
- `MAT06.RPa` - Ratios & Proportions (Grade 6)
- `MAT07.NSa` - Number System (Grade 7)

### Science
- `SCI06.SPMa` - Structure/Properties of Matter (Grade 6)
- `SCI07.SFa` - Structure & Function (Grade 7)

### Social Studies
- `SS06.DQa` - Developing Questions (Grade 6)
- `SS07.DQa` - Developing Questions (Grade 7)

---

## 🎯 Subject Codes

| Code | Subject |
|------|---------|
| `ela` | English Language Arts |
| `math` | Mathematics |
| `science` | Science |
| `social_studies` | Social Studies |

---

## 📊 Proficiency Levels

| Level | Description |
|-------|-------------|
| `level_1` | Beginning/Emerging |
| `level_2` | Intermediate/Proficient |
| `level_3` | Advanced/Exceeding |

---

## 🔧 Troubleshooting

### Server won't start
```bash
# Check if port 8000 is in use
lsof -i :8000

# Kill existing process
kill -9 <PID>
```

### Can't connect to server
- Make sure server is running: `python3 main.py`
- Try `http://127.0.0.1:8000` instead of `localhost`

### API key error
- Check `.env` file has: `ANTHROPIC_API_KEY=sk-ant-...`
- No spaces before or after the key
- Key must start with `sk-ant-`

### Standards not loading
```bash
# Extract data files
unzip "Centric Courses Strand.zip" -d extracted_data
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `main.py` | Start API server |
| `cli.py` | Command-line interface |
| `centric-app.html` | Web interface |
| `.env` | Configuration (API key here!) |
| `requirements.txt` | Python dependencies |
| `README.md` | Full documentation |

---

## 💰 Cost Reference

| Action | Estimated Cost |
|--------|----------------|
| Health Check | $0 (free) |
| List Subjects | $0 (free) |
| Get Standard | $0 (free) |
| Chat | $0.002-0.01 |
| Assess Work | $0.005-0.02 |
| Search | $0.01-0.03 |
| Lesson Plan | $0.02-0.05 |
| Generate Activities | $0.01-0.03 |

**Monthly**: $2-5 (light), $10-25 (medium), $40-100 (heavy)

---

## ⏱️ Response Times

| Feature | Expected Time |
|---------|---------------|
| Health Check | Instant |
| List/Get Standards | <1 second |
| Chat | 3-8 seconds |
| Assess | 5-10 seconds |
| Search | 5-10 seconds |
| Lesson Plan | 10-20 seconds |
| Activities | 5-15 seconds |

---

## 🌐 Web Interface Shortcuts

**Open in Browser**: Double-click `centric-app.html`

**Test URLs to Try**:
- `http://localhost:8000/api/v1`
- `http://127.0.0.1:8000/api/v1`
- `http://0.0.0.0:8000/api/v1`

---

## 📞 Getting Help

### Documentation
- Quick Start: `README.md`
- Full Guide: `HANDOFF_GUIDE.md`
- Setup Help: `SETUP_CHECKLIST.md`
- Executive Summary: `EXECUTIVE_SUMMARY.md`
- Technical Docs: `ARCHITECTURE.md`
- Test Results: `TEST_RESULTS.md`

### Commands
```bash
# Get CLI help
python3 cli.py --help

# Run tests
python3 test_basic.py
python3 test_api.py

# View API docs
open http://localhost:8000/docs
```

---

## ✅ Daily Checklist

### Starting Your Day
- [ ] Start server: `python3 main.py`
- [ ] Verify connection: `curl http://localhost:8000/api/v1/health`
- [ ] Open web interface or use CLI

### Before Shutting Down
- [ ] Save any important outputs
- [ ] Stop server: `Ctrl+C` in terminal
- [ ] Check API usage if tracking costs

---

## 🎨 Example Workflows

### Workflow 1: Create a Lesson Plan
1. Start server: `python3 main.py`
2. Run command:
   ```bash
   python3 cli.py lesson --subject ela --grade 6 \
     --codes ELA06.RLa --duration 45 \
     --context "Focus on character analysis"
   ```
3. Wait 15 seconds
4. Copy output to your lesson plan document

### Workflow 2: Grade Student Work
1. Open web interface: `centric-app.html`
2. Go to "Assess Work" tab
3. Select subject and grade
4. Enter standard code
5. Paste student work
6. Click "Assess Work"
7. Copy feedback to share with student

### Workflow 3: Find Relevant Standards
1. Use CLI:
   ```bash
   python3 cli.py search "poetry analysis" --subject ela --grade 8
   ```
2. Review results
3. Use codes in lesson planning

---

**Print this page and keep it handy!**

---

**Version**: 1.0
**Last Updated**: November 15, 2025

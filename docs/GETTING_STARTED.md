# Getting Started with Homeschool Lesson Builder

## Quick Start Guide

This guide will help you get the Homeschool Lesson Builder up and running on your local machine.

## Prerequisites

Before you begin, make sure you have:

- **Node.js** version 18 or higher ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)
- Terminal/Command prompt access

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/blackandyellowenterprise/Centric-App.git
cd Centric-App
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Parse TEKS Data

This step converts the Texas TEKS standards from CSV to JSON format:

```bash
npm run parse-teks
```

You should see output like:
```
📖 Parsing Mathematics...
📖 Parsing Science...
✅ TEKS parsing complete!
```

#### Start the Backend Server

```bash
npm run dev
```

The backend will start on `http://localhost:3000`

You should see:
```
🚀 Server running on http://localhost:3000
📚 Environment: development
```

### 3. Frontend Setup

Open a new terminal window/tab:

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Start the Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Open the Application

Open your web browser and navigate to:
```
http://localhost:5173
```

## Testing the Application

### Generate Your First Lesson

1. Select **Kindergarten** for grade
2. Choose **Mathematics** for subject
3. Enter **1** for week number
4. Add interests like "dinosaurs, building blocks"
5. Click **Generate Lesson Plan**

### What You Should See

After a few seconds, you'll see:
- A complete lesson plan with TEKS standards
- 5-day weekly breakdown
- Teacher and kid instructions
- Links to free educational resources
- Toggle between Parent and Kid versions

## Common Issues

### Backend won't start

**Problem:** "Address already in use"
**Solution:** Another process is using port 3000. Either:
- Stop the other process
- Change the port in `backend/.env` or `backend/src/server.js`

### Frontend won't connect to backend

**Problem:** "Network error" when generating lessons
**Solution:**
- Make sure backend is running on port 3000
- Check browser console for errors
- Verify proxy settings in `frontend/vite.config.js`

### TEKS parsing errors

**Problem:** Some subjects show parsing errors
**Solution:**
- This is normal for some CSV format variations
- As long as some subjects parse successfully, the app will work
- You can still generate lessons for successfully parsed subjects

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- **Frontend:** Changes automatically refresh in browser
- **Backend:** Uses nodemon to restart on file changes

### Viewing API Responses

Test the API directly:
```bash
# Health check
curl http://localhost:3000/health

# Get subjects
curl http://localhost:3000/api/teks/subjects

# Generate demo lesson
curl http://localhost:3000/api/lessons/demo
```

### Browser DevTools

- Open DevTools (F12) to see:
  - Network requests
  - Console logs
  - React component tree

## Next Steps

Once you have the app running:

1. **Explore Different Subjects**: Try generating lessons for Science, Social Studies, etc.
2. **Test Different Weeks**: See how pacing changes throughout the year
3. **Add Interests**: Experiment with different student interests
4. **Review the Code**: Check out the architecture in `ARCHITECTURE.md`
5. **Customize**: Modify pacing guides, add new resources, or adjust styling

## Production Deployment

For deploying to production, see:
- `docs/DEPLOYMENT.md` (coming soon)
- Consider using:
  - **Frontend**: Vercel, Netlify, or GitHub Pages
  - **Backend**: Railway, Render, or Heroku
  - **Database**: PostgreSQL on Railway or Supabase

## Getting Help

If you encounter issues:

1. Check the logs in both terminal windows
2. Review the `README.md`
3. Check existing GitHub issues
4. Open a new issue with:
   - Your Node.js version (`node --version`)
   - Error messages
   - Steps to reproduce

## Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Vite Guide](https://vitejs.dev/guide/)

---

Happy lesson planning!

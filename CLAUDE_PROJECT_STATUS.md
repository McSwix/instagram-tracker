# Instagram Tracker - Project Status

## Last Updated: January 16, 2025

## Project Overview
A web-based Instagram analytics dashboard that tracks followers, following, unfollowers, and comment engagement. Data is stored in Firebase Firestore.

## Tech Stack
- HTML/CSS/JavaScript (vanilla)
- Tailwind CSS (via CDN)
- Firebase Firestore for data storage
- Chart.js for analytics charts
- JSZip for ZIP file extraction
- Inter font (Google Fonts)

## Files
- `index.html` - Main dashboard
- `upload.html` - Data upload page (supports ZIP and individual JSON files)
- `analytics.html` - Growth charts and insights
- `history.html` - Upload history timeline

## Current Features (All Complete)

### Core Features
- Upload Instagram data export (followers, following)
- Track who doesn't follow you back
- Track who you don't follow back (fans)
- Track mutual followers
- Detect unfollowers between uploads
- Detect new followers between uploads

### Comments Tracking (New)
- Upload comment files (post_comments_1.json, etc.)
- Track "wasted engagement" - comments on accounts who don't follow you
- **Filtered to last 30 days only** (based on timestamp)
- **Excluded accounts:** `foreverfitchristine`, `foreverfitchris`
- Shows comment count per account, sorted by most comments

### ZIP Upload (New)
- Upload the ZIP file directly from Instagram
- Auto-extracts and finds: followers_*.json, following.json, post_comments_*.json
- No need to manually extract files

### UI/Design (New)
- Dark gradient theme (purple/blue) inspired by flick.social
- Glassmorphic cards with blur effects
- Inter font throughout
- Mobile responsive with hamburger menu
- Custom scrollbars

## Firebase Configuration
- Project: instagram-tracker-fda0e
- Collection: `snapshots`
- Each snapshot contains: followers[], following[], comments[], timestamp, counts

## Password Protection
- All pages require password: `chrisfit`
- Stored in sessionStorage

## GitHub Repository
- URL: https://github.com/McSwix/instagram-tracker
- Branch: master
- Last pushed: January 16, 2025

## What's NOT in the Code
- Test data (stored in Firebase, not in files)
- No sensitive credentials exposed (Firebase config is client-side safe)

## Potential Future Enhancements
- None currently requested

## Notes
- The 30-day filter for comments uses Unix timestamps from the Instagram export
- Comments are optional - the dashboard works without them
- The "Total Comments Tracked" shows all-time count
- The "Wasted Comments (30 Days)" shows only recent comments on non-followers

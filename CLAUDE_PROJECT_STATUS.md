# Instagram Tracker - Project Status

## Last Updated: January 28, 2025

## Project Overview
A web-based Instagram analytics dashboard that tracks followers, following, unfollowers, and comment engagement. Data is stored in Firebase Firestore, hosted on GitHub Pages.

## Tech Stack
- HTML/CSS/JavaScript (vanilla)
- Custom CSS design system (`styles/main.css`)
- Firebase Firestore for data storage
- Chart.js for analytics charts
- JSZip for ZIP file extraction
- Syne + DM Sans fonts (Google Fonts)

## Files
- `index.html` - Main dashboard with stat cards + slide-out drawer
- `upload.html` - Data upload page (ZIP and individual JSON files)
- `analytics.html` - Goal tracker, growth charts, weekly insights
- `history.html` - Upload history timeline
- `styles/main.css` - Design system (colors, typography, components)
- `js/components.js` - Reusable UI components (kept for reference, inlined in HTML)

## Design System (January 2025 Redesign)
- **Colors**: Instagram gradient (orange #F58529 → pink #DD2A7B → purple #8134AF → blue #515BD4)
- **Typography**: Syne (display/headings), DM Sans (body text)
- **Effects**: Glass morphism, backdrop blur, gradient borders
- **Theme**: Dark mode with deep purple/black backgrounds

## Current Features

### Dashboard (index.html)
- Stat cards showing: Followers, Following, Not Following Back, Mutual
- **Clickable stat cards** → opens slide-out drawer with full list
- Quick Actions grid: Your Fans, Lost & Following, Wasted Comments, Unfollow List
- Changes cards: Lost Followers, New Followers (since last upload)
- Comments stats: Total tracked, Wasted (last 30 days)
- Drawer includes search functionality and "View" buttons to Instagram profiles

### Upload Page (upload.html)
- Drag-and-drop ZIP upload (primary method)
- Individual file upload: followers, following, comments
- Shows file count when multiple files detected (e.g., "3 files found")
- Progress bar during ZIP processing
- **Delete Last Upload** button to remove test/accidental uploads
- Success animations and toast notifications

### Analytics Page (analytics.html)
- **Goal Tracker** with circular progress indicator
- Set/edit follower goal via modal
- Projected date to reach goal based on growth rate
- Growth Over Time chart (followers + following)
- Weekly Growth bar chart (green = gains, red = losses)
- Growth Insights cards with contextual advice
- Best/worst week badges

### History Page (history.html)
- Timeline visualization with gradient line
- Each upload shows: followers, following, ratio, net change
- New/lost followers listed per upload
- Relative time badges ("Today", "2 days ago", etc.)

### Comments Tracking
- Upload comment files (post_comments_1.json, etc.)
- Track "wasted engagement" - comments on accounts who don't follow you
- Filtered to last 30 days (based on timestamp)
- Excluded accounts: `foreverfitchristine`, `foreverfitchris`

## Mobile Responsiveness
- All pages fully responsive
- Mobile navigation menu (hamburger)
- Touch-friendly tap targets (44px minimum)
- Safe area insets for notched phones (iPhone X+)
- Password inputs: `autocapitalize="off"` to prevent auto-capitalization

## Password Protection
- All pages require password: `chrisfit`
- Styled modal (not browser prompt)
- Stored in sessionStorage
- Mobile-friendly: no auto-capitalization, no autocorrect

## Firebase Configuration
- Project: instagram-tracker-fda0e
- Collection: `snapshots`
- Each snapshot: followers[], following[], comments[], timestamp, counts

## Hosting & Deployment
- **GitHub Pages** serves the website from `main` branch
- Repository: https://github.com/McSwix/instagram-tracker
- To deploy: Push changes to `main` branch, GitHub Pages auto-rebuilds (~1-2 min)
- Firebase Firestore (database) runs independently - no deployment needed

## Deployment Workflow
1. Make code changes locally
2. `git add <files>` and `git commit -m "message"`
3. `git push origin master:main` (pushes master to main branch)
4. Wait 1-2 minutes for GitHub Pages to rebuild
5. Changes are live!

## Recent Changes (January 28, 2025)
- Complete UI redesign with Instagram gradient theme
- Replaced tabs with clickable stat cards + slide-out drawer
- Added goal tracker with circular progress to Analytics
- Added weekly growth bar chart
- Added "Delete Last Upload" feature
- Improved mobile responsiveness across all pages
- Fixed password input auto-capitalization on mobile
- Inlined JS components to fix CORS issues with file:// protocol

## Potential Future Enhancements
- None currently requested

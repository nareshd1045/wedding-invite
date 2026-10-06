# 💍 Naresh 💕 Sabitha — Wedding Invitation Web Application

A responsive, single-page wedding invitation web application built with HTML5, CSS3, and vanilla JavaScript. Features a royal Indian wedding palette, custom cartoon vector artwork, a real-time countdown timer, ambient background melodies, falling flower petals, interactive directions, Google Calendar sync, and direct WhatsApp RSVP integration.

---

## ✨ Features & Highlights

1. **👑 Royal Indian Cultural Aesthetic**:
   - Palette: Deep Crimson/Maroon (`#800020`), Warm Gold (`#D4AF37`), Ivory/Cream (`#FAF7F2`), and Terracotta & Rose Gold accents.
   - Typography: Google Fonts (*Cinzel* & *Playfair Display* for regal headings, *Montserrat* for clear legible body text).
   - Glassmorphism card overlays, gold foil borders, and auspicious emblems (*Om Sri Ganeshaya Namaha* / *சுபமுகூர்த்த நல்வாழ்த்துகள்*).

2. **⏳ Interactive Live Countdown Timer**:
   - Accurately tracks Days, Hours, Minutes, and Seconds until the auspicious Muhurtham on **November 11, 2026 at 6:00 AM IST**.

3. **🎨 3 Distinct Wedding Event Cards with Custom Vector Artwork**:
   - **Reception 1 (Nov 10, 2026 | 6:30 PM – 8:30 PM)**:
     - Venue: *Thirumurugan Marriage Mahal, Thaalapathi, Kunnathur*
     - Artwork: Cute cartoon illustration of Groom in Indo-Western outfit & Bride in designer Lehenga (`assets/reception1.svg`).
     - Action: One-tap Google Directions link + Google Calendar reminder.
   - **Marriage Ceremony / Muhurtham (Nov 11, 2026 | 6:00 AM – 7:00 AM)**:
     - Venue: *Thaalapathi Murugan Temple*
     - Artwork: Traditional Tamil wedding cartoon illustration of Groom in Veshti & Silk shirt, Bride in Kanjeevaram Silk Saree with Thali motif and temple lamps (`assets/muhurtham.svg`).
     - Action: One-tap Google Directions link + Google Calendar reminder.
   - **Reception 2 (Nov 12, 2026 | 6:30 PM – 8:30 PM)**:
     - Venue: *KVN Mahal, Coimbatore*
     - Artwork: Cartoon illustration of Groom in sharp Wedding Tuxedo Suit & Bride in Western Wedding Gown with bouquet (`assets/reception2.svg`).
     - Action: One-tap Google Directions link + Google Calendar reminder.

4. **📱 Contact & Direct WhatsApp Integration**:
   - **Groom Side**: Dhanabal (`+916385811549`) with pre-filled WhatsApp link & direct phone call button.
   - **Bride Side**: Varadharajan (`+919442647977`) with pre-filled WhatsApp link & direct phone call button.

5. **🌸 Interactive Delighters**:
   - **Petal Shower**: Toggleable falling flower petals (roses, marigolds, and jasmines) on HTML5 canvas.
   - **Auspicious Melodies**: Built-in Web Audio API synthesizer playing traditional *Raag Mohanam / Bhupali* flute and tanpura drone (works offline with zero external audio dependencies!), plus support for custom MP3s.
   - **Guest Blessings Book**: Live guestbook powered by `localStorage` allowing guests to leave warm wishes.
   - **Add to Calendar**: 1-click addition to Google Calendar with preset timings and locations.
   - **Share Invitation**: Native mobile Web Share API + WhatsApp share link + 1-click clipboard copy.

---

## 📁 File Structure

```text
WeddingInvite/
├── index.html            # Main single-page HTML application
├── css/
│   └── styles.css        # Responsive styling, gold foil effects, mobile-first design
├── js/
│   └── app.js            # Countdown timer, petal canvas, audio engine, scroll reveals, RSVP
├── assets/
│   ├── ganesha.svg       # Auspicious Ganesha emblem
│   ├── reception1.svg    # Indo-Western & Lehenga couple illustration
│   ├── muhurtham.svg     # Traditional Tamil wedding couple illustration
│   └── reception2.svg    # Tuxedo suit & Western gown couple illustration
└── README.md             # Documentation
```

---

## 🚀 How to Run

### Method 1: Instant Browser View (Zero Setup)
Simply double-click `index.html` to open it in Google Chrome, Microsoft Edge, Safari, or Firefox.

### Method 2: Local HTTP Server (Recommended for testing mobile devices)
Using Python or Node.js in PowerShell/terminal:

```powershell
# Using Node.js (npx serve)
npx serve .

# Or using Python (if installed)
python -m http.server 8080
```
Then navigate to `http://localhost:8080` (or the port indicated).

---

## 🌐 Hosting & Deployment
This website is 100% static with zero backend dependencies, making it ready to deploy on:
- **GitHub Pages**: Push this directory to a GitHub repository and turn on Pages under *Settings > Pages*.
- **Netlify**: Drag and drop the `WeddingInvite` folder onto [Netlify Drop](https://app.netlify.com/drop).
- **Vercel**: Run `npx vercel` or import the GitHub repository.


# Walkthrough - Week 3: JavaScript Interactive Portfolio

This document outlines the modifications made to build an interactive, responsive personal portfolio website utilizing HTML5, CSS3, and modern client-side JavaScript.

---

## 🛠️ Changes Implemented

### 1. Unified External Scripting Setup
- **File**: [script.js](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/script.js) (NEW)
- Linked deferred script inside the `<head>` of [index.html](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/index.html) to allow non-blocking DOM parsing.
- Migrated all inline scripting (theme-toggling, mobile slide menu, and contact form feedback) from the html structure to the external module.

### 2. FAQ Accordion (Collapsible Panels)
- **Files**: [index.html](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/index.html), [style.css](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/style.css), [script.js](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/script.js)
- Added semantic structures representing FAQs inside a new page section `#faq`.
- Styled cards using glassmorphic properties and custom transitions.
- Implemented accordion toggling logic in `script.js` based on `scrollHeight` calculations, enabling smooth slide transitions. Automatically collapses neighboring cards when a new one is clicked.

### 3. Project Spotlight Carousel (Slider)
- **Files**: [index.html](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/index.html), [style.css](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/style.css), [script.js](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/script.js)
- Refactored the projects grid to a sliding track layout wrapped inside relative viewport containers.
- Implemented absolute-positioned overlay controls (arrows) with glassmorphism hover transitions.
- Coded horizontal layout translation calculations in JavaScript (`transform: translateX()`), supporting prev/next controls, wrap-around index safety limits, and dot indicators.

### 4. Interactive Development Task Planner (To-Do List)
- **Files**: [index.html](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/index.html), [style.css](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/style.css), [script.js](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/script.js)
- Designed a sandbox playground card `#playground` for task tracking.
- Set up form element controls and list trackers.
- Implemented dynamic creation of element nodes in memory with tick and delete handlers.
- Coded data preservation logic using `JSON.stringify` / `JSON.parse` synced with `localStorage`.
- Added elegant transition animations (`todoScaleIn` and `todoScaleOut`) with transition delays matching DOM manipulation cycles.

### 5. Real-Time Contact Form Validation
- **Files**: [index.html](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/index.html), [style.css](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/style.css), [script.js](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/script.js)
- Embedded individual warning message elements (`<span class="error-message">`) below inputs.
- Coded real-time validation checks bound to field input changes and blur transitions.
- Added visual focus state styling (cyan border glows for valid inputs, red border glows for invalid inputs).
- Intercepted submit actions: validating name length, email format (regex checks), and message length. Aborts submit if any fail, displays alerts, and directs focus to the first invalid field.

---

## 🧪 Verification Summary

All modules have been manually tested for functional correctness:
- **Theme Toggling**: Persists choices correctly across page loads.
- **Accordion Panels**: Toggles open and closed. Collapses neighboring panels.
- **Projects Slider**: Smoothly shifts slides. Arrows and indicators work.
- **Task Planner**: Tasks add and delete with clean animations and persist upon refreshing.
- **Form Validation**: Fields show validation errors on blur or typing, and prevent submit if fields are invalid. Shows success banner on valid inputs.

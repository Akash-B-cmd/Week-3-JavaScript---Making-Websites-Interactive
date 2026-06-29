# Week 3: Interactive Portfolio Website

A highly aesthetic, premium, and fully responsive single-page personal portfolio website built with semantic **HTML5**, modern **CSS3**, and interactive **JavaScript**. It features client-side state management, theme persistence, form validation, and interactive demo widgets.

---

## 🌟 Key Features

1. **Dual-Theme Manager**: A toggler utilizing CSS custom properties, styled SVG icons (Sun/Moon), and local state storage (`localStorage`) to preserve light or dark mode selections across sessions.
2. **Mobile Drawer Navigation**: Responsive slide-out hamburger navigation drawer transitioning on viewport boundaries, automatically dismissing links on click or screen defocus.
3. **FAQ Accordion Accord (Show/Hide)**: Smooth collapsible question blocks transitioning on calculated scroll heights and rotating chevron indicators, utilizing accordion grouping logic to automatically collapse siblings.
4. **Project Spotlight Slider (Carousel)**: A client-side image slider showcasing mockups with hardware-accelerated horizontal CSS translations, next/prev arrow buttons, and synchronized dot indicators.
5. **Developer To-Do Planner (Task Widget)**: A playground utility allowing users to plan items, check off completed steps, and delete items. Employs entry/exit cubic-bezier scale animations and persists items to `localStorage` under a private key.
6. **Real-time Form validation**: Field-specific error warnings appearing below fields during active user inputs or cursor blur events, displaying custom alerts and validating constraints before blocking or allowing submissions.

---

## 📂 Project Structure

```text
Week 3 Portfolio/
│
├── index.html            # Core layout, semantic HTML structure & custom sections
├── style.css             # Design tokens, variables, custom transitions, layout styles
├── script.js             # Client-side JavaScript handlers (FAQ, Todo list, Validation, etc.)
├── README.md             # Project documentation and submission guide
│
├── images/               # Media asset library
│   ├── profile.png       # Professional developer avatar
│   ├── project1.png      # Agency Landing Page project screenshot
│   ├── project2.png      # Analytics Dashboard mockup
│   └── project3.png      # Mobile E-commerce UI mockup
│
└── screenshots/          # Proof-of-work documentation screenshots
    ├── desktop-dark.png  # Desktop layout (default Dark theme)
    ├── desktop-light.png # Desktop layout (Light theme toggled)
    ├── mobile-nav-open.png # Mobile drawer navigation open
    ├── mobile-light.png  # Mobile layout in Light theme
    └── form-submission.png # Contact form success notification
```

---

## 🚀 Setup & Local Execution Instructions

To launch the portfolio website locally:

1. **Clone/Download** the repository folder to your local computer.
2. **Launch in Browser**:
   - Double-click the [index.html](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20(wt)/index.html) file to open it in Chrome, Firefox, Edge, or Safari.
   - Alternatively, drag-and-drop the file into a browser tab.
3. **Developer Environment (Recommended)**:
   - Open the directory in **VS Code**.
   - Install the **Live Server** extension.
   - Right-click `index.html` and select **Open with Live Server** to view hot-reloads of changes.

---

## 🛠️ Technical Details & JS Architecture

### 1. Script Loading & Event Listeners
The project uses the modern `<script src="script.js" defer></script>` strategy in the `<head>` of the page. This guarantees:
- **Non-blocking parsing**: The browser continues rendering HTML layout blocks while the script downloads.
- **Ordered Execution**: The scripts execute after the DOM structure is fully loaded, hooked into the `DOMContentLoaded` event listener:
  ```javascript
  document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      initMobileMenu();
      initFAQ();
      initProjectSlider();
      initTodoPlayground();
      initFormValidation();
  });
  ```

### 2. State & Storage Synchronization
User preferences and planner items are persisted locally in the user's browser using the **Web Storage API**:
- **Theme Selection**: Stored under `'theme'` as a simple string value (`'light'` or `'dark'`). It is retrieved during initial parsing and set as an attribute on the root tag (`data-theme`).
- **To-Do Tasks**: Stored under `'portfolio_tasks'` as a serialized JSON string array. Functions stringify the data structure for persistence and parse it back upon page load.
  ```javascript
  // Read state
  const stored = localStorage.getItem('portfolio_tasks');
  tasks = stored ? JSON.parse(stored) : [];

  // Write state
  localStorage.setItem('portfolio_tasks', JSON.stringify(tasks));
  ```

### 3. DOM Manipulation & Animation Handlers
- **FAQ Collapsible**: Calculated via scrollHeight properties:
  `faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';`
  This dynamically adjusts for varying content sizes without hardcoding height values, ensuring high performance.
- **To-Do Elements**: List items are generated in memory (`document.createElement`) and appended dynamically.
- **Transitions & CSS Transitions**: Adding tasks leverages the `.adding` class which fires a scale-up animation (`todoScaleIn`). Deletions apply a `.removing` class firing scale-down animations (`todoScaleOut`) and defer the `.remove()` DOM query via `setTimeout` to match the animation timer:
  ```javascript
  li.classList.add('removing');
  setTimeout(() => { li.remove(); }, 300);
  ```

### 4. Custom Client-Side Form Validation
The email validation enforces RFC standards via regex validations:
`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

Real-time feedback is driven by input and blur events:
- **Blur**: Performs checks when user moves away from a field, immediately highlighting empty or invalid boxes.
- **Input**: Listens to changes. If a user starts typing in an invalid field and corrects it, the red border turns cyan immediately.
- **Submit**: Evaluates all form inputs. If any fail, it halts form transmission, displays inline warning labels, and moves focus to the first invalid field (`input.focus()`).

---

## 🧪 Testing Evidence & Validation

### Manual Test Cases & Validation Log

1. **Theme Switching & Storage**
   - *Action*: Click the theme toggle icon.
   - *Result*: Theme toggles. Refresh page. Confirm correct theme remains active.
   - *Console*: Document attributes modify cleanly from `data-theme="dark"` to `data-theme="light"`.

2. **FAQ Accordion Expansion**
   - *Action*: Click a question card.
   - *Result*: Panel expands with a smooth slide transition. The chevron rotates 180 degrees.
   - *Action*: Click a second question card.
   - *Result*: The first card collapses automatically while the second card expands.

3. **Project Carousel Sliding**
   - *Action*: Click the next navigation arrow (`#slider-next`).
   - *Result*: Slide track shifts. The active dot shifts styles.
   - *Action*: Click the prev arrow while on slide 1.
   - *Result*: Slide wraps around to display slide 3.

4. **Task Planner Playground**
   - *Action*: Submit empty task name.
   - *Result*: Form blocks submission (HTML validation).
   - *Action*: Add task "Configure Webpack Bundler".
   - *Result*: Item slides in with animation. Badge increments to "1 task remaining".
   - *Action*: Check completion box.
   - *Result*: Card changes opacity, text strikethrough is applied, badge updates to "0 tasks remaining".
   - *Action*: Refresh browser page.
   - *Result*: Card status and text persist.
   - *Action*: Click delete button.
   - *Result*: Item scales down and fades out before being removed from the DOM.

5. **Contact Form Validation**
   - *Action*: Click submit on blank form.
   - *Result*: Prevented. Red error texts show beneath all fields. Form focuses on the "Name" input box.
   - *Action*: Enter Name and click outside.
   - *Result*: Field border turns cyan. Warning disappears.
   - *Action*: Enter invalid email "alex@".
   - *Result*: Validation fails. Error message shifts to: "Please enter a valid email address."

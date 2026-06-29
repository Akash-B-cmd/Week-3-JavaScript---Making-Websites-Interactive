# Implementation Plan - JavaScript Interactive Portfolio

This plan details the technical changes required to complete the **Week 3 JavaScript** curriculum requirements for the personal portfolio. It involves migrating inline scripts to an external `script.js` file, adding five interactive features, and enhancing styling and accessibility.

## User Review Required

> [!NOTE]
> The existing theme-toggling, mobile menu, and contact form handling currently run via inline HTML scripts. This plan migrates all logic to a clean, external module (`script.js`) and introduces three new interactive components (FAQ accordion, project slider, and a to-do playground).

> [!IMPORTANT]
> The image slider will be implemented as a spotlight carousel in the **My Projects** section, displaying one project at a time with smooth translation animations, arrow overlays, and dot indicators. This enhances responsiveness and focuses user attention.

---

## Open Questions

*No open questions are identified at this time, as the requirements are clear and align perfectly with the existing style system.*

---

## Proposed Changes

### Portfolio Codebase

#### [NEW] [script.js](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/script.js)
- Implement self-invoking or initialization routines for all interactive modules.
- **Theme Manager**: Manage the `'light'`/`'dark'` theme states using the HTML root `data-theme` attribute and persist the choice to `localStorage`.
- **Mobile Menu**: Manage classes on the hamburger trigger and nav overlay to slide the menu drawer.
- **Accordion (FAQ)**: Toggle panel visibility (using heights and opacities) on click.
- **Project Slider**: Manage active index, handle translations on the slider track, support button clicks, and sync indicator dots.
- **To-Do Playground**:
  - Handle task addition, completion toggling, and deletion.
  - Animate item insertion/removal.
  - Persist list state in `localStorage` under a `'portfolio_tasks'` key.
- **Real-time Form Validation**:
  - Attach `input` and `blur` listeners to inputs.
  - Check constraints (email formats, field length, empty fields).
  - Inject field-specific, accessible error messages dynamically.

#### [MODIFY] [index.html](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/index.html)
- Remove inline `<script>` tags near the closing body tag.
- Link the external [script.js](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/script.js) with the `defer` attribute.
- Add structural markup for the **FAQ Accordion** below the About Me section.
- Restructure the **Projects Gallery** into a responsive Slider layout with navigation controls.
- Add structural markup for the **Interactive Playground** (To-Do List) below the Skills section.
- Update the **Contact Form** elements with dedicated warning blocks for individual validation errors.

#### [MODIFY] [style.css](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/style.css)
- Add CSS variables for validation feedback states (e.g. error reds, success greens).
- Style the **FAQ Accordion**:
  - Use transition properties for smooth dropdown expansion.
  - Handle rotation of chevrons/icons when active.
- Style the **Project Carousel/Slider**:
  - Position arrow buttons, dot navigation, and mask items with `overflow: hidden`.
  - Use CSS transform transitions for slide movements.
- Style the **To-Do Playground**:
  - Maintain the theme's glassmorphic cards, typography, and button gradients.
  - Add styles for finished task items (strikethroughs, lower opacity) and delete icons.
- Style the **Form Error Indicators**:
  - Place field-level error messages directly below input fields.
  - Adjust heights, font-weights, and animation entrances for error prompts.

#### [MODIFY] [README.md](file:///c:/Users/24r11/OneDrive/Documents/Week%201%20%28wt%29/README.md)
- Update documentation to describe the JavaScript architecture.
- Document all manual test cases and interactive verification procedures.
- Update the project tree overview.

---

## Verification Plan

### Automated Tests
*Because this is a static frontend website, verification will be performed via manual testing, devtools audits, and console logging.*

### Manual Verification
1. **Console Verification**:
   - Verify `console.log("JavaScript initialized successfully")` appears on load.
   - Monitor for JavaScript errors during interactions.
2. **Theme Toggling**:
   - Verify theme toggle stores state in local storage.
   - Reload page and confirm settings are restored.
3. **Mobile Drawer**:
   - Confirm menu toggle slides drawer open/closed and rotates the hamburger bars.
   - Confirm clicking menu items navigates and closes the drawer.
4. **FAQ Accordion**:
   - Click questions to expand/collapse.
   - Confirm only one question opens at a time (or accordion behavior works smoothly).
5. **Project Slider**:
   - Navigate using left/right arrows.
   - Click navigation dots to skip to specific slides.
   - Test responsiveness of slider layouts.
6. **Task To-Do List**:
   - Add new items and confirm lists grow.
   - Check off items and confirm styling changes.
   - Delete items and check removal animations.
   - Refresh page to verify tasks persist.
7. **Contact Form Validation**:
   - Submit empty form; check that error messages appear below each field.
   - Type invalid inputs; confirm real-time validation warnings appear.
   - Type valid inputs; verify errors clear and borders turn cyan.
   - Submit form and verify success status.

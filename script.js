/**
 * Alex Carter | Portfolio Website Interactive JavaScript
 * Week 3: Client-side interactive scripting implementation.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript initialized successfully.");

    // Initialize all modules
    initTheme();
    initMobileMenu();
    initFAQ();
    initProjectSlider();
    initTodoPlayground();
    initFormValidation();
});

/**
 * Theme Management Module (Light / Dark Mode Toggle)
 * Uses CSS custom variables and persists user choice via localStorage
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    let currentTheme = 'dark';
    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (systemPrefersLight) {
        currentTheme = 'light';
    }

    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);

    // URL parameter overrides (for testing/documentation screenshots)
    const urlParams = new URLSearchParams(window.location.search);
    const themeParam = urlParams.get('theme');
    if (themeParam === 'light' || themeParam === 'dark') {
        document.documentElement.setAttribute('data-theme', themeParam);
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/**
 * Mobile Navigation Drawer Control
 * Handles hamburger icon animation and slide drawer toggle
 */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!mobileToggle || !navMenu) return;

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // URL parameter check for mobile screenshotting
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('menu') === 'open') {
        navMenu.classList.add('active');
        mobileToggle.classList.add('active');
    }
}

/**
 * FAQ Accordion Module (Show/Hide Content)
 * Toggles question panels using class manipulation and transition heights
 */
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.parentElement;
            const answer = card.querySelector('.faq-answer');
            const isActive = card.classList.contains('active');
            
            // Accordion behavior: close other panels
            document.querySelectorAll('.faq-card').forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                    otherCard.querySelector('.faq-answer').style.maxHeight = '0';
                    otherCard.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current panel
            if (isActive) {
                card.classList.remove('active');
                answer.style.maxHeight = '0';
                button.setAttribute('aria-expanded', 'false');
            } else {
                card.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/**
 * Project Carousel / Slider Module
 * Manages slide translation and indicator dots
 */
function initProjectSlider() {
    const track = document.getElementById('project-track');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const indicatorContainer = document.getElementById('slider-indicators');
    
    if (!track || !prevBtn || !nextBtn || !indicatorContainer) return;
    
    const slides = Array.from(track.children);
    const indicators = Array.from(indicatorContainer.children);
    
    let currentIndex = 0;
    
    function updateSlider(index) {
        // Constrain and wrap indices
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        // Translate the track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicator dots active state
        indicators.forEach((ind, i) => {
            if (i === currentIndex) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
    }
    
    // Control clicks
    prevBtn.addEventListener('click', () => {
        updateSlider(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        updateSlider(currentIndex + 1);
    });
    
    // Dot indicator clicks
    indicators.forEach((ind, i) => {
        ind.addEventListener('click', () => {
            updateSlider(i);
        });
    });
    
    // Listen for resize to recalculate height/width alignment if needed
    window.addEventListener('resize', () => {
        // Reset translation on window resize to avoid half-slide alignments
        track.style.transition = 'none';
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        // Force reflow
        track.offsetHeight;
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

/**
 * Interactive To-Do Playground Module
 * Demonstrates local storage, DOM appending, element removal, and transitions
 */
function initTodoPlayground() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    const emptyState = document.getElementById('todo-empty');
    const countBadge = document.getElementById('todo-count');
    
    if (!form || !input || !list || !emptyState || !countBadge) return;
    
    // Retrieve initial state from local storage
    let tasks = [];
    try {
        const stored = localStorage.getItem('portfolio_tasks');
        if (stored) {
            tasks = JSON.parse(stored);
        }
    } catch (e) {
        console.error("Failed to load tasks from local storage:", e);
    }
    
    // Save to local storage helper
    function saveTasks() {
        try {
            localStorage.setItem('portfolio_tasks', JSON.stringify(tasks));
        } catch (e) {
            console.error("Failed to save tasks to local storage:", e);
        }
    }
    
    // Update badge count and empty state helper
    function updateInterface() {
        const remaining = tasks.filter(t => !t.completed).length;
        countBadge.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} remaining`;
        
        if (tasks.length === 0) {
            emptyState.style.display = 'flex';
        } else {
            emptyState.style.display = 'none';
        }
    }
    
    // Simple HTML escaping helper for security
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
    
    // Render single task item element
    function createTaskElement(task) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (task.completed) {
            li.classList.add('completed');
        }
        li.dataset.id = task.id;
        
        li.innerHTML = `
            <div class="todo-item-left">
                <div class="todo-checkbox">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <span class="todo-text">${escapeHTML(task.text)}</span>
            </div>
            <button class="todo-delete-btn" aria-label="Delete task">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        `;
        
        // Toggle complete click handler
        li.querySelector('.todo-item-left').addEventListener('click', () => {
            task.completed = !task.completed;
            li.classList.toggle('completed', task.completed);
            saveTasks();
            updateInterface();
        });
        
        // Delete click handler (with fadeout animation transition)
        li.querySelector('.todo-delete-btn').addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid triggering checktoggle
            
            // Mark for transition removal
            li.classList.add('removing');
            
            // Filter array
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            
            // Remove from DOM on animation end (0.3s)
            setTimeout(() => {
                li.remove();
                updateInterface();
            }, 300);
        });
        
        return li;
    }
    
    // Initial Render of loaded tasks
    tasks.forEach(task => {
        list.appendChild(createTaskElement(task));
    });
    updateInterface();
    
    // Form submission (Add Item)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        
        const newTask = {
            id: Date.now().toString(),
            text: text,
            completed: false
        };
        
        // Push and Save
        tasks.push(newTask);
        saveTasks();
        
        // Append item with entry animation
        const element = createTaskElement(newTask);
        element.classList.add('adding');
        list.appendChild(element);
        
        // Remove class after animation resolves (0.35s)
        setTimeout(() => {
            element.classList.remove('adding');
        }, 350);
        
        // Reset form and interface elements
        input.value = '';
        updateInterface();
    });
}

/**
 * Real-time Contact Form Validation Module
 * Intercepts fields on blur and input to offer immediate feedback
 */
function initFormValidation() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const statusDiv = document.getElementById('form-status');
    
    if (!form || !nameInput || !emailInput || !messageInput) return;

    // Helper for displaying field level warnings
    function setFieldState(input, errorSpan, isValid, message) {
        if (isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            errorSpan.textContent = '';
            errorSpan.classList.remove('visible');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
            errorSpan.textContent = message;
            errorSpan.classList.add('visible');
        }
        return isValid;
    }

    // Validation definitions
    function validateName(showWarning = true) {
        const val = nameInput.value.trim();
        const isValid = val.length >= 2;
        if (showWarning || !isValid) {
            const msg = val.length === 0 ? "Name is required." : "Name must be at least 2 characters.";
            setFieldState(nameInput, nameError, isValid, msg);
        }
        return isValid;
    }

    function validateEmail(showWarning = true) {
        const val = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmpty = val.length === 0;
        const isFormatValid = emailRegex.test(val);
        const isValid = !isEmpty && isFormatValid;
        
        if (showWarning || !isValid) {
            const msg = isEmpty ? "Email is required." : "Please enter a valid email address (e.g., name@example.com).";
            setFieldState(emailInput, emailError, isValid, msg);
        }
        return isValid;
    }

    function validateMessage(showWarning = true) {
        const val = messageInput.value.trim();
        const isValid = val.length >= 10;
        if (showWarning || !isValid) {
            const msg = val.length === 0 ? "Message is required." : "Message must be at least 10 characters.";
            setFieldState(messageInput, messageError, isValid, msg);
        }
        return isValid;
    }

    // Real-time input listeners
    nameInput.addEventListener('input', () => {
        if (nameInput.classList.contains('invalid') || nameInput.classList.contains('valid')) {
            validateName(true);
        }
    });
    nameInput.addEventListener('blur', () => {
        validateName(true);
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.classList.contains('invalid') || emailInput.classList.contains('valid')) {
            validateEmail(true);
        }
    });
    emailInput.addEventListener('blur', () => {
        validateEmail(true);
    });

    messageInput.addEventListener('input', () => {
        if (messageInput.classList.contains('invalid') || messageInput.classList.contains('valid')) {
            validateMessage(true);
        }
    });
    messageInput.addEventListener('blur', () => {
        validateMessage(true);
    });

    // Form Status Banner helper
    function showSubmitStatus(message, type) {
        statusDiv.className = 'form-status ' + type;
        statusDiv.textContent = message;
        
        if (type === 'info') {
            statusDiv.style.color = 'var(--text-secondary)';
            statusDiv.style.display = 'block';
        } else if (type === 'success') {
            statusDiv.style.color = '#10b981';
            statusDiv.style.display = 'block';
        } else if (type === 'error') {
            statusDiv.style.color = '#ef4444';
            statusDiv.style.display = 'block';
        }
    }

    // Form Submission Interceptor
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Force full validation checks
        const isNameValid = validateName(true);
        const isEmailValid = validateEmail(true);
        const isMessageValid = validateMessage(true);
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            showSubmitStatus('Please correct the validation errors in the fields above.', 'error');
            
            // Focus first error field
            if (!isNameValid) nameInput.focus();
            else if (!isEmailValid) emailInput.focus();
            else if (!isMessageValid) messageInput.focus();
            
            return;
        }

        // Simulating success submit
        const nameVal = nameInput.value.trim();
        showSubmitStatus('Sending your message...', 'info');
        
        setTimeout(() => {
            showSubmitStatus(`Thank you, ${nameVal}! Your message has been sent successfully.`, 'success');
            
            // Clear values
            form.reset();
            
            // Remove styling classes
            nameInput.classList.remove('valid', 'invalid');
            emailInput.classList.remove('valid', 'invalid');
            messageInput.classList.remove('valid', 'invalid');
        }, 1200);
    });

    // Handle initial parameter overrides (for automated screenshot checks)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('form') === 'submitted') {
        nameInput.value = 'Jane Doe';
        emailInput.value = 'jane@example.com';
        messageInput.value = 'This is a test message to verify the form submission styling.';
        
        nameInput.classList.add('valid');
        emailInput.classList.add('valid');
        messageInput.classList.add('valid');
        
        showSubmitStatus('Thank you, Jane Doe! Your message has been sent successfully.', 'success');
    }
}

// ============================================
// JS V2 — Професионално оптимизиран скрипт
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    initBurgerMenu();
    initThemeToggle()
    initScrollReveal();
    initDynamicExercises();

});
function initThemeToggle() {
    const toggleBtn = document.querySelector(".theme-toggle");
    if (!toggleBtn) return;

    const root = document.documentElement;

    // 1️⃣ Проверка за запазена тема
    const saved = localStorage.getItem("theme");

    if (saved) {
        root.dataset.theme = saved;
    } else {
        // 2️⃣ Следване на системната тема
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.dataset.theme = prefersDark ? "dark" : "light";
    }

    updateThemeLabel(toggleBtn);

    // 3️⃣ Превключване при клик
    toggleBtn.addEventListener("click", () => {
        const newTheme = root.dataset.theme === "dark" ? "light" : "dark";
        root.dataset.theme = newTheme;
        localStorage.setItem("theme", newTheme);
        updateThemeLabel(toggleBtn);
    });

    // 4️⃣ Реакция при промяна на системната тема
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
        if (!localStorage.getItem("theme")) {
            root.dataset.theme = e.matches ? "dark" : "light";
            updateThemeLabel(toggleBtn);
        }
    });
}

function updateThemeLabel(button) {
    const theme = document.documentElement.dataset.theme;
    button.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}

// ============================================
// Burger Menu (със забрана за скрол на мобилни)
// ============================================

function initBurgerMenu() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");

    if (!burger || !nav) return;

    burger.addEventListener("click", () => {
        const open = burger.classList.toggle("open");
        nav.classList.toggle("open");
        document.body.classList.toggle("no-scroll", open);
    });

    nav.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            burger.classList.remove("open");
            nav.classList.remove("open");
            document.body.classList.remove("no-scroll");
        }
    });
}




// ============================================
// Scroll Reveal V2 — с автоматичен delay
// ============================================

function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        elements.forEach(el => el.classList.add("visible"));
        return;
    }

    let delayCounter = 0;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                delayCounter += 0.1;

                entry.target.style.transitionDelay = delayCounter + "s";
                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
}


// ============================================
// Dynamic Exercises Loader (по-чист код)
// ============================================

function initDynamicExercises() {
    const container = document.getElementById("exercise-list");
    if (!container) return;

    const exercises = [
        { title: "Клек с щанга", type: "Сила", level: "Средно ниво", duration: "3–4 серии по 6–8 повторения", description: "Фокус върху бедра и седалище." },
        { title: "Гребане с дъмбел", type: "Сила", level: "Начинаещ", duration: "3 × 10–12", description: "Развива гърба и задното рамо." },
        { title: "Бягане на пътека", type: "Кардио", level: "Всички нива", duration: "20–30 мин.", description: "Леко темпо, постепенно увеличение." },
        { title: "Интервално колело", type: "Кардио HIIT", level: "Напреднал", duration: "15–20 мин.", description: "30 сек. HIIT + 60 сек. възстановяване." },
        { title: "Планк", type: "Кор", level: "Всички нива", duration: "30–45 сек.", description: "Подравняване на рамене и таз, стегнат кор." },
        { title: "Разходки с тежести", type: "Функционално", level: "Средно ниво", duration: "20–30 м", description: "Укрепва захвата и кор-а." }
    ];

    container.innerHTML = exercises.map(ex => `
        <article class="exercise-card reveal">
            <div class="exercise-header">
                <h3 class="exercise-title">${ex.title}</h3>
                <span class="badge">${ex.type}</span>
            </div>
            <p class="exercise-meta">${ex.level} • ${ex.duration}</p>
            <p>${ex.description}</p>
        </article>
    `).join("");
}




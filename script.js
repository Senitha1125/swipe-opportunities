// 🔐 AUTH CHECK
window.onload = function () {
    fetch("http://127.0.0.1:5000/check-auth", {
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
        if (!data.loggedIn) {
            window.location.href = "login.html";
        }
    })
    .catch(() => {
        window.location.href = "login.html";
    });
};

// STATE
let currentDomain = "";
let currentIndex = 0;

// DATA
const data = {
    freelance: [
        { title: "Frontend Intern", desc: "HTML, CSS, JavaScript" },
        { title: "Backend Intern", desc: "Python, Flask basics" },
        { title: "UI/UX Designer", desc: "Figma, wireframing" },
        { title: "Content Writer", desc: "Blogs & social media" },
        { title: "Social Media Manager", desc: "Instagram, analytics" },
        { title: "Graphic Designer", desc: "Canva, posters, branding" },
        { title: "SEO Intern", desc: "Keyword research & optimization" },
        { title: "Video Editor", desc: "Reels and short-form content" },
        { title: "Web Tester", desc: "Manual testing & bug reports" },
        { title: "Data Entry Intern", desc: "Excel and documentation" }
    ],

    project: [
        { title: "Weather App", desc: "API-based JavaScript project" },
        { title: "Expense Tracker", desc: "Track income and expenses" },
        { title: "Todo App", desc: "CRUD with local storage" },
        { title: "Chat Application", desc: "Real-time messaging app" },
        { title: "Quiz App", desc: "MCQ system with score" },
        { title: "Portfolio Website", desc: "Personal responsive site" },
        { title: "Library Management System", desc: "Mini DB-based project" },
        { title: "Food Ordering App", desc: "Frontend UI project" },
        { title: "Attendance System", desc: "Student tracking system" },
        { title: "Notes App", desc: "Save and organize notes" }
    ],

    volunteer: [
        { title: "Teach Kids", desc: "Online weekend teaching" },
        { title: "Clean City Drive", desc: "Community service" },
        { title: "Animal Shelter", desc: "Care & adoption support" },
        { title: "Old Age Home Visit", desc: "Spend time with elders" },
        { title: "Women Empowerment NGO", desc: "Awareness campaigns" },
        { title: "Blood Donation Camp", desc: "Organizing & support" },
        { title: "Tree Plantation Drive", desc: "Environmental volunteering" },
        { title: "Disaster Relief Help", desc: "Emergency response team" },
        { title: "Mental Health Helpline", desc: "Listener support" },
        { title: "Orphanage Volunteer", desc: "Teaching & activities" }
    ]
};


// DOMAIN SELECT
function setDomain(domain) {
    currentDomain = domain;
    currentIndex = 0;
    showCard();
}

// SHOW CARD
function showCard() {
    const card = document.getElementById("card");
    card.style.transform = "translateX(0)";

    if (!currentDomain) return;

    if (currentIndex >= data[currentDomain].length) {
        document.getElementById("title").innerText = "No more items!";
        document.getElementById("description").innerText = "";
        return;
    }

    const item = data[currentDomain][currentIndex];
    document.getElementById("title").innerText = item.title;
    document.getElementById("description").innerText = item.desc;
}

// NEXT
function nextCard() {
    currentIndex++;
    showCard();
}

// BUTTON ACTIONS
function save() {
    nextCard();
}

function skip() {
    nextCard();
}

// SWIPE (SIMPLE & STABLE)
const card = document.getElementById("card");
let startX = 0;
let isDragging = false;

card.addEventListener("pointerdown", e => {
    isDragging = true;
    startX = e.clientX;
});

card.addEventListener("pointerup", e => {
    if (!isDragging) return;
    isDragging = false;

    const diff = e.clientX - startX;

    if (diff > 80) {
        save();   // swipe right
    } else if (diff < -80) {
        skip();   // swipe left
    }

    card.style.transform = "translateX(0)";
});

// LOGOUT
function logout() {
    fetch("http://127.0.0.1:5000/logout", {
        method: "POST",
        credentials: "include"
    }).then(() => {
        window.location.href = "login.html";
    });
}

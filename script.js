let currentDomain = "";
let currentIndex = 0;

// Sample data
const data = {
    freelance: [
        { title: "Frontend Intern", desc: "HTML, CSS, JavaScript" },
        { title: "Content Writer", desc: "Write blogs and posts" }
    ],
    project: [
        { title: "Weather App", desc: "API based mini project" },
        { title: "Expense Tracker", desc: "Track daily spending" }
    ],
    volunteer: [
        { title: "Teach Kids", desc: "Online weekend volunteering" },
        { title: "Clean City Drive", desc: "Community service" }
    ]
};

function setDomain(domain) {
    currentDomain = domain;
    currentIndex = 0;
    showCard();
}

function showCard() {
    if (!currentDomain) return;

    const item = data[currentDomain][currentIndex];
    document.getElementById("title").innerText = item.title;
    document.getElementById("description").innerText = item.desc;
}

function skip() {
    nextCard();
}

function save() {
    const item = data[currentDomain][currentIndex];

    let saved = JSON.parse(localStorage.getItem(currentDomain)) || [];
    saved.push(item);

    localStorage.setItem(currentDomain, JSON.stringify(saved));

    alert("Saved successfully!");
    nextCard();
}


function nextCard() {
    currentIndex++;
    if (currentIndex >= data[currentDomain].length) {
        document.getElementById("title").innerText = "No more items!";
        document.getElementById("description").innerText = "";
        return;
    }
    showCard();
}

function showSaved() {
    const container = document.getElementById("savedList");
    container.innerHTML = "";

    if (!currentDomain) {
        container.innerHTML = "<p>Select a domain first</p>";
        return;
    }

    const saved = JSON.parse(localStorage.getItem(currentDomain)) || [];

    if (saved.length === 0) {
        container.innerHTML = "<p>No saved items yet</p>";
        return;
    }

    saved.forEach(item => {
        const div = document.createElement("div");
        div.style.background = "#fff";
        div.style.margin = "10px auto";
        div.style.padding = "10px";
        div.style.width = "300px";
        div.style.borderRadius = "8px";

        div.innerHTML = `<h4>${item.title}</h4><p>${item.desc}</p>`;
        container.appendChild(div);
    });
}


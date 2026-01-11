function loadSaved(domain) {
    const container = document.getElementById("savedList");
    container.innerHTML = "";

    const key = "saved_" + domain;
    const saved = JSON.parse(localStorage.getItem(key)) || [];

    if (saved.length === 0) {
        container.innerHTML = "<p class='text-center text-gray-500'>No saved items yet ✨</p>";
        return;
    }

    saved.forEach(item => {
        const div = document.createElement("div");
        div.className = "bg-white p-4 rounded-xl shadow";

        div.innerHTML = `
            <h3 class="font-semibold">${item.title}</h3>
            <p class="text-gray-600 text-sm">${item.desc}</p>
        `;

        container.appendChild(div);
    });
}

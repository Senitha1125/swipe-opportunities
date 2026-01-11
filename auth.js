const API = "http://127.0.0.1:5000";

function register() {
    fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getCreds())
    })
    .then(res => res.json())
    .then(data => showMsg(data.msg, "green"))
    .catch(() => showMsg("Error"));
}

function login() {
    fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(getCreds())
    })
    .then(res => res.json())
    .then(data => {
        if (data.msg === "Login successful") {
            window.location.href = "index.html";
        } else {
            showMsg(data.msg);
        }
    });
}

function getCreds() {
    return {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };
}

function showMsg(msg, color="red") {
    const el = document.getElementById("authMsg");
    el.innerText = msg;
    el.style.color = color;
}

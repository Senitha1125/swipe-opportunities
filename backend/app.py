from flask import Flask, request, jsonify, session
from flask_cors import CORS
import json, os

app = Flask(__name__)
app.secret_key = "dev-secret-key-123"

# Cookie config (important for auth)
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = False

# Allow frontend to send cookies
CORS(app, supports_credentials=True)

USERS_FILE = "users.json"

# ---------- Helpers ----------

def get_logged_in_user():
    return session.get("user")


def load_users():
    if not os.path.exists(USERS_FILE):
        return []
    with open(USERS_FILE, "r") as f:
        return json.load(f)

def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=2)

def get_logged_in_user():
    return session.get("user")

# ---------- Auth Routes ----------

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    users = load_users()

    if any(u["username"] == data["username"] for u in users):
        return jsonify({"msg": "User already exists"}), 400

    users.append({
        "username": data["username"],
        "password": data["password"],
        "saved": {
            "freelance": [],
            "project": [],
            "volunteer": []
        }
    })

    save_users(users)
    return jsonify({"msg": "Registered successfully"})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    users = load_users()

    for u in users:
        if u["username"] == data["username"] and u["password"] == data["password"]:
            session["user"] = u["username"]
            return jsonify({"msg": "Login successful"})

    return jsonify({"msg": "Invalid credentials"}), 401

@app.route("/logout", methods=["POST"])
def logout():
    session.pop("user", None)
    return jsonify({"msg": "Logged out"})

@app.route("/check-auth")
def check_auth():
    return jsonify({
        "loggedIn": "user" in session,
        "user": session.get("user")
    })

# ---------- App Routes ----------

@app.route("/save-item", methods=["POST"])
def save_item():
    username = get_logged_in_user()
    if not username:
        return jsonify({"msg": "Unauthorized"}), 401

    data = request.json
    users = load_users()

    for user in users:
        if user["username"] == username:
            user["saved"][data["domain"]].append(data["item"])
            save_users(users)
            return jsonify({"msg": "Item saved"})

    return jsonify({"msg": "User not found"}), 404

@app.route("/get-saved")
def get_saved():
    username = get_logged_in_user()
    if not username:
        return jsonify({"msg": "Unauthorized"}), 401

    users = load_users()
    for user in users:
        if user["username"] == username:
            return jsonify(user["saved"])

    return jsonify({})

# ---------- Run ----------

if __name__ == "__main__":
    app.run(debug=True)

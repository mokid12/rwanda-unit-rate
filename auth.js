/**
 * Authentication System
 * Handles user registration, login, and session management
 * Currently uses localStorage; easily upgradable to backend API
 */

// =============================================
// User Database (localStorage) - For now
// Replace with backend API calls when ready
// =============================================

class AuthSystem {
  constructor() {
    this.storageKey = "rwandaUnitRateUsers";
    this.sessionKey = "rwandaUnitRateSession";
    this.initializeStorage();
  }

  // Initialize storage with sample data if empty
  initializeStorage() {
    if (!localStorage.getItem(this.storageKey)) {
      // Start with empty users array
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  // Get all users (development only - never expose in production)
  getAllUsers() {
    return JSON.parse(localStorage.getItem(this.storageKey) || "[]");
  }

  // Save all users
  saveUsers(users) {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Hash password (simple version - use bcrypt on backend in production)
  hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  }

  // Register new user
  register(fullname, email, password) {
    const users = this.getAllUsers();

    // Check if email already exists
    if (users.find((user) => user.email === email)) {
      return {
        success: false,
        message: "Email already registered. Please login or use a different email.",
      };
    }

    // Validate inputs
    if (!fullname || !email || !password) {
      return {
        success: false,
        message: "Please fill in all fields.",
      };
    }

    if (!email.includes("@")) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters.",
      };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(), // Simple ID generation
      fullname: fullname,
      email: email,
      passwordHash: this.hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    this.saveUsers(users);

    return {
      success: true,
      message: "Account created successfully!",
    };
  }

  // Login user
  login(email, password) {
    const users = this.getAllUsers();

    // Validate inputs
    if (!email || !password) {
      return {
        success: false,
        message: "Please fill in both email and password.",
      };
    }

    if (!email.includes("@")) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    // Find user
    const user = users.find((u) => u.email === email);

    if (!user) {
      return {
        success: false,
        message: "Email not found. Please create an account.",
      };
    }

    // Verify password
    if (user.passwordHash !== this.hashPassword(password)) {
      return {
        success: false,
        message: "Incorrect password. Please try again.",
      };
    }

    // Create session
    const session = {
      userId: user.id,
      email: user.email,
      fullname: user.fullname,
      loginTime: new Date().toISOString(),
    };

    localStorage.setItem(this.sessionKey, JSON.stringify(session));

    return {
      success: true,
      message: "Login successful!",
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      },
    };
  }

  // Get current session
  getSession() {
    const session = localStorage.getItem(this.sessionKey);
    return session ? JSON.parse(session) : null;
  }

  // Check if user is logged in
  isLoggedIn() {
    return this.getSession() !== null;
  }

  // Logout user
  logout() {
    localStorage.removeItem(this.sessionKey);
    return {
      success: true,
      message: "Logged out successfully.",
    };
  }

  // Get current user info
  getCurrentUser() {
    const session = this.getSession();
    if (!session) {
      return null;
    }

    const users = this.getAllUsers();
    return users.find((user) => user.id === session.userId) || null;
  }
}

// Create global instance
const auth = new AuthSystem();

/**
 * Route Protection Helper
 * Call this on pages that require authentication
 */
function protectRoute(redirectUrl = "login.html") {
  if (!auth.isLoggedIn()) {
    window.location.href = redirectUrl;
    return false;
  }
  return true;
}

/**
 * Update UI with user info
 * Call this to display logged-in user's name in navbar/header
 */
function updateAuthUI() {
  const user = auth.getCurrentUser();
  const loginLink = document.querySelector('a[href="login.html"]');
  const signupLink = document.querySelector('a[href="signup.html"]');

  if (user && loginLink && signupLink) {
    // Replace login/signup with user menu
    loginLink.textContent = `${user.fullname}`;
    loginLink.href = "#";
    loginLink.style.pointerEvents = "none";
    loginLink.style.opacity = "0.7";

    const logoutLink = document.createElement("a");
    logoutLink.textContent = "Logout";
    logoutLink.href = "#";
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      auth.logout();
      window.location.href = "index.html";
    });

    signupLink.replaceWith(logoutLink);
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateAuthUI);

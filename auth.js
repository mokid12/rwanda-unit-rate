/**
 * Authentication System
 * Handles user registration, login, session management, and password recovery
 * Currently uses localStorage; easily upgradable to backend API
 */

class AuthSystem {
  constructor() {
    this.storageKey = "rwandaUnitRateUsers";
    this.sessionKey = "rwandaUnitRateSession";
    this.resetTokenKey = "rwandaUnitRateResetTokens";
    this.initializeStorage();
  }

  // Initialize storage with Super Admin account
  initializeStorage() {
    let users = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    
    // Check if super admin exists
    const superAdminEmail = "gatetemoise123@gmail.com";
    const superAdminExists = users.some((u) => u.email.toLowerCase() === superAdminEmail.toLowerCase());

    if (!superAdminExists) {
      // Add Super Admin account with correct password
      users.push({
        id: "superadmin-001",
        fullname: "Moise GATETE",
        email: superAdminEmail,
        passwordHash: this.hashPassword("Moiseunitrate2026!"),
        role: "superadmin",
        isVerified: true,
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem(this.storageKey, JSON.stringify(users));
      console.log("✅ Super Admin account initialized:");
      console.log("   Email: gatetemoise123@gmail.com");
      console.log("   Password: Moiseunitrate2026!");
    }

    // Initialize reset tokens storage if not exists
    if (!localStorage.getItem(this.resetTokenKey)) {
      localStorage.setItem(this.resetTokenKey, JSON.stringify([]));
    }
  }

  // Get all users
  getAllUsers() {
    return JSON.parse(localStorage.getItem(this.storageKey) || "[]");
  }

  // Save all users
  saveUsers(users) {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Get all reset tokens
  getResetTokens() {
    return JSON.parse(localStorage.getItem(this.resetTokenKey) || "[]");
  }

  // Save reset tokens
  saveResetTokens(tokens) {
    localStorage.setItem(this.resetTokenKey, JSON.stringify(tokens));
  }

  // Hash password
  hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  // Generate unique reset token
  generateResetToken() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15) + 
           Date.now().toString(36);
  }

  // Request password reset
  requestPasswordReset(email) {
    const users = this.getAllUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return {
        success: false,
        message: "Email not found in our system.",
      };
    }

    // Generate reset token
    const resetToken = this.generateResetToken();
    const expiryTime = Date.now() + (30 * 60 * 1000); // 30 minutes expiry

    // Store reset token
    const tokens = this.getResetTokens();
    tokens.push({
      token: resetToken,
      email: user.email,
      expiryTime: expiryTime,
      used: false,
    });
    this.saveResetTokens(tokens);

    return {
      success: true,
      message: "Password reset link sent! Check your email (or use the token below for testing).",
      resetToken: resetToken, // For development/testing only
      resetLink: `reset-password.html?token=${resetToken}`,
    };
  }

  // Validate reset token
  validateResetToken(token) {
    const tokens = this.getResetTokens();
    const resetData = tokens.find((t) => t.token === token);

    if (!resetData) {
      return {
        valid: false,
        message: "Invalid or expired reset token.",
      };
    }

    if (resetData.used) {
      return {
        valid: false,
        message: "This reset token has already been used.",
      };
    }

    if (Date.now() > resetData.expiryTime) {
      return {
        valid: false,
        message: "Reset token has expired. Please request a new one.",
      };
    }

    return {
      valid: true,
      email: resetData.email,
      message: "Token is valid!",
    };
  }

  // Reset password with token
  resetPasswordWithToken(token, newPassword) {
    // Validate token
    const validation = this.validateResetToken(token);
    if (!validation.valid) {
      return {
        success: false,
        message: validation.message,
      };
    }

    // Validate new password
    if (!newPassword || newPassword.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters long.",
      };
    }

    // Update user password
    const users = this.getAllUsers();
    const user = users.find((u) => u.email.toLowerCase() === validation.email.toLowerCase());

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    // Update password
    user.passwordHash = this.hashPassword(newPassword);
    this.saveUsers(users);

    // Mark token as used
    const tokens = this.getResetTokens();
    const tokenIndex = tokens.findIndex((t) => t.token === token);
    if (tokenIndex !== -1) {
      tokens[tokenIndex].used = true;
    }
    this.saveResetTokens(tokens);

    return {
      success: true,
      message: "Password reset successfully! You can now login with your new password.",
    };
  }

  // Register new user
  register(fullname, email, password, role = "user") {
    const users = this.getAllUsers();

    if (users.find((user) => user.email.toLowerCase() === email.toLowerCase())) {
      return {
        success: false,
        message: "Email already registered. Please login or use a different email.",
      };
    }

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

    const newUser = {
      id: Date.now().toString(),
      fullname: fullname,
      email: email.toLowerCase(),
      passwordHash: this.hashPassword(password),
      role: role || "user",
      isVerified: true,
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

    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return {
        success: false,
        message: "Email not found. Please create an account.",
      };
    }

    const inputHash = this.hashPassword(password);
    
    if (user.passwordHash !== inputHash) {
      return {
        success: false,
        message: "Incorrect password. Please try again.",
      };
    }

    const session = {
      userId: user.id,
      email: user.email,
      fullname: user.fullname,
      role: user.role || "user",
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
        role: user.role,
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

  // Get current user info
  getCurrentUser() {
    return this.getSession();
  }

  // Logout user
  logout() {
    localStorage.removeItem(this.sessionKey);
    return {
      success: true,
      message: "Logged out successfully.",
    };
  }

  // Check if user is admin
  isAdmin() {
    const user = this.getCurrentUser();
    return user && (user.role === "superadmin" || user.role === "subadmin");
  }

  // Check if user is super admin
  isSuperAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === "superadmin";
  }
}

// Create global instance
const auth = new AuthSystem();

/**
 * Route Protection Helper
 */
function protectRoute(redirectUrl = "login.html") {
  if (!auth.isLoggedIn()) {
    window.location.href = redirectUrl;
    return false;
  }
  return true;
}

/**
 * Admin Route Protection
 */
function protectAdminRoute(redirectUrl = "dashboard.html") {
  if (!auth.isLoggedIn()) {
    window.location.href = "login.html";
    return false;
  }

  if (!auth.isAdmin()) {
    alert("Access denied. Admin privileges required.");
    window.location.href = redirectUrl;
    return false;
  }

  return true;
}

/**
 * Update UI with user info
 */
function updateAuthUI() {
  const user = auth.getCurrentUser();
  const loginLink = document.querySelector('a[href="login.html"]');
  const signupLink = document.querySelector('a[href="signup.html"]');

  if (user && loginLink && signupLink) {
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

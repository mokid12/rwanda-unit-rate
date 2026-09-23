export type UserRole = 'user' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

const USER_STORAGE_KEY = 'rwunitrate_users';
const SESSION_STORAGE_KEY = 'rwunitrate_session';
export const ADMIN_EMAIL = 'admin@rwandaunitrate.rw';
export const ADMIN_PASSWORD = 'admin123';

export function getStoredUsers(): User[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const saved = window.localStorage.getItem(USER_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveUsers(users: User[]) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
  }
}

export function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): { success: boolean; message: string; user?: User } {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !password || !name.trim()) {
    return { success: false, message: 'Please complete all fields.' };
  }

  const users = getStoredUsers();
  const exists = users.some((user) => user.email.toLowerCase() === normalizedEmail);

  if (exists) {
    return { success: false, message: 'This email is already registered.' };
  }

  const user: User = {
    id: `${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: 'user',
  };

  const nextUsers = [...users, user];
  saveUsers(nextUsers);

  return { success: true, message: 'User created successfully.', user };
}

export function loginUser(email: string, password: string): User | null {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return {
      id: 'admin-1',
      name: 'Admin User',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin',
    };
  }

  const users = getStoredUsers();
  const user = users.find(
    (entry) => entry.email.toLowerCase() === normalizedEmail && entry.password === password,
  );

  return user || null;
}

export function setSession(user: User) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
  }
}

export function getSession(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const saved = window.localStorage.getItem(SESSION_STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
}

export function logout() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

if (typeof window !== 'undefined' && !window.localStorage.getItem(USER_STORAGE_KEY)) {
  const adminUser: User = {
    id: 'admin-seed',
    name: 'Admin User',
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: 'admin',
  };

  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify([adminUser]));
}


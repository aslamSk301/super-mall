// scripts/auth.js
import { auth } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
import { logAction } from './logger.js';

// LOGIN
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorDisplay = document.getElementById('login-error');
  errorDisplay.textContent = '';

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    logAction('Admin logged in', email);
    window.location.href = 'dashboard.html';
  } catch (error) {
    errorDisplay.textContent = `Login failed: ${error.code} - ${error.message}`;
    logAction('Login failed', email);
  }
});

// SIGNUP / CREATE ACCOUNT
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const errorDisplay = document.getElementById('signup-error');
  const successDisplay = document.getElementById('signup-success');
  errorDisplay.textContent = '';
  successDisplay.textContent = '';

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    logAction('Account created', email);
    successDisplay.textContent = 'Account created successfully! You can now log in.';
    // Optionally clear the signup form
    document.getElementById('signup-form').reset();
  } catch (error) {
    errorDisplay.textContent = `Signup failed: ${error.code} - ${error.message}`;
    logAction('Signup failed', email);
  }
});

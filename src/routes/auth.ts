import express from 'express';
import supabase from '../lib/supabase'; // Your Supabase client instance
import bcrypt from 'bcryptjs';

const router = express.Router();

/**
 * User Registration Endpoint
 * POST /auth/register
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Use Supabase Auth to register the user
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      res.status(400).json({ success: false, error: error.message });
      return;
    }
    // Optionally, store additional user data (e.g., name) in your own database with Prisma
    res.status(201).json({ success: true, user: data.user });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
    return;
  }
});

/**
 * User Sign-In Endpoint
 * POST /auth/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Use Supabase Auth to sign in
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      res.status(401).json({ success: false, error: error.message });
      return;
    }
    // data contains both user and session objects
    res.status(200).json({ success: true, user: data.user, session: data.session });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
    return;
  }
});

/**
 * User Sign-Out Endpoint
 * POST /auth/logout
 */
router.post('/logout', async (req, res) => {
  try {
    // Sign out the user via Supabase Auth
    const { error } = await supabase.auth.signOut();
    if (error) {
      res.status(400).json({ success: false, error: error.message });
      return;
    }
    res.status(200).json({ success: true, message: 'Signed out successfully' });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
    return;
  }
});

/**
 * Password Reset Endpoint
 * POST /auth/reset-password
 */
router.post('/reset-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Request a password reset email via Supabase
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      res.status(400).json({ success: false, error: error.message });
      return;
    }
    res.status(200).json({ success: true, message: 'Password reset email sent', data });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
    return;
  }
});

export default router;

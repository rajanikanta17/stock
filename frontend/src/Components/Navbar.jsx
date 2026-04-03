import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../images/logo1.png'
import ThemeToggle from '../lib/ThemeToggle';

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur site-topbar dark:border-slate-800 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center">
          <img src={logo1} className="w-28 rounded-md bg-white p-1 dark:bg-slate-900" alt="Inventory logo" />
        </Link>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/80">
            <ThemeToggle className="text-2xl text-slate-700 dark:text-slate-200" />
          </div>
          <Link
            to='/LoginPage'
            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:bg-slate-100 hover:text-black-900 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Sign In
          </Link>
          <Link
            to='/SignupPage'
            className="rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:scale-[1.02] dark:shadow-teal-500/20"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

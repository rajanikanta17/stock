import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-semibold text-white">InventoryPro</h2>
          <p className="mt-3 text-sm text-slate-400">Enterprise inventory intelligence for teams that operate at scale.</p>
          <p className="mt-6 text-xs text-slate-500">© {new Date().getFullYear()} InventoryPro. All rights reserved.</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-slate-300 transition hover:text-white">Home</Link></li>
            <li><Link to="/about" className="text-slate-300 transition hover:text-white">Services</Link></li>
            <li><Link to="/LoginPage" className="text-slate-300 transition hover:text-white">Sign In</Link></li>
            <li><Link to="/SignupPage" className="text-slate-300 transition hover:text-white">Create Account</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Contact</h3>
          <p className="text-sm text-slate-300">support@inventorypro.com</p>
          <p className="text-sm text-slate-300">+91 22 338 983 902</p>
          <p className="text-sm text-slate-300">Tech Park, Bengaluru, India</p>

          <div className="mt-4 flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-slate-300 transition hover:text-white text-xl"><FaFacebook /></a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="text-slate-300 transition hover:text-white text-xl"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-300 transition hover:text-white text-xl"><FaLinkedin /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-slate-300 transition hover:text-white text-xl"><FaInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

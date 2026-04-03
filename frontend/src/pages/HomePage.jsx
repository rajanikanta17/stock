import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function HomePage() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen text-slate-900 overflow-hidden">
      <Navbar />

      <section className="relative px-6 pb-16 pt-14">
        <div className="absolute inset-0 -z-10 opacity-80">
          <div className="absolute left-[-120px] top-[-80px] h-72 w-72 rounded-full bg-teal-300/30 blur-3xl" />
          <div className="absolute right-[-100px] top-[10%] h-80 w-80 rounded-full bg-amber-300/30 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-6 inline-block rounded-full border border-teal-300 bg-teal-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              Industry-ready Inventory Suite
            </p>
            <h1 className="text-5xl font-bold leading-tight text-slate-900">
              Run operations with confidence, speed, and real-time control.
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Centralize products, stock movement, suppliers, and order workflows in one system built for warehouse teams and business leaders.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="glass-card rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Faster Ops</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">60%</p>
                <p className="text-sm text-slate-600">workflow acceleration</p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Accuracy</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">99%</p>
                <p className="text-sm text-slate-600">stock visibility</p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Adoption</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">70%</p>
                <p className="text-sm text-slate-600">team productivity gain</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl border p-8 shadow-2xl shadow-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-5 space-y-4">
              {[
                {
                  question: "What is this platform about?",
                  answer:
                    "InventoryPro provides operational control for products, category planning, supplier coordination, and reporting.",
                },
                {
                  question: "Is there a trial available?",
                  answer:
                    "Yes, your team can test all major workflows with a guided setup flow.",
                },
                {
                  question: "Can this scale for multiple teams?",
                  answer:
                    "Yes, role-based dashboards and event-driven updates keep management and staff aligned.",
                },
              ].map((faq, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <button
                    className="flex w-full items-center justify-between text-left text-base font-semibold text-slate-800"
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                    {openFAQ === index ? (
                      <FaMinus className="text-teal-600" />
                    ) : (
                      <FaPlus className="text-teal-600" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-6">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-3xl border border-slate-200 bg-white p-8 lg:grid-cols-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Control Tower</p>
            <h3 className="mt-3 text-2xl font-semibold">Everything connected in one workspace.</h3>
          </div>
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">Role-specific dashboards</p>
            <p className="mt-1 text-sm text-slate-600">
              Admins, managers, and staff each get focused workflows and insights.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">Live visibility</p>
            <p className="mt-1 text-sm text-slate-600">
              Track orders and inventory movement in near real-time.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;

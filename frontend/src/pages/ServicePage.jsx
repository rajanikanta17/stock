import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function ServicePage() {
  const services = [
    {
      title: 'Inventory Intelligence',
      desc: 'Smart stock tracking with low-stock alerts, reorder planning, and category-level visibility.',
    },
    {
      title: 'Order Operations',
      desc: 'Create, monitor, and update customer orders with timeline-based status updates.',
    },
    {
      title: 'Supplier Network',
      desc: 'Keep supplier records, contact details, and transaction activity in one place.',
    },
    {
      title: 'Role-based Security',
      desc: 'Segregated access for admin, manager, and staff users with protected routes.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <p className="inline-block rounded-full border border-cyan-300 bg-cyan-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
          Services
        </p>
        <h1 className="mt-6 text-5xl font-bold text-slate-900">Built for modern inventory operations.</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          We provide modular tools for inventory, supply-chain coordination, reporting, and access control.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="glass-card rounded-3xl p-6 shadow-sm">
              <h3 className="text-2xl font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-3 text-slate-600">{service.desc}</p>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ServicePage;
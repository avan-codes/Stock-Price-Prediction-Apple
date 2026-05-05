export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="card-base p-6 transition-transform duration-200 hover:-translate-y-0.5">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-black">
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
    </div>
  );
}

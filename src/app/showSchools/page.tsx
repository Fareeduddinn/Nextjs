"use client";

import { useEffect, useState } from "react";

type School = {
  id: number;
  name: string;
  address: string;
  city: string;
  image: string;
};

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/schools", { cache: "no-store" });
      const data = await res.json();
      setSchools(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Schools</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {schools.map((s) => (
          <div key={s.id} className="border rounded-2xl overflow-hidden">
            <img src={s.image} alt={s.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{s.name}</h2>
              <p className="text-sm text-gray-700">{s.address}</p>
              <p className="text-sm text-gray-500">{s.city}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

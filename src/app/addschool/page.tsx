"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  contact: z.string().min(7, "Contact is required").regex(/^[0-9+\-\s()]+$/,"Digits & symbols only"),
  email_id: z.string().email("Invalid email"),
  image: z
    .any()
    .refine((files) => files?.length === 1, "Image is required")
});

type FormData = z.infer<typeof schema>;

export default function AddSchoolPage() {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);
      formData.append("image", (data as any).image[0]);

      const res = await fetch("/api/schools", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save");
      alert("School saved!");
      reset();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <input {...register("name")} placeholder="School Name" className="border p-2 rounded" />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}

        <input {...register("address")} placeholder="Address" className="border p-2 rounded" />
        {errors.address && <p className="text-sm text-red-600">{errors.address.message}</p>}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input {...register("city")} placeholder="City" className="border p-2 rounded w-full" />
            {errors.city && <p className="text-sm text-red-600">{errors.city.message}</p>}
          </div>
          <div>
            <input {...register("state")} placeholder="State" className="border p-2 rounded w-full" />
            {errors.state && <p className="text-sm text-red-600">{errors.state.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input {...register("contact")} placeholder="Contact (phone)" className="border p-2 rounded w-full" />
            {errors.contact && <p className="text-sm text-red-600">{errors.contact.message}</p>}
          </div>
          <div>
            <input {...register("email_id")} placeholder="Email" className="border p-2 rounded w-full" />
            {errors.email_id && <p className="text-sm text-red-600">{errors.email_id.message}</p>}
          </div>
        </div>

        <input type="file" accept="image/*" {...register("image")} className="border p-2 rounded" />
        {errors.image && <p className="text-sm text-red-600">{String(errors.image.message)}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white rounded px-4 py-2 disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Save School"}
        </button>
      </form>
    </main>
  );
}

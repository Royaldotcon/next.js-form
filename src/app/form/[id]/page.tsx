"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Field = {
  label: string;
  type: string;
};

type Form = {
  title: string;
  description: string;
  fields: Field[];
};

export default function FormPage() {
  const params = useParams();
  const id = params?.id as string;

  const [form, setForm] = useState<Form | null>(null);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});

 useEffect(() => {
  const storedForm = localStorage.getItem(`form-${id}`);
  if (storedForm) {
    setForm(JSON.parse(storedForm));
  } else {
    setForm(null); // Optional: handle invalid ID
  }
}, [id]);


  const handleChange = (label: string, value: string) => {
    setResponses((prev) => ({ ...prev, [label]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
// Save locally as well:
const existingResponses = JSON.parse(localStorage.getItem(`responses-${id}`) || "[]");
existingResponses.push(responses);
localStorage.setItem(`responses-${id}`, JSON.stringify(existingResponses));

    const payload = {
      formId: id,
      responses,
      submittedAt: new Date().toISOString(),
    };

    const res = await fetch("/api/save-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Form submitted successfully!");
    } else {
      alert("Submission failed.");
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{form.title}</h1>
      <p className="mb-4">{form.description}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {form.fields.map((field, index) => (
          <div key={index}>
            <label className="block mb-1 font-medium">{field.label}</label>
            <input
            title="form"
              type={field.type}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              onChange={(e) => handleChange(field.label, e.target.value)}
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

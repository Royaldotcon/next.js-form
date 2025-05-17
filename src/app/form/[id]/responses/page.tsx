"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResponsesPage() {
  const params = useParams();
  const id = params?.id as string;

  const [responses, setResponses] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`responses-${id}`);
    if (saved) {
      setResponses(JSON.parse(saved));
    }
  }, [id]);

  if (!responses.length) {
    return <p className="p-4">No responses yet for this form.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Responses for Form {id}</h2>
      {responses.map((response, i) => (
        <div key={i} className="mb-4 border p-3 rounded bg-gray-50">
          {Object.entries(response).map(([label, answer]) => (
            <div key={label}>
              <strong>{label}:</strong> {String(answer)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

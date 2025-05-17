"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Field = {
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
};

export default function NewForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<Field[]>([
    { label: "", type: "text", required: false, placeholder: "" },
  ]);
  const [formId, setFormId] = useState<string | null>(null); // 👈

  const handleFieldChange = (
    index: number,
    key: keyof Field,
    value: string | boolean
  ) => {
    const newFields = [...fields];
    if (key === "required") {
      newFields[index][key] = value as boolean;
    } else {
      newFields[index][key] = value as string;
    }
    setFields(newFields);
  };

  const addField = () => {
    setFields([
      ...fields,
      { label: "", type: "text", required: false, placeholder: "" },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = uuidv4();
    const newForm = { title, description, fields };
    localStorage.setItem(`form-${id}`, JSON.stringify(newForm));
    setFormId(id); // 👈 show the form ID after creation
  };

  return (
    <div className="p-4 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="form-title" className="block font-semibold mb-1">
            Form Title
          </label>
          <input
            id="form-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter form title"
            required
          />
        </div>

        <div>
          <label htmlFor="form-description" className="block font-semibold mb-1">
            Form Description
          </label>
          <textarea
            id="form-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter form description"
          />
        </div>

        <h2 className="text-xl font-bold">Fields</h2>
        {fields.map((field, i) => (
          <div key={i} className="space-y-2 mb-4 border p-3 rounded">
            <div>
              <label className="block font-semibold mb-1">Field Label</label>
              <input
              title="a"
                type="text"
                value={field.label}
                onChange={(e) => handleFieldChange(i, "label", e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Enter field label"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Field Type</label>
              <select
              title="s"
                value={field.type}
                onChange={(e) => handleFieldChange(i, "type", e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Placeholder (optional)
              </label>
              <input
              title="a"
                type="text"
                value={field.placeholder}
                onChange={(e) =>
                  handleFieldChange(i, "placeholder", e.target.value)
                }
                className="border p-2 rounded w-full"
                placeholder="Enter placeholder text"
              />
            </div>

            <div className="flex items-center">
              <input
              title="a"
                type="checkbox"
                checked={field.required}
                onChange={(e) =>
                  handleFieldChange(i, "required", e.target.checked)
                }
                className="mr-2"
              />
              <label className="font-semibold">Required</label>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addField}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Field
        </button>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
        >
          Create Form
        </button>
      </form>

      {formId && (
        <div className="mt-6 p-4 border rounded bg-blue-50">
          <p className="text-lg font-semibold text-green-700">
            ✅ Form created successfully!
          </p>
          <p>
            Your form ID is:{" "}
            <span className="font-mono bg-gray-200 px-2 py-1 rounded">
              {formId}
            </span>
          </p>
          <p className="mt-2">
            You can view it at:{" "}
            <code className="text-blue-600 underline break-words">
              /form/{formId}
            </code>
          </p>
        </div>
      )}
    </div>
  );
}

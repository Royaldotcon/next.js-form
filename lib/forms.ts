// lib/forms.ts
type Field = {
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
};

type Form = {
  id: string;
  title: string;
  description: string;
  fields: Field[];
};

const forms = new Map<string, Form>();

export function saveForm(form: Form) {
  forms.set(form.id, form);
}

export function getForm(id: string): Form | null {
  return forms.get(id) || null;
}

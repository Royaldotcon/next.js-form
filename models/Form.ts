// models/Form.ts
"use client";

import mongoose, { Schema, models, model } from "mongoose";

const FieldSchema = new Schema({
  label: String,
  type: String,
  required: Boolean,
});

const FormSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  fields: [FieldSchema],
}, {
  timestamps: true,
});

const Form = models.Form || model("Form", FormSchema);
export default Form;

// pages/api/form.ts
"use client";

import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/db";
import Form from "../../models/Form";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const form = await Form.create(req.body);
      return res.status(201).json(form);
    } catch (err) {
      return res.status(500).json({ error: "Failed to create form" });
    }
  }

  if (req.method === "GET") {
    try {
      const forms = await Form.find({});
      return res.status(200).json(forms);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch forms" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}

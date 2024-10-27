"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Form from "@components/Form";
export default function CreatePrompt() {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const createPrompt = async (e) => {};

  return <Form></Form>;
}

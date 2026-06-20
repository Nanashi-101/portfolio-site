"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { FiArrowUpRight } from "react-icons/fi";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group flex w-[200px] items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-surface outline-none transition-all hover:bg-gold disabled:opacity-60"
    >
      {pending ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-surface/40 border-t-surface" />
      ) : (
        <>
          Send message
          <FiArrowUpRight className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </>
      )}
    </button>
  );
};

export default SubmitButton;

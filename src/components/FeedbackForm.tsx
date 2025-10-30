"use client";

import React, { useState, useCallback } from "react";

type FormState = {
  message: string;
  isSubmitting: boolean;
  status: "idle" | "success" | "error";
  statusMessage: string;
};

const ACCENT_COLOR_HEX = "#00331a";
const ACCENT_TEXT_COLOR = "text-white";

const navStyle = {
    fontFamily: '"Hind Siliguri", sans-serif',
} as React.CSSProperties;

const FeedbackForm: React.FC = () => {
  const [state, setState] = useState<FormState>({
    message: "",
    isSubmitting: false,
    status: "idle",
    statusMessage: "",
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setState((prevState) => ({
        ...prevState,
        message: e.target.value,
        status: "idle",
        statusMessage: "",
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!state.message.trim()) {
        setState((prevState) => ({
          ...prevState,
          status: "error",
          statusMessage: "Please enter your feedback before submitting.",
        }));
        return;
      }

      setState((prevState) => ({
        ...prevState,
        isSubmitting: true,
        status: "idle",
      }));

      try {
        // NOTE: Replace '/api/submit' with your actual Vercel endpoint if different
        const response = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: state.message }),
        });

        if (response.ok) {
          setState({
            message: "",
            isSubmitting: false,
            status: "success",
            statusMessage:
              "Thank you! Your feedback has been successfully recorded.",
          });
        } else {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Submission failed. Please try again."
          );
        }
      } catch (error) {
        console.error("Submission Error:", error);
        setState((prevState) => ({
          ...prevState,
          isSubmitting: false,
          status: "error",
          statusMessage:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred.",
        }));
      }
    },
    [state.message]
  );

  const accentStyle = { backgroundColor: ACCENT_COLOR_HEX };

  return (
    <div className="container mx-auto md:mt-10 p-4 sm:p-6 lg:p-8" style={navStyle}>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-6 border border-gray-100"
      >
        <h2
          className="text-2xl text-center font-semibold mb-4"
          style={{ color: ACCENT_COLOR_HEX }}
        >
          আপনাদের প্রত্যাশাই হোক আমাদের অঙ্গীকার
        </h2>

        {/* Textarea Field */}
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-center font-medium mb-4"
            style={{ color: ACCENT_COLOR_HEX }}
          >
            
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={state.message}
            onChange={handleChange}
            placeholder="আমাদের কাছ থেকে আপনারা কি প্রত্যাশা করেন?"
            className="w-full p-3 border border-gray-300 rounded-lg resize-none 
                       focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out 
                       text-gray-800 placeholder:text-center"
            style={
              {
                borderColor: state.status === "error" ? "red" : undefined,
                "--tw-ring-color": `${ACCENT_COLOR_HEX} !important`,
              } as React.CSSProperties
            }
          />
        </div>

        {/* Status Message */}
        {state.status !== "idle" && state.statusMessage && (
          <p
            className={`text-sm mb-4 p-3 rounded-lg ${
              state.status === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {state.statusMessage}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={state.isSubmitting}
          style={accentStyle}
          className={`w-full md:w-1/4 text-center block mx-auto py-3 rounded-lg font-bold text-lg tracking-wider transition duration-300 ease-in-out 
                     ${ACCENT_TEXT_COLOR} 
                     ${
                       state.isSubmitting
                         ? "opacity-70 cursor-not-allowed"
                         : "hover:opacity-85 active:scale-[0.99] transform"
                     }`}
        >
          {state.isSubmitting ? "প্রত্যাশা প্রেরিত হচ্ছে" : "প্রত্যাশা প্রেরণ করুন"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;

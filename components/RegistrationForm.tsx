"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { parsePhoneNumberFromString } from 'libphonenumber-js/min';
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  fullName: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .refine((val) => val.trim().split(" ").length >= 2, {
      message: "Please enter your full name (first and last)",
    }),
  phone: z.string().refine((val) => {
    const phoneNumber = parsePhoneNumberFromString(val);
    return phoneNumber?.isValid() === true;
  }, {
    message: "Please enter a valid international phone number",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const result = await signIn("credentials", {
        fullName: data.fullName,
        phone: data.phone,
        redirect: false,
      });

      if (result?.error) {
        console.error("Auth Error:", result.error);
        setIsSubmitting(false);
        // You could add a toast or error state here
        return;
      }

      // Successful login -> Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Submission error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-[400px] rounded-[18px] border border-white/[0.08] bg-[#020617]/85 p-[24px] sm:p-[32px] shadow-2xl backdrop-blur-xl relative z-10"
    >
      <div className="mb-6">
        <h2 className="font-heading text-[22px] font-semibold tracking-tight text-white">
          Create Your Account
        </h2>
        <p className="mt-1 text-[14px] text-slate-400 font-medium">
          Takes less than 10 seconds.
        </p>
        <div className="mt-4 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name Input */}
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-[14px] font-medium text-slate-300">
            Full Name
          </label>
          <div className="relative">
            <input
              id="fullName"
              type="text"
              placeholder="John Smith"
              {...register("fullName")}
              className={`h-[48px] w-full rounded-[10px] border bg-[#020617] pl-[14px] pr-4 text-[16px] text-white placeholder:text-slate-600 transition-all focus:outline-none focus:ring-0 ${
                errors.fullName
                  ? "border-red-500 focus:border-red-500 focus:shadow-[0_0_0_1px_rgba(239,68,68,0.5)]"
                  : "border-slate-800 focus:border-green-500 focus:shadow-[0_0_0_1px_rgba(34,197,94,0.5)]"
              }`}
            />
          </div>
          <AnimatePresence>
            {errors.fullName && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-[13px] text-red-500 mt-1"
              >
                {errors.fullName.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Phone Input */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-[14px] font-medium text-slate-300">
            Phone Number
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className={`${errors.phone ? "[&_.react-international-phone-input-container]:!border-red-500 [&_.react-international-phone-input-container]:focus-within:!shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : ""}`}>
                <PhoneInput
                  defaultCountry="us"
                  value={value}
                  onChange={(phone) => onChange(phone)}
                />
              </div>
            )}
          />
          <AnimatePresence>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-[13px] text-red-500 mt-1"
              >
                {errors.phone.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={!isSubmitting ? { scale: 1.02, boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)" } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          disabled={isSubmitting}
          type="submit"
          className="relative mt-2 flex h-[50px] w-full items-center justify-center overflow-hidden rounded-[12px] bg-gradient-to-b from-green-400 to-green-600 px-8 text-[16px] font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all disabled:pointer-events-none disabled:opacity-70"
        >
          {isSubmitting ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="h-5 w-5 animate-spin text-white/80" />
              <span>Logging in...</span>
            </motion.div>
          ) : (
            <span>Login</span>
          )}
        </motion.button>
      </form>

      {/* Micro Trust Text */}
      <div className="mt-6 text-center text-[12px] leading-relaxed text-slate-500">
        Your phone number is used only for account verification. <br className="hidden sm:block" />
        No spam. No marketing calls.
      </div>
    </motion.div>
  );
}

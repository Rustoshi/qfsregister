"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";

export function ScarcityCounter() {
  const [slots, setSlots] = useState(988);

  useEffect(() => {
    // Load from localStorage on mount
    const savedSlots = localStorage.getItem("qfs_available_slots");
    if (savedSlots) {
      setSlots(parseInt(savedSlots));
    }

    const decrementSlots = () => {
      setSlots((prev) => {
        const decreaseBy = Math.random() > 0.5 ? 2 : 1;
        const newValue = Math.max(0, prev - decreaseBy);
        // Save to localStorage
        localStorage.setItem("qfs_available_slots", newValue.toString());
        return newValue;
      });

      const nextInterval = Math.floor(Math.random() * (45000 - 15000 + 1)) + 15000;
      setTimeout(decrementSlots, nextInterval);
    };

    const firstInterval = Math.floor(Math.random() * (45000 - 15000 + 1)) + 15000;
    const timer = setTimeout(decrementSlots, firstInterval);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-center mb-6"
    >
      <motion.div
        animate={{
          boxShadow: [
            "0px 0px 0px 0px rgba(34,197,94,0)",
            "0px 0px 20px 0px rgba(34,197,94,0.3)",
            "0px 0px 0px 0px rgba(34,197,94,0)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-[18px] py-[10px]"
      >
        <Lock className="w-4 h-4 text-green-500" />
        <div className="flex items-center gap-1 text-sm font-medium text-green-500 tracking-wide">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={slots}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="inline-block tabular-nums"
            >
              {slots}
            </motion.span>
          </AnimatePresence>
          <span>Account Slots Remaining Today</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

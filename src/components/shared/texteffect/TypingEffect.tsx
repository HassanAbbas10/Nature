"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import * as React from "react";
import parse from "html-react-parser";

type TypingEffectProps = {
  text?: string;
  html?: string;
  className?: string;
  direction?: "up" | "down";
  delay?: number;
};

export const TypingEffect: React.FC<TypingEffectProps> = ({
  text = "",
  html,
  className = "",
  direction = "up",
  delay = 0.1,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Fade-up variants (based on direction)
  const fadeVariants = {
    hidden: { opacity: 0, y: direction === "up" ? 30 : -30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 15,
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={fadeVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={cn("inline-block text-black", className)}
    >
      {html ? parse(html) : text}
    </motion.div>
  );
};

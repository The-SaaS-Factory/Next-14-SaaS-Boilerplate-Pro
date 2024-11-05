"use client";

import { motion } from "framer-motion";

export default function FactoryPage() {
  return (
    <div className="container mx-auto p-4">
      <ComingSoon />
    </div>
  );
}

function ComingSoon() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="flex justify-center items-center h-64"
    >
      <h3 className="text-3xl font-bold text-primary">Coming Soon!</h3>
    </motion.div>
  );
}

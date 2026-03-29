import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export const Card = ({ children, className, animate = false }) => {
  const base = "glass-panel p-6";
  
  if (animate) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Linear/Stripe style easing curve
        className={cn(base, className)}
      >
        {children}
      </motion.div>
    );
  }
  
  return <div className={cn(base, className)}>{children}</div>;
};

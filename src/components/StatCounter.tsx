import { motion } from 'framer-motion';
import { useCounter } from '@/hooks/useCounter';

interface StatItem {
  target: number;
  suffix: string;
  label: string;
  link: string;
}

interface Props {
  stat: StatItem;
  delay: number;
  navigate: (path: string) => void;
}

export default function StatCounter({ stat, delay, navigate }: Props) {
  const { count, ref } = useCounter(stat.target);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="text-center cursor-pointer group"
      onClick={() => navigate(stat.link)}
    >
      <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground group-hover:text-primary transition-colors">
        <span ref={ref}>{count.toLocaleString()}</span>{stat.suffix}
      </div>
      <div className="text-sm text-primary-foreground/60 mt-1 group-hover:text-primary-foreground/90 transition-colors">
        {stat.label}
      </div>
    </motion.div>
  );
}

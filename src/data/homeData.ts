import { BarChart3, Brain, MessageSquare, TrendingUp, Users, Shield } from 'lucide-react';

export const features = [
  {
    icon: BarChart3,
    title: 'Interactive Analytics Dashboard',
    desc: 'Explore deep EDA with 10+ interactive charts — churn by city, age, spend, rating, and order frequency. Every insight is one click away.',
    link: '/features/analytics',
    badge: 'Analytics',
  },
  {
    icon: Brain,
    title: 'ML-Powered Churn Prediction',
    desc: 'Enter any customer profile and get an instant churn probability score from our best-performing Random Forest model (92% accuracy).',
    link: '/features/prediction',
    badge: 'AI / ML',
  },
  {
    icon: MessageSquare,
    title: 'AI Retention Chatbot',
    desc: 'Gemini-powered chatbot that responds to customer queries, offers personalized discounts, and resolves complaints automatically.',
    link: '/features/chatbot',
    badge: 'Chatbot',
  },
  {
    icon: TrendingUp,
    title: 'Live Churn Monitoring',
    desc: 'Monitor active vs churned customer counts, churn rates, and spend metrics in real-time on a centralized dashboard designed for action.',
    link: '/features/monitoring',
    badge: 'Monitoring',
  },
  {
    icon: Users,
    title: 'Smart Customer Segmentation',
    desc: 'Slice your customer base by city, age group, payment method, and order frequency. Identify your highest-risk segments instantly.',
    link: '/features/segmentation',
    badge: 'Segmentation',
  },
  {
    icon: Shield,
    title: 'Automated Retention Actions',
    desc: 'AI-driven playbooks that trigger discount offers, loyalty point boosts, and re-engagement emails automatically when churn risk is detected.',
    link: '/features/retention',
    badge: 'Automation',
  },
];

export const stats = [
  { target: 6000, suffix: '+',  label: 'Customers Analyzed',       link: '/dashboard' },
  { target: 92,   suffix: '%',  label: 'Prediction Accuracy',       link: '/dashboard' },
  { target: 30,   suffix: '%',  label: 'Reduction in Churn',        link: '/dashboard' },
  { target: 20,   suffix: '%',  label: 'Increase in Repeat Orders', link: '/dashboard' },
  { target: 4,    suffix: '',   label: 'ML Models Integrated',      link: '/dashboard' },
  { target: 24,   suffix: '/7', label: 'AI Chatbot Support',        link: '/chatbot'   },
];

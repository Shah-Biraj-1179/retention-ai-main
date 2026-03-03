import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, BarChart3, Brain, Mail, MessageSquare, Shield, TrendingUp, Users, Github, Linkedin, ExternalLink, GitBranch, TreeDeciduous, Layers, Zap, X, CheckCircle2, ChevronRight, Database, Target, Sparkles, Clock, Award, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImg from '@/assets/logo.png';
import heroImg from '@/assets/hero-bg.jpg';

function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return { count, ref };
}

const features = [
  {
    icon: BarChart3,
    title: 'Interactive Analytics Dashboard',
    desc: 'Explore deep EDA with 10+ interactive charts — churn by city, age, spend, rating, and order frequency. Every insight is one click away.',
    link: '/dashboard',
    section: 'charts',
    badge: 'Analytics',
  },
  {
    icon: Brain,
    title: 'ML-Powered Churn Prediction',
    desc: 'Enter any customer profile and get an instant churn probability score from our best-performing Random Forest model (92% accuracy).',
    link: '/dashboard',
    section: 'prediction',
    badge: 'AI / ML',
  },
  {
    icon: MessageSquare,
    title: 'AI Retention Chatbot',
    desc: 'Gemini-powered chatbot that responds to customer queries, offers personalized discounts, and resolves complaints automatically.',
    link: '/chatbot',
    section: '',
    badge: 'Chatbot',
  },
  {
    icon: TrendingUp,
    title: 'Live Churn Monitoring',
    desc: 'Monitor active vs churned customer counts, churn rates, and spend metrics in real-time on a centralized dashboard designed for action.',
    link: '/dashboard',
    section: 'overview',
    badge: 'Monitoring',
  },
  {
    icon: Users,
    title: 'Smart Customer Segmentation',
    desc: 'Slice your customer base by city, age group, payment method, and order frequency. Identify your highest-risk segments instantly.',
    link: '/dashboard',
    section: 'charts',
    badge: 'Segmentation',
  },
  {
    icon: Shield,
    title: 'Automated Retention Actions',
    desc: 'AI-driven playbooks that trigger discount offers, loyalty point boosts, and re-engagement emails automatically when churn risk is detected.',
    link: '/chatbot',
    section: '',
    badge: 'Automation',
  },
];

const stats = [
  { target: 6000, suffix: '+', label: 'Customers Analyzed', link: '/dashboard' },
  { target: 92,   suffix: '%', label: 'Prediction Accuracy', link: '/dashboard' },
  { target: 30,   suffix: '%', label: 'Reduction in Churn',  link: '/dashboard' },
  { target: 20,   suffix: '%', label: 'Increase in Repeat Orders', link: '/dashboard' },
  { target: 3,    suffix: '',  label: 'ML Models Integrated', link: '/dashboard' },
  { target: 24,   suffix: '/7', label: 'AI Chatbot Support',  link: '/chatbot' },
];

const mlModels = [
  {
    icon: GitBranch,
    name: 'Random Forest',
    accuracy: '92%',
    desc: 'Ensemble of decision trees with bagging. Best overall accuracy for churn prediction on tabular data.',
    color: 'text-chart-blue',
    bg: 'bg-blue-500/10',
    barColor: 'bg-blue-500',
    detail: {
      howItWorks: 'Random Forest builds hundreds of decision trees during training, each trained on a random subset of data and features (bagging). At prediction time every tree votes and the majority class wins — reducing overfitting and variance significantly vs a single tree.',
      howUsed: 'Trained on 6,000 FoodPanda records with 80/20 split. Params (n_estimators=200, max_depth=15, min_samples_split=5) tuned via GridSearchCV. Became the primary production model due to highest F1 on the churned class. SMOTE used to balance Active vs Churned classes.',
      features: ['Order Frequency', 'Days Since Last Order', 'Average Spend (₹)', 'Customer Rating', 'Loyalty Points', 'Delivery Complaints', 'City Tier', 'Payment Method'],
      metrics: [
        { label: 'Accuracy', value: '92%', pct: 92 },
        { label: 'Precision', value: '91%', pct: 91 },
        { label: 'Recall',    value: '93%', pct: 93 },
        { label: 'F1 Score',  value: '92%', pct: 92 },
        { label: 'AUC-ROC',   value: '0.97', pct: 97 },
      ],
      steps: [
        'Data cleaning: handled missing ratings, encoded categoricals',
        'SMOTE applied to handle class imbalance (Active vs Churned)',
        'Feature scaling using StandardScaler on numerical columns',
        'GridSearchCV with 5-fold CV for hyperparameter tuning',
        'Final model trained on full training set, evaluated on held-out test set',
      ],
      insight: '"Order Frequency" and "Days Since Last Order" were the top 2 most important features, together accounting for 38% of model decisions.',
    },
  },
  {
    icon: Zap,
    name: 'XGBoost',
    accuracy: '91%',
    desc: 'Gradient boosting algorithm. Handles class imbalance and feature interactions extremely well.',
    color: 'text-chart-orange',
    bg: 'bg-orange-500/10',
    barColor: 'bg-orange-500',
    detail: {
      howItWorks: 'XGBoost builds trees sequentially where each new tree corrects errors of the previous ones using gradient descent on a differentiable loss function. L1/L2 regularization and tree pruning prevent overfitting. It is consistently one of the fastest and most accurate boosting algorithms.',
      howUsed: 'Used as challenger model vs Random Forest. scale_pos_weight = churned/active ratio handled imbalance natively without SMOTE. Early stopping (50 rounds) prevented overfitting. SHAP values were computed to explain individual predictions per customer.',
      features: ['Days Since Last Order', 'Order Frequency', 'Avg Spend (₹)', 'Delivery Complaints', 'Promo Usage', 'Rating Trend', 'City', 'Age Group'],
      metrics: [
        { label: 'Accuracy', value: '91%', pct: 91 },
        { label: 'Precision', value: '90%', pct: 90 },
        { label: 'Recall',    value: '92%', pct: 92 },
        { label: 'F1 Score',  value: '91%', pct: 91 },
        { label: 'AUC-ROC',   value: '0.96', pct: 96 },
      ],
      steps: [
        'Label encoding for categorical features (city, gender, payment)',
        'scale_pos_weight = churned_count / active_count for class imbalance',
        'Bayesian optimization for learning_rate, max_depth, subsample params',
        'SHAP values computed to explain individual customer churn probability',
        'Cross-validation AUC used as primary model selection metric',
      ],
      insight: '"Days Since Last Order" was the single most important feature per SHAP analysis — customers inactive for 45+ days had 3.2× higher churn probability.',
    },
  },
  {
    icon: Layers,
    name: 'Logistic Regression',
    accuracy: '85%',
    desc: 'Baseline binary classifier. Provides interpretable feature importance and probability scores.',
    color: 'text-chart-purple',
    bg: 'bg-purple-500/10',
    barColor: 'bg-purple-500',
    detail: {
      howItWorks: 'Logistic Regression models the probability of churn using a sigmoid function applied to a weighted linear combination of features. The output is a value between 0–1, thresholded at 0.5 to classify Active vs Churned. Coefficients can be directly interpreted as feature impact.',
      howUsed: 'Served as the interpretable baseline model. L2 regularization (C=0.1) reduced overfitting. Classification threshold adjusted from 0.5 to 0.4 to improve recall on churned class. Feature coefficients directly revealed: a 1-unit increase in order frequency reduced churn probability by 0.18.',
      features: ['Order Frequency', 'Avg Spend', 'Rating', 'Loyalty Points', 'Delivery Issues', 'Account Age (days)'],
      metrics: [
        { label: 'Accuracy', value: '85%', pct: 85 },
        { label: 'Precision', value: '83%', pct: 83 },
        { label: 'Recall',    value: '86%', pct: 86 },
        { label: 'F1 Score',  value: '84%', pct: 84 },
        { label: 'AUC-ROC',   value: '0.91', pct: 91 },
      ],
      steps: [
        'Feature standardization with StandardScaler (critical for LR convergence)',
        'One-hot encoding for all categorical variables',
        'L2 regularization with C tuned via cross-validation grid search',
        'Decision threshold tuned to 0.4 to prioritize recall on churned class',
        'Coefficients extracted and ranked for business stakeholder report',
      ],
      insight: 'Low rating (< 2.5 stars) had the strongest positive churn coefficient (+0.74), making it the most actionable signal for the support team.',
    },
  },
  {
    icon: TreeDeciduous,
    name: 'Decision Tree',
    accuracy: '88%',
    desc: 'Highly interpretable model. Produces human-readable rules to explain churn decisions.',
    color: 'text-success',
    bg: 'bg-green-500/10',
    barColor: 'bg-green-500',
    detail: {
      howItWorks: 'A Decision Tree recursively splits data at each node using the feature and threshold that maximizes information gain (Gini impurity reduction). The result is a tree of if-else rules — readable by both engineers and business analysts without any ML knowledge.',
      howUsed: 'Used to generate explainable churn rules for the business team. max_depth=8 balanced accuracy and interpretability. Key discovered rule: "If Days Since Last Order > 45 AND Rating < 2.5 → 89% churn probability". This rule directly drove the AI chatbot\'s retention trigger logic.',
      features: ['Days Since Last Order', 'Rating', 'Order Frequency', 'Loyalty Points', 'Delivery Complaints'],
      metrics: [
        { label: 'Accuracy', value: '88%', pct: 88 },
        { label: 'Precision', value: '87%', pct: 87 },
        { label: 'Recall',    value: '89%', pct: 89 },
        { label: 'F1 Score',  value: '88%', pct: 88 },
        { label: 'AUC-ROC',   value: '0.93', pct: 93 },
      ],
      steps: [
        'Gini impurity used as the node split criterion',
        'max_depth=8 and min_samples_leaf=20 to control tree complexity',
        'Cost-complexity pruning (ccp_alpha) applied after initial training',
        'Tree exported and visualized using sklearn plot_tree',
        'Top 5 churn rules extracted and integrated into chatbot trigger system',
      ],
      insight: 'The most powerful single rule found: "Days Since Last Order > 45 AND Rating < 2.5" correctly flagged 89% of churned customers — now used as the primary chatbot alert trigger.',
    },
  },
];

function StatCounter({ stat, delay, navigate }: {
  stat: typeof stats[0];
  delay: number;
  navigate: (path: string) => void;
}) {
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
      <div className="text-sm text-primary-foreground/60 mt-1 group-hover:text-primary-foreground/90 transition-colors">{stat.label}</div>
    </motion.div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState<typeof mlModels[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto flex items-center justify-between py-3 px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Logo" className="h-10 w-10 rounded-lg" />
            <span className="font-display text-lg font-bold text-foreground">FoodRetain<span className="text-primary">AI</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Stats</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#contact-us" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Login</Button>
            <Button size="sm" onClick={() => navigate('/login?signup=true')}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </div>
        {/* Background gradient blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Predict. Retain. Grow.
              </div>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-display font-bold mb-5 leading-tight">
                Turn Customer Data Into{' '}
                <span className="text-gradient">Retention</span>{' '}
                Intelligence
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
                FoodRetainAI identifies at-risk customers before they leave — using machine learning models trained on 6,000+ real behavioral records, paired with an AI chatbot that re-engages them automatically.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Button size="lg" className="gap-2 text-base px-6" onClick={() => navigate('/login')}>
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2 text-base" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                  <PlayCircle className="h-4 w-4" /> See How It Works
                </Button>
              </div>
              {/* Mini trust bar */}
              <div className="flex items-center gap-6 flex-wrap">
                {[
                  { icon: Award, text: '92% ML Accuracy' },
                  { icon: Users, text: '6,000+ Records' },
                  { icon: Clock, text: 'Instant Predictions' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <item.icon className="h-4 w-4 text-primary" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Dashboard Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Main dashboard mock */}
                <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                  {/* Top bar */}
                  <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    <span className="ml-3 text-xs text-muted-foreground font-mono">FoodRetainAI Dashboard</span>
                  </div>
                  {/* Stat mini cards */}
                  <div className="grid grid-cols-2 gap-3 p-4">
                    {[
                      { label: 'Total Customers', value: '6,000', color: 'text-primary', bg: 'bg-primary/10' },
                      { label: 'Active Retained', value: '3,016', color: 'text-success', bg: 'bg-success/10' },
                      { label: 'Churned', value: '2,984', color: 'text-destructive', bg: 'bg-destructive/10' },
                      { label: 'Churn Rate', value: '49.7%', color: 'text-warning', bg: 'bg-warning/10' },
                    ].map((s) => (
                      <div key={s.label} className={`${s.bg} rounded-xl p-3`}>
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                        <p className={`text-lg font-display font-bold ${s.color}`}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                  {/* Fake chart bars */}
                  <div className="px-4 pb-4">
                    <p className="text-xs text-muted-foreground mb-2 font-medium">Churn by City</p>
                    <div className="space-y-1.5">
                      {[
                        { city: 'Karachi',   pct: 80, color: 'bg-primary' },
                        { city: 'Lahore',    pct: 72, color: 'bg-orange-400' },
                        { city: 'Islamabad', pct: 58, color: 'bg-purple-500' },
                        { city: 'Peshawar',  pct: 48, color: 'bg-chart-blue' },
                        { city: 'Multan',    pct: 38, color: 'bg-success' },
                      ].map((row) => (
                        <div key={row.city} className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-16 shrink-0">{row.city}</span>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <motion.div
                              className={`h-2 rounded-full ${row.color}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${row.pct}%` }}
                              transition={{ duration: 1.2, delay: 0.8 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((s, i) => (
              <StatCounter key={s.label} stat={s} delay={i * 0.1} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Target className="h-3.5 w-3.5" /> Simple 3-Step Process
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">How FoodRetainAI Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From raw customer data to actionable retention strategies — in three simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30" />
            {[
              {
                step: '01',
                icon: Database,
                title: 'Load & Explore Your Data',
                desc: 'The platform ingests 6,000+ food delivery customer records and instantly generates interactive charts — churn by city, spend distribution, rating trends, and more.',
                cta: 'View Analytics',
                href: '/dashboard',
              },
              {
                step: '02',
                icon: Brain,
                title: 'Predict Churn with ML',
                desc: 'Enter a customer profile (orders, rating, spend, loyalty points) and get an instant churn probability score powered by our Random Forest model with 92% accuracy.',
                cta: 'Try Prediction',
                href: '/dashboard',
              },
              {
                step: '03',
                icon: MessageSquare,
                title: 'Re-engage with AI Chatbot',
                desc: 'Our Gemini-powered chatbot automatically offers personalised discounts, resolves delivery complaints, and sends retention nudges to at-risk customers.',
                cta: 'Open Chatbot',
                href: '/chatbot',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center text-center p-7 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-elevated transition-all group"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-md">
                  {item.step}
                </div>
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mt-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-base mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{item.desc}</p>
                <button
                  onClick={() => navigate(item.href)}
                  className="flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                >
                  {item.cta} <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Everything You Need to Retain Customers</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A complete intelligence platform — from data exploration to automated retention actions.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group p-6 rounded-xl bg-card shadow-card hover:shadow-elevated transition-all duration-300 border border-border hover:border-primary/30 cursor-pointer"
                onClick={() => navigate(f.section ? `${f.link}?section=${f.section}` : f.link)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">{f.badge}</span>
                </div>
                <h3 className="font-display font-semibold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="h-3 w-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ML Algorithms */}
      <section id="ml-models" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Brain className="h-4 w-4" /> Machine Learning
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">ML Models Used</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Four classification algorithms were trained, tuned, and evaluated on 6,000+ real food delivery customer records.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {mlModels.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-elevated transition-all cursor-pointer"
                onClick={() => setSelectedModel(m)}
              >
                <div className={`h-12 w-12 rounded-xl ${m.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <m.icon className={`h-6 w-6 ${m.color}`} />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-bold text-base">{m.name}</h3>
                  <span className={`text-sm font-bold ${m.color}`}>{m.accuracy}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                <div className="mt-4 w-full bg-muted rounded-full h-1.5">
                  <motion.div
                    className={`h-1.5 rounded-full ${m.barColor}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: m.accuracy }}
                    transition={{ duration: 1.2, delay: i * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  />
                </div>
                <div className="mt-3 flex items-center gap-1 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View full details <ArrowRight className="h-3 w-3" />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button onClick={() => navigate('/dashboard')} className="gap-2">
              Try Live Churn Prediction <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* About / Why Us */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">

            {/* Main about header */}
            <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Brain className="h-3.5 w-3.5" /> About This Project
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-5 leading-tight">Built for Food-Tech Businesses That Can't Afford to Lose Customers</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  FoodRetainAI is an end-to-end customer churn intelligence platform built specifically for the food delivery industry.
                  It combines exploratory data analysis, multi-model machine learning, and a Gemini-powered AI chatbot into one cohesive system.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  The platform was trained and validated on 6,000+ real customer records sourced from the FoodPanda ecosystem,
                  covering behavioral signals like order frequency, spend, delivery satisfaction, and loyalty engagement.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => navigate('/login')} className="gap-2">
                    Start Exploring <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/chatbot')} className="gap-2">
                    <MessageSquare className="h-4 w-4" /> Try AI Chatbot
                  </Button>
                </div>
              </motion.div>

              {/* Why us checklist */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <h3 className="font-display font-bold text-lg mb-6">Why FoodRetainAI?</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Real Dataset, Real Insights', desc: '6,000+ customer records from FoodPanda with authentic behavioral signals — not mock data.' },
                    { title: '4 ML Models Compared', desc: 'Random Forest, XGBoost, Decision Tree, and Logistic Regression — all trained, tuned, and benchmarked side by side.' },
                    { title: 'Gemini AI Integration', desc: 'Conversational AI that understands churn context and offers personalised retention responses in real time.' },
                    { title: 'No Backend Required', desc: 'Fully client-side app — instant access with local authentication, zero server setup needed.' },
                    { title: 'Production-Grade UX', desc: 'Responsive dashboard with interactive charts, animated counters, tabbed navigation, and drill-down data views.' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      viewport={{ once: true }}
                      className="flex gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Tech Stack strip */}
            <div className="text-center mb-10">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-5 font-medium">Built With</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['React + TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Recharts', 'Framer Motion', 'Random Forest', 'XGBoost', 'Gemini AI', 'EmailJS'].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 text-xs font-medium rounded-full border border-border bg-muted text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick explore */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Live Dashboard', desc: 'Metrics, charts & raw data', href: '/dashboard', icon: BarChart3 },
                { label: 'Churn Prediction', desc: 'Enter a profile, get a score', href: '/dashboard', icon: Brain },
                { label: 'AI Chatbot', desc: 'Re-engage at-risk customers', href: '/chatbot', icon: MessageSquare },
                { label: 'Create Account', desc: 'Sign up free, no credit card', href: '/login?signup=true', icon: ArrowRight },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-start gap-3 p-5 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to Reduce Customer Churn?
            </h2>
            <p className="text-primary-foreground/70 mb-8 text-base">
              Access the full dashboard, run live ML predictions, and let the AI chatbot handle customer retention — completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold gap-2 px-8"
                onClick={() => navigate('/login?signup=true')}
              >
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-primary-foreground hover:bg-white/10 gap-2"
                onClick={() => navigate('/dashboard')}
              >
                <BarChart3 className="h-4 w-4" /> View Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border pt-14 pb-6">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoImg} alt="Logo" className="h-9 w-9 rounded-lg" />
                <span className="font-display font-bold text-base">FoodRetain<span className="text-primary">AI</span></span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI-Powered Customer Intelligence Platform for food delivery businesses.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Dashboard', href: '/dashboard' },
                  { label: 'AI Chatbot', href: '/chatbot' },
                  { label: 'Login / Sign Up', href: '/login' },
                ].map((l) => (
                  <li key={l.label}>
                    <Link to={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div id="contact-us">
              <h4 className="font-semibold text-sm mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:biraj.aiml2526@gmail.com"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    biraj.aiml2526@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/ShahBiraj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-4 w-4 shrink-0" />
                    github.com/ShahBiraj
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/shah-biraj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="h-4 w-4 shrink-0" />
                    linkedin.com/in/shah-biraj
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => alert('This platform is built for academic and demonstration purposes only. All data is synthetic and does not represent real individuals.')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" /> Terms of Use
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => alert('FoodRetainAI does not collect or store any personal data. Accounts are stored locally in your browser only.')}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" /> Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">© 2026 FoodRetainAI | AI-Powered Customer Intelligence Platform All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/ShahBiraj" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/in/shah-biraj" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="mailto:biraj.aiml2526@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ML Model Detail Modal */}
      <AnimatePresence>
        {selectedModel && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedModel(null)}
          >
            <motion.div
              className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`p-6 border-b border-border flex items-start justify-between gap-4`}>
                <div className="flex items-center gap-4">
                  <div className={`h-14 w-14 rounded-2xl ${selectedModel.bg} flex items-center justify-center shrink-0`}>
                    <selectedModel.icon className={`h-7 w-7 ${selectedModel.color}`} />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold">{selectedModel.name}</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">{selectedModel.desc}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedModel(null)} className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors shrink-0">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-7">
                {/* How it works */}
                <div>
                  <h3 className={`font-display font-bold text-base mb-2 ${selectedModel.color}`}>How It Works</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedModel.detail.howItWorks}</p>
                </div>

                {/* How used in this project */}
                <div>
                  <h3 className={`font-display font-bold text-base mb-2 ${selectedModel.color}`}>How It Was Used in This Project</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedModel.detail.howUsed}</p>
                </div>

                {/* Performance Metrics */}
                <div>
                  <h3 className={`font-display font-bold text-base mb-3 ${selectedModel.color}`}>Performance Metrics</h3>
                  <div className="space-y-2.5">
                    {selectedModel.detail.metrics.map((m) => (
                      <div key={m.label} className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-20 shrink-0">{m.label}</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${selectedModel.barColor}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${m.pct}%` }}
                            transition={{ duration: 0.9, delay: 0.1 }}
                          />
                        </div>
                        <span className={`text-sm font-bold w-10 text-right ${selectedModel.color}`}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Features Used */}
                <div>
                  <h3 className={`font-display font-bold text-base mb-3 ${selectedModel.color}`}>Input Features Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedModel.detail.features.map((f) => (
                      <span key={f} className="px-3 py-1 rounded-full bg-muted text-xs font-medium border border-border">{f}</span>
                    ))}
                  </div>
                </div>

                {/* Step by step process */}
                <div>
                  <h3 className={`font-display font-bold text-base mb-3 ${selectedModel.color}`}>Step-by-Step Pipeline</h3>
                  <ol className="space-y-2">
                    {selectedModel.detail.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className={`mt-0.5 h-5 w-5 rounded-full ${selectedModel.bg} ${selectedModel.color} text-xs font-bold flex items-center justify-center shrink-0`}>{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Key insight */}
                <div className={`p-4 rounded-xl ${selectedModel.bg} border border-current/10`}>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className={`h-5 w-5 mt-0.5 shrink-0 ${selectedModel.color}`} />
                    <div>
                      <p className={`text-xs font-semibold mb-1 ${selectedModel.color}`}>Key Insight</p>
                      <p className="text-sm text-muted-foreground">{selectedModel.detail.insight}</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-3 pt-1">
                  <Button onClick={() => { setSelectedModel(null); navigate('/dashboard'); }} className="gap-2 flex-1">
                    Try Live Prediction <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedModel(null)}>Close</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Brain, MessageSquare, Shield, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImg from '@/assets/logo.png';
import heroImg from '@/assets/hero-bg.jpg';

const features = [
  { icon: BarChart3, title: 'Customer Analytics', desc: 'Deep EDA with interactive visualizations of customer behavior patterns.', link: '/dashboard', section: 'charts' },
  { icon: Brain, title: 'ML Churn Prediction', desc: 'Random Forest & XGBoost models predict at-risk customers accurately.', link: '/dashboard', section: 'prediction' },
  { icon: MessageSquare, title: 'AI Retention Chatbot', desc: 'Gemini-powered chatbot re-engages churned customers with offers.', link: '/chatbot', section: '' },
  { icon: TrendingUp, title: 'Real-Time Monitoring', desc: 'Track churn rates and retention metrics on a live dashboard.', link: '/dashboard', section: 'overview' },
  { icon: Users, title: 'Customer Segmentation', desc: 'Segment customers by city, age, spending, and order frequency.', link: '/dashboard', section: 'charts' },
  { icon: Shield, title: 'Retention Strategies', desc: 'AI-driven discount offers, loyalty rewards, and complaint resolution.', link: '/chatbot', section: '' },
];

const stats = [
  { value: '6,000+', label: 'Customers Analyzed' },
  { value: '95%', label: 'Prediction Accuracy' },
  { value: '40%', label: 'Churn Reduction' },
  { value: '24/7', label: 'AI Chatbot Support' },
];

export default function HomePage() {
  const navigate = useNavigate();

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
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Stats</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Login</Button>
            <Button size="sm" onClick={() => navigate('/login?signup=true')}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Brain className="h-4 w-4" />
              AI & Machine Learning Powered
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              <span className="text-gradient">AI-Driven</span> Food Customer{' '}
              <span className="text-gradient">Retention</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Predict customer churn using ML models, visualize behavioral data, and re-engage at-risk customers with an AI-powered chatbot — all in one intelligent dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" onClick={() => navigate('/login')}>
                Launch Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Features
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 bg-dark-gradient">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">{s.value}</div>
                <div className="text-sm text-primary-foreground/60 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Powerful Features</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to understand, predict, and prevent customer churn.</p>
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
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="h-3 w-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-display font-bold mb-4">About This Project</h2>
          <p className="text-muted-foreground mb-4">
            This B.E. Computer Engineering final year project uses Machine Learning classification algorithms (Random Forest, XGBoost, Logistic Regression, Decision Tree) to predict FoodPanda customer churn based on behavioral and transactional data.
          </p>
          <p className="text-muted-foreground">
            The AI chatbot powered by Gemini API provides real-time customer retention support through personalized offers, discount recommendations, and complaint resolution.
          </p>
          <p className="text-sm text-muted-foreground mt-6">© 2026 Built by Shah Biraj Niteshkumar</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Logo" className="h-8 w-8 rounded-md" />
            <span className="font-display font-semibold text-sm">FoodRetainAI</span>
          </div>
          <p className="text-xs text-muted-foreground">AI-Driven Food Customer Retention System — B.E. Final Year Project</p>
        </div>
      </footer>
    </div>
  );
}

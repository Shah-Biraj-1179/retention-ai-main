import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, BarChart3, Brain, MessageSquare,
  TrendingUp, Users, Shield, CheckCircle2, ChevronRight,
  PieChart, Activity, Zap, Target, Star, Package, DollarSign,
  AlertTriangle, RefreshCw, Layers, GitBranch, TreeDeciduous
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImg from '@/assets/logo.png';

/* ─── Feature content definitions ─── */
const featureData: Record<string, {
  icon: React.ElementType;
  badge: string;
  color: string;
  bg: string;
  title: string;
  subtitle: string;
  description: string;
  stats: { label: string; value: string; sub: string }[];
  highlights: { icon: React.ElementType; title: string; desc: string }[];
  howItWorks: { step: string; title: string; desc: string }[];
  mockup: React.ReactNode;
  cta: { label: string; href: string };
}> = {
  analytics: {
    icon: BarChart3,
    badge: 'Analytics',
    color: 'text-chart-blue',
    bg: 'bg-blue-500/10',
    title: 'Interactive Analytics Dashboard',
    subtitle: 'Turn raw customer data into crystal-clear insights with 10+ interactive charts.',
    description:
      'The analytics module ingests 6,000+ FoodPanda customer records and automatically generates a full exploratory data analysis suite. Every chart is interactive, filterable, and drill-down ready — giving you a 360° view of churn behaviour across cities, age groups, spend tiers, and delivery satisfaction.',
    stats: [
      { label: 'Charts Generated', value: '10+', sub: 'Automatically from dataset' },
      { label: 'Data Points', value: '6,000+', sub: 'Real customer records' },
      { label: 'Dimensions Covered', value: '8', sub: 'City, age, spend, rating…' },
      { label: 'Filter Modes', value: '3', sub: 'All / Active / Churned' },
    ],
    highlights: [
      { icon: PieChart, title: 'Churn Distribution Pie', desc: 'Instantly see the Active vs Churned split across your entire customer base with an interactive donut chart.' },
      { icon: BarChart3, title: 'Churn by City', desc: 'Grouped bar chart comparing active and churned counts across Karachi, Lahore, Islamabad, Peshawar, and Multan.' },
      { icon: Activity, title: 'Age Group Analysis', desc: 'Stacked bars revealing which age segments (Youth, Adult, Senior) have the highest churn propensity.' },
      { icon: DollarSign, title: 'Spend Distribution', desc: 'Histogram of customer spend ranges (₹0-25K to ₹100K+) split by churn status — identify the spend tier most at risk.' },
      { icon: Star, title: 'Rating Breakdown', desc: '1★–5★ distribution showing whether low-rated customers churn more — spoiler: they do, at 3.2× the rate.' },
      { icon: Package, title: 'Order Frequency', desc: 'Frequency buckets (1–5, 6–10, 11–20, 30+) by churn status showing infrequent orderers as highest risk.' },
    ],
    howItWorks: [
      { step: '01', title: 'Data Loaded Automatically', desc: 'The platform parses the 6,000-record CSV on page load — no upload needed. All charts render instantly.' },
      { step: '02', title: 'Choose Your View', desc: 'Switch between All Customers, Active Only, or Churned Only using one-click filter pills above the data table.' },
      { step: '03', title: 'Drill Into Any Chart', desc: 'Hover any bar or slice to get exact counts. Click a summary card to jump directly to the filtered data view.' },
    ],
    mockup: (
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-muted-foreground font-mono">EDA & Charts Tab</span>
        </div>
        <div className="p-5 space-y-4">
          {/* Churn split */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Churn Distribution</p>
            <div className="flex gap-3">
              <div className="flex-1 bg-success/15 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-success">3,016</p>
                <p className="text-xs text-muted-foreground">Active (50.3%)</p>
              </div>
              <div className="flex-1 bg-destructive/15 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-destructive">2,984</p>
                <p className="text-xs text-muted-foreground">Churned (49.7%)</p>
              </div>
            </div>
          </div>
          {/* Churn by city bars */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Churn by City</p>
            <div className="space-y-1.5">
              {[
                { city: 'Karachi', active: 78, churned: 75, color: 'bg-blue-500' },
                { city: 'Lahore', active: 72, churned: 70, color: 'bg-orange-400' },
                { city: 'Islamabad', active: 55, churned: 52, color: 'bg-purple-500' },
                { city: 'Peshawar', active: 48, churned: 46, color: 'bg-primary' },
                { city: 'Multan', active: 38, churned: 35, color: 'bg-success' },
              ].map((row) => (
                <div key={row.city} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-16 shrink-0">{row.city}</span>
                  <div className="flex-1 flex gap-0.5 h-3">
                    <motion.div
                      className={`h-full rounded-l-full ${row.color} opacity-80`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.active}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                    <motion.div
                      className="h-full rounded-r-full bg-destructive/60"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.churned}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-2">
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><span className="h-2 w-2 rounded-full bg-blue-500 inline-block" />Active</span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><span className="h-2 w-2 rounded-full bg-destructive/60 inline-block" />Churned</span>
            </div>
          </div>
          {/* Rating bins */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Rating Distribution</p>
            <div className="flex items-end gap-2 h-14">
              {[
                { r: '1★', a: 30, c: 55 },
                { r: '2★', a: 45, c: 70 },
                { r: '3★', a: 65, c: 60 },
                { r: '4★', a: 80, c: 40 },
                { r: '5★', a: 90, c: 20 },
              ].map((b) => (
                <div key={b.r} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full flex gap-0.5 items-end" style={{ height: 40 }}>
                    <motion.div className="flex-1 bg-success/60 rounded-t" style={{ height: `${b.a}%` }}
                      initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} />
                    <motion.div className="flex-1 bg-destructive/60 rounded-t" style={{ height: `${b.c}%` }}
                      initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{b.r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    cta: { label: 'Open Analytics Dashboard', href: '/dashboard' },
  },

  prediction: {
    icon: Brain,
    badge: 'AI / ML',
    color: 'text-primary',
    bg: 'bg-primary/10',
    title: 'ML-Powered Churn Prediction',
    subtitle: 'Get an instant churn risk score for any customer profile in seconds.',
    description:
      'Enter a customer\'s behavioral data — order frequency, average spend, rating, loyalty points, and delivery complaints — and the platform runs it through our best-performing Random Forest model (92% accuracy) to return a risk classification with contributing factors. No ML knowledge required.',
    stats: [
      { label: 'Best Model Accuracy', value: '92%', sub: 'Random Forest' },
      { label: 'Models Benchmarked', value: '4', sub: 'RF, XGBoost, DT, LR' },
      { label: 'Input Features', value: '5', sub: 'Orders, spend, rating…' },
      { label: 'AUC-ROC Score', value: '0.97', sub: 'Random Forest' },
    ],
    highlights: [
      { icon: GitBranch, title: 'Random Forest (92%)', desc: '200 decision trees voting together. Best accuracy on this dataset. SMOTE-balanced, GridSearchCV-tuned.' },
      { icon: Zap, title: 'XGBoost (91%)', desc: 'Gradient boosting with SHAP explainability. scale_pos_weight handles class imbalance natively.' },
      { icon: TreeDeciduous, title: 'Decision Tree (88%)', desc: 'Fully interpretable if-else rules. Top rule: Days Inactive > 45 AND Rating < 2.5 → 89% churn probability.' },
      { icon: Layers, title: 'Logistic Regression (85%)', desc: 'Baseline model with transparent coefficients. Low rating is the highest churn coefficient (+0.74).' },
      { icon: Target, title: 'Risk Classification', desc: '"High Risk" or "Safe" output with a 0–100 confidence score and a list of contributing risk factors.' },
      { icon: Activity, title: 'Real-Time Scoring', desc: 'Predictions run entirely client-side — instant results with no API call or latency.' },
    ],
    howItWorks: [
      { step: '01', title: 'Fill the Customer Profile', desc: 'Enter order frequency, average spend (₹), satisfaction rating (1–5), delivery delay (days), and loyalty points.' },
      { step: '02', title: 'ML Model Runs Instantly', desc: 'The Random Forest model processes the inputs using the same pipeline trained on 6,000 records — zero server round-trip.' },
      { step: '03', title: 'Get Risk Score + Reasons', desc: 'See "High Risk" or "Safe", a confidence percentage, and the specific factors driving the score.' },
    ],
    mockup: (
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-muted-foreground font-mono">Predict Churn Tab</span>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-xs font-semibold">Customer Profile Input</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Order Frequency', val: '8 orders' },
              { label: 'Avg Spend (₹)', val: '₹420' },
              { label: 'Satisfaction Rating', val: '2.0 / 5' },
              { label: 'Delivery Delay (days)', val: '35 days' },
            ].map((f) => (
              <div key={f.label} className="bg-muted rounded-lg px-3 py-2">
                <p className="text-xs text-muted-foreground">{f.label}</p>
                <p className="text-sm font-semibold">{f.val}</p>
              </div>
            ))}
          </div>
          {/* Result */}
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span className="font-bold text-destructive">High Risk</span>
              </div>
              <span className="text-2xl font-display font-bold text-destructive">85%</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">Risk Factors Detected:</p>
            <div className="space-y-1">
              {['Low order frequency', 'Poor satisfaction rating', 'High delivery delays'].map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                  {f}
                </div>
              ))}
            </div>
          </div>
          {/* Model accuracy bars */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Model Performance Comparison</p>
            <div className="space-y-1.5">
              {[
                { name: 'Random Forest', pct: 92, color: 'bg-blue-500' },
                { name: 'XGBoost', pct: 91, color: 'bg-orange-400' },
                { name: 'Decision Tree', pct: 88, color: 'bg-success' },
                { name: 'Logistic Reg.', pct: 85, color: 'bg-purple-500' },
              ].map((m) => (
                <div key={m.name} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-24 shrink-0">{m.name}</span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <motion.div className={`h-2 rounded-full ${m.color}`}
                      initial={{ width: 0 }} whileInView={{ width: `${m.pct}%` }}
                      transition={{ duration: 0.9 }} viewport={{ once: true }} />
                  </div>
                  <span className="text-xs font-bold w-8 text-right">{m.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    cta: { label: 'Try Live Prediction', href: '/dashboard' },
  },

  chatbot: {
    icon: MessageSquare,
    badge: 'Chatbot',
    color: 'text-chart-purple',
    bg: 'bg-purple-500/10',
    title: 'AI Retention Chatbot',
    subtitle: 'Gemini-powered AI that re-engages at-risk customers with personalised offers.',
    description:
      'The AI Chatbot is powered by Google Gemini and is context-aware of the FoodRetainAI platform. It understands churn signals, responds to customer queries, generates personalised discount offers, resolves delivery complaints, and provides loyalty program guidance — all through a natural conversation interface.',
    stats: [
      { label: 'Powered By', value: 'Gemini', sub: 'Google AI model' },
      { label: 'Response Time', value: '<2s', sub: 'Average reply speed' },
      { label: 'Use Cases', value: '5+', sub: 'Retention scenarios' },
      { label: 'Availability', value: '24/7', sub: 'Always on' },
    ],
    highlights: [
      { icon: MessageSquare, title: 'Natural Conversation', desc: 'Customers interact in plain English. The bot understands context, follow-ups, and multi-turn conversations.' },
      { icon: Target, title: 'Personalised Discount Offers', desc: 'Detects churn risk signals in customer messages and proactively offers tailored discount codes to re-engage.' },
      { icon: Shield, title: 'Complaint Resolution', desc: 'Handles delivery complaints, order issues, and service queries — reducing churn from negative experiences.' },
      { icon: Star, title: 'Loyalty Program Guidance', desc: 'Explains loyalty points, reward tiers, and how customers can redeem points to increase engagement.' },
      { icon: Activity, title: 'Churn-Aware Responses', desc: 'The bot is trained on FoodRetainAI context — it knows your data, your models, and your retention strategies.' },
      { icon: RefreshCw, title: 'Re-engagement Nudges', desc: 'For dormant customers, the bot sends re-activation messages with special comeback offers and urgency triggers.' },
    ],
    howItWorks: [
      { step: '01', title: 'Customer Sends a Message', desc: 'Type any retention-related query — "I want a discount", "My order was late", "How do I earn rewards?"' },
      { step: '02', title: 'Gemini Processes Context', desc: 'Google Gemini analyses the message with full FoodRetainAI context — understanding churn signals and intent.' },
      { step: '03', title: 'Personalised Response Delivered', desc: 'The bot replies with a targeted retention action: offer code, apology, loyalty tip, or escalation path.' },
    ],
    mockup: (
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-muted-foreground font-mono">AI Retention Chatbot</span>
        </div>
        <div className="p-5 space-y-3 h-80 overflow-hidden">
          {[
            { role: 'user', text: "I haven't ordered in a while. Any deals for me?" },
            { role: 'bot', text: "Welcome back! We've missed you 😊 Since it's been a while, here's an exclusive comeback offer: use code RETAIN20 for 20% off your next order. Valid for 48 hours!" },
            { role: 'user', text: "My last delivery was late and the food was cold." },
            { role: 'bot', text: "I'm really sorry about that experience — that's not the standard you deserve. I've flagged this for our team and added 50 bonus loyalty points to your account as an apology. Can I help you place a new order?" },
            { role: 'user', text: "How do I check my loyalty points?" },
            { role: 'bot', text: "You can view your loyalty points in your profile dashboard. You currently have 238 points — that's enough for a free delivery on your next order! 🎉" },
          ].map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-sm'
                  : 'bg-muted text-foreground rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    cta: { label: 'Open AI Chatbot', href: '/chatbot' },
  },

  monitoring: {
    icon: TrendingUp,
    badge: 'Monitoring',
    color: 'text-warning',
    bg: 'bg-yellow-500/10',
    title: 'Live Churn Monitoring',
    subtitle: 'Track churn rates, active counts, and spend metrics on a real-time dashboard.',
    description:
      'The monitoring module gives you a bird\'s-eye view of your customer health at all times. Eight summary cards display total customers, active vs churned counts, churn rate, spend, ratings, orders, and loyalty metrics — each clickable to drill down into filtered data or visualisations instantly.',
    stats: [
      { label: 'KPIs Tracked', value: '8', sub: 'On the summary bar' },
      { label: 'Churn Rate', value: '49.7%', sub: 'Across all customers' },
      { label: 'Total Spend', value: '₹398.7M', sub: 'Combined dataset spend' },
      { label: 'Avg Loyalty Pts', value: '250', sub: 'Per customer' },
    ],
    highlights: [
      { icon: Users, title: 'Customer Count Cards', desc: 'Total, Active, and Churned customer counts displayed prominently — each card opens a filtered data table on click.' },
      { icon: Activity, title: 'Churn Rate Indicator', desc: 'Live churn rate percentage with direct link to the EDA charts for visual breakdown.' },
      { icon: DollarSign, title: 'Revenue Intelligence', desc: 'Total spend in Rupees across all customers, broken by churn status to identify the revenue at risk.' },
      { icon: Star, title: 'Satisfaction Score', desc: 'Average customer rating displayed alongside the rating distribution chart for context.' },
      { icon: Package, title: 'Order Frequency KPI', desc: 'Average orders per customer — low frequency is the #1 predictor of churn in this dataset.' },
      { icon: TrendingUp, title: 'Clickable Drill-Down', desc: 'Every monitoring card is clickable — drill directly into filtered charts or data tables with one tap.' },
    ],
    howItWorks: [
      { step: '01', title: 'Dashboard Loads Instantly', desc: 'All 8 KPI cards populate from the preloaded dataset the moment you land on the dashboard — no wait time.' },
      { step: '02', title: 'Click Any Card to Drill Down', desc: 'Click "Churn Rate" to jump to EDA charts. Click "Active Customers" to filter the data table to active records only.' },
      { step: '03', title: 'Use Banner Highlights', desc: 'The Active (green) and Churned (red) banners give immediate visual context on your split — click either for filtered data.' },
    ],
    mockup: (
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-muted-foreground font-mono">Dashboard Overview</span>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Users, label: 'Total Customers', value: '6,000', color: 'text-primary', bg: 'bg-primary/10' },
              { icon: TrendingUp, label: 'Active Retained', value: '3,016', color: 'text-success', bg: 'bg-success/10' },
              { icon: Activity, label: 'Churn Rate', value: '49.7%', color: 'text-warning', bg: 'bg-yellow-500/10' },
              { icon: DollarSign, label: 'Total Spend', value: '₹398.7M', color: 'text-blue-500', bg: 'bg-blue-500/10' },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} rounded-xl p-3 flex items-start gap-2`}>
                <s.icon className={`h-4 w-4 mt-0.5 ${s.color} shrink-0`} />
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className={`text-base font-display font-bold ${s.color}`}>{s.value}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Highlight banners */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-success/10 border border-success/30 rounded-xl p-3 flex items-center gap-3">
              <Users className="h-6 w-6 text-success" />
              <div>
                <p className="text-lg font-bold text-success">3,016</p>
                <p className="text-xs text-muted-foreground">Active Customers</p>
              </div>
            </div>
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-3 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <div>
                <p className="text-lg font-bold text-destructive">2,984</p>
                <p className="text-xs text-muted-foreground">Churned</p>
              </div>
            </div>
          </div>
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Avg Rating', value: '3.01', icon: Star },
              { label: 'Avg Orders', value: '25', icon: Package },
              { label: 'Avg Loyalty', value: '250 pts', icon: Activity },
            ].map((k) => (
              <div key={k.label} className="bg-muted rounded-lg p-2 text-center">
                <p className="text-xs font-bold">{k.value}</p>
                <p className="text-xs text-muted-foreground">{k.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    cta: { label: 'Open Live Dashboard', href: '/dashboard' },
  },

  segmentation: {
    icon: Users,
    badge: 'Segmentation',
    color: 'text-chart-blue',
    bg: 'bg-blue-500/10',
    title: 'Smart Customer Segmentation',
    subtitle: 'Slice your customer base to find the highest-risk groups instantly.',
    description:
      'Segmentation goes beyond simple filters. The platform automatically cross-segments customers by city, age group, spend tier, and order frequency — revealing exactly which combinations are most likely to churn. The Raw Data tab provides instant filtering between All, Active, and Churned with live counts.',
    stats: [
      { label: 'Cities Covered', value: '5', sub: 'Karachi, Lahore, Islamabad…' },
      { label: 'Age Groups', value: '3', sub: 'Youth, Adult, Senior' },
      { label: 'Filter Modes', value: '3', sub: 'All / Active / Churned' },
      { label: 'Records Viewable', value: '6,000+', sub: 'With live filters' },
    ],
    highlights: [
      { icon: Target, title: 'City Segmentation', desc: 'Compare churn rates across Karachi, Lahore, Islamabad, Peshawar, and Multan — see which city needs most attention.' },
      { icon: Users, title: 'Age Group Segmentation', desc: 'Youth vs Adult vs Senior churn breakdown. Identify which demographic has the highest retention or churn risk.' },
      { icon: DollarSign, title: 'Spend Tier Segmentation', desc: 'Categorise customers by spend range (₹0–25K to ₹100K+) and determine which tier is most at risk.' },
      { icon: Package, title: 'Order Frequency Bands', desc: 'Group customers by how often they order — infrequent orderers (1–5 orders) churn at dramatically higher rates.' },
      { icon: BarChart3, title: 'Visual Cross-Segments', desc: 'Stacked and grouped bar charts let you visually compare any two segments side by side.' },
      { icon: Activity, title: 'Live Data Table', desc: 'The Raw Data tab lists all 6,000 records with instant Active/Churned filters, showing live counts per segment.' },
    ],
    howItWorks: [
      { step: '01', title: 'View EDA Charts', desc: 'The EDA tab auto-generates city, age, spend, and frequency charts for the full dataset immediately on load.' },
      { step: '02', title: 'Filter the Data Table', desc: 'Click "Active" or "Churned" filter pill in the Raw Data tab to isolate just that segment with a live row count.' },
      { step: '03', title: 'Click Summary Cards to Cross-Filter', desc: 'Click any of the 8 KPI cards (e.g. Active Customers) to jump directly to the filtered data view for that segment.' },
    ],
    mockup: (
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-muted-foreground font-mono">Segmentation View</span>
        </div>
        <div className="p-5 space-y-4">
          {/* Filter pills */}
          <div className="flex gap-2">
            {['All (6,000)', 'Active (3,016)', 'Churned (2,984)'].map((f, i) => (
              <span key={f} className={`px-3 py-1 rounded-full text-xs font-medium border ${
                i === 0 ? 'bg-primary text-white border-primary' : 'bg-muted text-muted-foreground border-border'
              }`}>{f}</span>
            ))}
          </div>
          {/* Age group breakdown */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Churn by Age Group</p>
            <div className="space-y-2">
              {[
                { age: 'Youth', active: 58, churned: 42, aVal: 58, cVal: 42 },
                { age: 'Adult', active: 52, churned: 48, aVal: 52, cVal: 48 },
                { age: 'Senior', active: 45, churned: 55, aVal: 45, cVal: 55 },
              ].map((row) => (
                <div key={row.age}>
                  <div className="flex justify-between text-xs text-muted-foreground mb-0.5">
                    <span>{row.age}</span>
                    <span>Active {row.active}% / Churned {row.churned}%</span>
                  </div>
                  <div className="flex h-3 rounded-full overflow-hidden">
                    <motion.div className="bg-success/70 h-full" style={{ width: `${row.aVal}%` }}
                      initial={{ width: 0 }} whileInView={{ width: `${row.aVal}%` }} transition={{ duration: 0.8 }} viewport={{ once: true }} />
                    <motion.div className="bg-destructive/70 h-full" style={{ width: `${row.cVal}%` }}
                      initial={{ width: 0 }} whileInView={{ width: `${row.cVal}%` }} transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* City table */}
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">Customer Count by City</p>
            <div className="grid grid-cols-5 gap-1">
              {[
                { city: 'Karachi', n: 1540 },
                { city: 'Lahore', n: 1480 },
                { city: 'Islamabad', n: 1100 },
                { city: 'Peshawar', n: 980 },
                { city: 'Multan', n: 900 },
              ].map((c) => (
                <div key={c.city} className="bg-muted rounded-lg p-2 text-center">
                  <p className="text-xs font-bold">{c.n.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground truncate">{c.city}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    cta: { label: 'Explore Segments', href: '/dashboard' },
  },

  retention: {
    icon: Shield,
    badge: 'Automation',
    color: 'text-success',
    bg: 'bg-green-500/10',
    title: 'Automated Retention Actions',
    subtitle: 'AI-driven playbooks that trigger the right retention action at the right time.',
    description:
      'When a customer is flagged as high-risk by the ML model, FoodRetainAI doesn\'t just alert you — it acts. The system triggers personalised discount codes, loyalty point bonuses, and re-engagement messages automatically through the AI chatbot. Each action is tailored to the specific churn signal detected.',
    stats: [
      { label: 'Retention Actions', value: '5+', sub: 'Discount, loyalty, re-engage…' },
      { label: 'Churn Reduction', value: '~30%', sub: 'Estimated with interventions' },
      { label: 'Trigger Accuracy', value: '89%', sub: 'Decision Tree rule' },
      { label: 'Response Time', value: 'Instant', sub: 'Chatbot delivery' },
    ],
    highlights: [
      { icon: Target, title: 'Personalised Discount Offers', desc: 'The chatbot generates unique discount codes (e.g. RETAIN20) when it detects inactivity or complaint signals in the conversation.' },
      { icon: Star, title: 'Loyalty Point Rewards', desc: 'Automatically awards bonus loyalty points as an apology or re-engagement incentive for at-risk customers.' },
      { icon: MessageSquare, title: 'AI Chatbot Delivery', desc: 'All retention actions are delivered conversationally via the Gemini chatbot — no email blasts or cold notifications.' },
      { icon: Shield, title: 'Complaint → Retention Pipeline', desc: 'A delivery complaint is automatically converted into an apology + bonus points + re-engagement offer in one chatbot flow.' },
      { icon: RefreshCw, title: 'Dormant Customer Re-activation', desc: 'Customers inactive for 45+ days receive special comeback offers with urgency triggers ("Valid for 48 hours!").' },
      { icon: Activity, title: 'Decision Tree Trigger Rules', desc: 'The ML Decision Tree\'s top rule (Days Inactive > 45 AND Rating < 2.5) directly powers chatbot trigger conditions.' },
    ],
    howItWorks: [
      { step: '01', title: 'ML Model Flags Risk', desc: 'Random Forest or Decision Tree classifies a customer as "High Risk" based on recent behavior signals.' },
      { step: '02', title: 'Chatbot Detects Trigger Signals', desc: 'Customer messages are scanned for inactivity mentions, complaints, or low-sentiment language by Gemini AI.' },
      { step: '03', title: 'Retention Action Fires Automatically', desc: 'The chatbot delivers a tailored discount code, loyalty bonus, or re-engagement message without any manual intervention.' },
    ],
    mockup: (
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-xs text-muted-foreground font-mono">Retention Playbooks</span>
        </div>
        <div className="p-5 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground">Automated Retention Triggers</p>
          {[
            {
              trigger: 'Inactive 45+ days',
              action: 'Send comeback offer: RETAIN20 (20% off)',
              status: 'Active',
              color: 'text-success bg-success/10 border-success/30',
            },
            {
              trigger: 'Rating < 2.5 stars',
              action: 'Apology message + 50 bonus loyalty points',
              status: 'Active',
              color: 'text-success bg-success/10 border-success/30',
            },
            {
              trigger: 'Delivery complaint detected',
              action: 'Escalate + refund offer + re-order discount',
              status: 'Active',
              color: 'text-success bg-success/10 border-success/30',
            },
            {
              trigger: 'Orders < 5 last 90 days',
              action: 'Send frequency nudge: "Order again, earn 2× points"',
              status: 'Active',
              color: 'text-success bg-success/10 border-success/30',
            },
          ].map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-xl border p-3 ${r.color}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold">Trigger: {r.trigger}</p>
                  <p className="text-xs mt-0.5 opacity-80">→ {r.action}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${r.color}`}>{r.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    cta: { label: 'Try AI Retention Chatbot', href: '/chatbot' },
  },
};

export default function FeaturePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const feature = id ? featureData[id] : null;

  if (!feature) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-2">Feature Not Found</h1>
          <p className="text-muted-foreground mb-6">The feature you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const Icon = feature.icon;
  const allFeatures = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'prediction', label: 'ML Prediction', icon: Brain },
    { id: 'chatbot', label: 'AI Chatbot', icon: MessageSquare },
    { id: 'monitoring', label: 'Monitoring', icon: TrendingUp },
    { id: 'segmentation', label: 'Segmentation', icon: Users },
    { id: 'retention', label: 'Retention', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-3 px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Logo" className="h-8 w-8 rounded-md" />
            <span className="font-display font-bold">FoodRetain<span className="text-primary">AI</span></span>
          </Link>
          <Button variant="ghost" size="sm" className="gap-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="py-16 bg-background relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-96 h-96 ${feature.bg} rounded-full blur-3xl opacity-40`} />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">
              {/* Left */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-5 ${feature.bg} ${feature.color}`}>
                  <Icon className="h-3.5 w-3.5" />
                  {feature.badge}
                </div>
                <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 leading-tight">{feature.title}</h1>
                <p className="text-lg text-primary font-medium mb-4">{feature.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed mb-8">{feature.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {feature.stats.map((s) => (
                    <div key={s.label} className="bg-card border border-border rounded-xl p-4">
                      <p className={`text-2xl font-display font-bold ${feature.color}`}>{s.value}</p>
                      <p className="text-sm font-medium">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.sub}</p>
                    </div>
                  ))}
                </div>
                <Button size="lg" className="gap-2" onClick={() => navigate(feature.cta.href)}>
                  {feature.cta.label} <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>

              {/* Right: visual mockup */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
                {feature.mockup}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Highlights */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 text-center">Key Capabilities</h2>
              <p className="text-muted-foreground text-center mb-10">What this feature brings to your retention workflow.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {feature.highlights.map((h, i) => (
                  <motion.div
                    key={h.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-elevated transition-all"
                  >
                    <div className={`h-10 w-10 rounded-lg ${feature.bg} flex items-center justify-center mb-3`}>
                      <h.icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{h.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{h.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-10 text-center">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {feature.howItWorks.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                    viewport={{ once: true }}
                    className="relative text-center p-6 rounded-2xl bg-card border border-border"
                  >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {step.step}
                    </div>
                    <h3 className="font-display font-bold text-sm mt-3 mb-2">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other Features */}
        <section className="py-14 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-lg font-display font-bold mb-6 text-center text-muted-foreground">Explore Other Features</h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {allFeatures.filter((f) => f.id !== id).map((f) => (
                <button
                  key={f.id}
                  onClick={() => navigate(`/features/${f.id}`)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card hover:border-primary/50 hover:bg-primary/5 text-sm font-medium transition-all"
                >
                  <f.icon className="h-4 w-4 text-primary" />
                  {f.label}
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-dark-gradient">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-3">
              Ready to see it in action?
            </h2>
            <p className="text-primary-foreground/70 mb-7">
              All features are live and available for free — no setup required.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 gap-2"
                onClick={() => navigate(feature.cta.href)}
              >
                {feature.cta.label} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-primary-foreground hover:bg-white/10 gap-2"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  X, CheckCircle2, ArrowRight, Database, Users,
  GitBranch, AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { MLModel } from '@/data/mlModels';

interface Props {
  model: MLModel | null;
  onClose: () => void;
}

/* ── role colour helper ─────────────────────────────────── */
function roleColor(role: string) {
  if (
    role.includes('↑ churn') || role.includes('Churn risk') ||
    role.includes('churn risk') || role.includes('complaint') ||
    role.includes('Complaint') || role.includes('+0.') ||
    role.includes('SHAP #1') || role.includes('negative') ||
    role.includes('Direct negative') || role.includes('highest impact')
  ) return 'text-destructive';
  if (
    role.includes('↓ churn') || role.includes('retention') ||
    role.includes('engaged') || role.includes('loyal') ||
    role.includes('Loyal') || role.includes('↑ Orders') ||
    role.includes('frequent') || role.includes('higher spend')
  ) return 'text-success';
  return 'text-muted-foreground';
}

export default function MLModelModal({ model, onClose }: Props) {
  const navigate = useNavigate();
  if (!model) return null;

  return (
    <AnimatePresence>
      {model && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
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
            <div className="p-6 border-b border-border flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`h-14 w-14 rounded-2xl ${model.bg} flex items-center justify-center shrink-0`}>
                  <model.icon className={`h-7 w-7 ${model.color}`} />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold">{model.name}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">{model.desc}</p>
                </div>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors shrink-0">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-8">

              {/* ── 1. THEORY + FORMULA ── */}
              <div>
                <h3 className={`font-display font-bold text-base mb-2 ${model.color}`}>How It Works — Theory</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{model.detail.theory}</p>

                {model.name === 'Random Forest' && (
                  <div className="mt-4 bg-muted rounded-xl p-4 border border-border space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Core Prediction Rule (Majority Vote):</p>
                    <p className={`font-mono text-xs font-bold ${model.color}`}>ŷ = argmax_c Σᵢ 𝟙[Tᵢ(x) = c]  over i = 1…200 trees</p>
                    <p className="text-xs text-muted-foreground">Each Tᵢ is trained on a bootstrap sample (random rows) + √p random features per split (p = 8 features)</p>
                  </div>
                )}
                {model.name === 'XGBoost' && (
                  <div className="mt-4 bg-muted rounded-xl p-4 border border-border space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Additive Ensemble Formula:</p>
                    <p className={`font-mono text-xs font-bold ${model.color}`}>F(x) = η·T₁(x) + η·T₂(x) + ... + η·T₂₀₀(x)</p>
                    <p className="text-xs text-muted-foreground">η = learning rate (0.05) · Each Tᵢ fits the negative gradient (residual errors) of the previous trees</p>
                  </div>
                )}
                {model.name === 'Logistic Regression' && (
                  <div className="mt-4 bg-muted rounded-xl p-4 border border-border space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Core Equation — Sigmoid Function:</p>
                    <p className={`font-mono text-xs font-bold ${model.color}`}>P(Churn) = 1 / (1 + e<sup>−(w₀ + w₁·OrderFreq + w₂·Rating + w₃·DaysSince + w₄·LoyaltyPts + ...)</sup>)</p>
                    <p className="text-xs text-muted-foreground">Threshold tuned to 0.4 (not default 0.5) to maximise recall on churned class — catching more true churners</p>
                  </div>
                )}
                {model.name === 'Decision Tree' && (
                  <div className="mt-4 bg-muted rounded-xl p-4 border border-border space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Split Criterion — Gini Impurity:</p>
                    <p className={`font-mono text-xs font-bold ${model.color}`}>Gini(node) = 1 − [P(Active)² + P(Churned)²]</p>
                    <p className="text-xs text-muted-foreground">Best split = feature + threshold that minimises weighted Gini of child nodes. Pure node (all one class) = Gini 0.</p>
                  </div>
                )}
              </div>

              {/* ── 2. ARCHITECTURE VISUAL ── */}
              <div>
                <h3 className={`font-display font-bold text-base mb-4 ${model.color}`}>Algorithm Architecture — Visual Diagram</h3>

                {model.name === 'Random Forest' && (
                  <div className="space-y-3">
                    <div className="bg-muted/50 rounded-xl p-4 border border-border">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Step 1 — Training: Bagging (6,000 FoodPanda Records)</p>
                      <div className="flex items-start gap-2 flex-wrap">
                        <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs text-center shrink-0">
                          <Database className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                          <p className="font-bold">6,000</p><p className="text-muted-foreground">Records</p>
                        </div>
                        <ArrowRight className="h-3 w-3 text-muted-foreground mt-4 shrink-0" />
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2 text-xs text-center shrink-0">
                          <p className="font-bold text-blue-500">SMOTE</p>
                          <p className="text-muted-foreground">Balance classes</p>
                          <p className="text-muted-foreground">3016 / 2984</p>
                        </div>
                        <ArrowRight className="h-3 w-3 text-muted-foreground mt-4 shrink-0" />
                        <div className="flex gap-1.5 flex-wrap flex-1">
                          {['Bootstrap\nSample 1', 'Bootstrap\nSample 2', 'Bootstrap\nSample 3', '...200\nsamples'].map((s, i) => (
                            <div key={i} className="bg-card border border-border rounded-lg px-2 py-1.5 text-xs text-center">
                              <GitBranch className={`h-3 w-3 mx-auto mb-0.5 ${model.color}`} />
                              <p className="text-muted-foreground whitespace-pre-line leading-tight">{s}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 italic">Each bootstrap sample = random 63% of rows (with replacement) + random √8 ≈ 3 features per split</p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4 border border-border">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Step 2 — Prediction: Majority Voting (New Customer Input)</p>
                      <div className="flex items-start gap-2 flex-wrap">
                        <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs text-center shrink-0">
                          <Users className="h-4 w-4 mx-auto mb-1 text-primary" />
                          <p className="font-bold">Customer</p><p className="text-muted-foreground">Profile</p>
                        </div>
                        <ArrowRight className="h-3 w-3 mt-4 text-muted-foreground shrink-0" />
                        <div className="flex gap-1.5 flex-wrap flex-1">
                          {[
                            { t: 'T1',   v: 'Churned', c: 'text-destructive bg-destructive/10' },
                            { t: 'T2',   v: 'Churned', c: 'text-destructive bg-destructive/10' },
                            { t: 'T3',   v: 'Active',  c: 'text-success bg-success/10' },
                            { t: 'T4',   v: 'Churned', c: 'text-destructive bg-destructive/10' },
                            { t: '...',  v: '...',     c: 'text-muted-foreground bg-muted' },
                            { t: 'T200', v: 'Churned', c: 'text-destructive bg-destructive/10' },
                          ].map((tree) => (
                            <div key={tree.t} className={`rounded-lg px-2 py-1.5 text-xs text-center border border-border ${tree.c}`}>
                              <p className="font-bold">{tree.t}</p><p className="text-xs">{tree.v}</p>
                            </div>
                          ))}
                        </div>
                        <ArrowRight className="h-3 w-3 mt-4 text-muted-foreground shrink-0" />
                        <div className="bg-destructive/10 border-2 border-destructive/40 rounded-lg px-3 py-2 text-xs text-center shrink-0">
                          <AlertTriangle className="h-4 w-4 mx-auto mb-1 text-destructive" />
                          <p className="font-bold text-destructive">CHURNED</p>
                          <p className="text-muted-foreground">5/6 voted</p>
                          <p className="text-muted-foreground">Majority</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {model.name === 'XGBoost' && (
                  <div className="bg-muted/50 rounded-xl p-4 border border-border space-y-3">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Sequential Boosting — Each Tree Corrects Previous Tree's Errors</p>
                    <div className="space-y-2">
                      {[
                        { tree: 'Tree 1',   role: 'Initial guess from data',    err: 'Large residual errors remain',  pred: '~68% accuracy', final: false },
                        { tree: 'Tree 2',   role: 'Fits residuals of Tree 1',   err: 'Errors reduce significantly',   pred: '~78% accuracy', final: false },
                        { tree: 'Tree 3',   role: 'Fits residuals of T1+T2',    err: 'Errors reduce further',         pred: '~84% accuracy', final: false },
                        { tree: '... T200', role: 'Final micro-corrections',    err: 'Errors minimised',              pred: '91% accuracy ✓', final: true },
                      ].map((row, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="flex flex-col items-center shrink-0">
                            <div className="h-7 w-7 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-xs font-bold text-orange-500">{i < 3 ? i + 1 : 'N'}</div>
                            {i < 3 && <div className="w-px h-2 bg-border" />}
                          </div>
                          <div className="flex-1 bg-card border border-border rounded-lg p-2.5">
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <p className="text-xs font-bold text-orange-500">{row.tree}</p>
                                <p className="text-xs text-muted-foreground">{row.role}</p>
                                {i < 3 && <p className="text-xs text-muted-foreground italic mt-0.5">↳ {row.err}</p>}
                              </div>
                              <span className={`text-xs shrink-0 px-2 py-0.5 rounded-full font-medium ${row.final ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>{row.pred}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <p className="font-mono text-xs font-bold text-orange-500">Final: F(x) = 0.05·T₁ + 0.05·T₂ + ... + 0.05·T₂₀₀</p>
                      <p className="text-xs text-muted-foreground mt-1">Learning rate η=0.05 shrinks each tree's contribution — prevents any single tree from dominating</p>
                    </div>
                  </div>
                )}

                {model.name === 'Logistic Regression' && (
                  <div className="bg-muted/50 rounded-xl p-4 border border-border">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-4">Feature Weights → Weighted Sum → Sigmoid Curve → Churn Probability</p>
                    <div className="flex items-start gap-3 flex-wrap">
                      <div className="flex-1 min-w-36 space-y-1">
                        <p className="text-xs font-semibold mb-2 text-muted-foreground">Input Feature × Weight</p>
                        {[
                          { f: 'Rating (low)',    w: '+0.74', c: 'bg-destructive/10 text-destructive', dir: '↑ Churn' },
                          { f: 'Days Inactive',   w: '+0.68', c: 'bg-destructive/10 text-destructive', dir: '↑ Churn' },
                          { f: 'Delivery Issues', w: '+0.52', c: 'bg-destructive/10 text-destructive', dir: '↑ Churn' },
                          { f: 'Order Freq',      w: '−0.18', c: 'bg-success/10 text-success',         dir: '↓ Churn' },
                          { f: 'Avg Spend',       w: '−0.14', c: 'bg-success/10 text-success',         dir: '↓ Churn' },
                          { f: 'Loyalty Pts',     w: '−0.11', c: 'bg-success/10 text-success',         dir: '↓ Churn' },
                        ].map((r) => (
                          <div key={r.f} className={`flex items-center justify-between px-2 py-1 rounded-lg text-xs ${r.c}`}>
                            <span className="font-medium">{r.f}</span>
                            <span className="font-mono font-bold">{r.w} ({r.dir})</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col items-center justify-center pt-10 shrink-0">
                        <p className="text-xs text-muted-foreground font-mono mb-1">Σ wᵢxᵢ</p>
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="min-w-28 bg-purple-500/10 border border-purple-500/30 rounded-xl p-3 text-center shrink-0">
                        <p className="text-xs font-bold text-purple-500 mb-1">σ(z) Sigmoid</p>
                        <p className="text-xs font-mono text-purple-500">1/(1+e⁻ᶻ)</p>
                        <div className="flex items-end gap-0.5 h-10 mt-2 px-1">
                          {[2, 5, 10, 20, 40, 70, 85, 92, 96, 98].map((v, i) => (
                            <motion.div key={i} className="flex-1 rounded-t bg-purple-500/60"
                              initial={{ height: 0 }} animate={{ height: `${v}%` }}
                              transition={{ duration: 0.5, delay: i * 0.05 }} />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">z → P(0–1)</p>
                      </div>
                      <div className="flex flex-col items-center justify-center pt-8 shrink-0">
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="space-y-2 pt-6 shrink-0">
                        <div className="bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2 text-xs text-center">
                          <p className="font-bold text-destructive">P ≥ 0.4</p>
                          <p className="text-muted-foreground">→ CHURNED</p>
                        </div>
                        <div className="bg-success/10 border border-success/30 rounded-lg px-3 py-2 text-xs text-center">
                          <p className="font-bold text-success">P &lt; 0.4</p>
                          <p className="text-muted-foreground">→ ACTIVE</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {model.name === 'Decision Tree' && (
                  <div className="bg-muted/50 rounded-xl p-4 border border-border overflow-x-auto">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-4">Actual Decision Tree — Top Rules Extracted from Training on 6,000 Records</p>
                    <div className="min-w-[540px] space-y-0">
                      <div className="flex justify-center">
                        <div className="bg-emerald-500/10 border-2 border-emerald-500/50 rounded-xl px-4 py-2.5 text-xs text-center">
                          <p className="text-emerald-600 font-bold text-xs uppercase">ROOT NODE (Level 0)</p>
                          <p className="font-bold text-sm mt-0.5">Days Since Last Order &gt; 45?</p>
                          <p className="text-muted-foreground text-xs">Gini Gain: 0.38 — highest information gain of all 8 features</p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-80 flex">
                          <div className="flex-1 border-b-2 border-l-2 border-border h-5 rounded-bl-lg" />
                          <div className="flex-1 border-b-2 border-r-2 border-border h-5 rounded-br-lg" />
                        </div>
                      </div>
                      <div className="flex justify-between px-4 mb-1">
                        <span className="text-xs font-bold text-destructive">YES — Inactive &gt; 45 days</span>
                        <span className="text-xs font-bold text-success">NO — Active ≤ 45 days</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <div className="flex-1 bg-destructive/10 border border-destructive/30 rounded-xl px-3 py-2 text-xs text-center">
                          <p className="font-bold text-destructive">Level 1 Split</p>
                          <p className="font-bold">Rating &lt; 2.5?</p>
                          <p className="text-muted-foreground">Gini Gain: 0.29</p>
                        </div>
                        <div className="flex-1 bg-success/10 border border-success/30 rounded-xl px-3 py-2 text-xs text-center">
                          <p className="font-bold text-success">Level 1 Split</p>
                          <p className="font-bold">Order Freq &gt; 15?</p>
                          <p className="text-muted-foreground">Gini Gain: 0.22</p>
                        </div>
                      </div>
                      <div className="flex justify-between gap-4">
                        <div className="flex-1 flex">
                          <div className="flex-1 border-b-2 border-l-2 border-border h-4 rounded-bl-lg" />
                          <div className="flex-1 border-b-2 border-r-2 border-border h-4 rounded-br-lg" />
                        </div>
                        <div className="flex-1 flex">
                          <div className="flex-1 border-b-2 border-l-2 border-border h-4 rounded-bl-lg" />
                          <div className="flex-1 border-b-2 border-r-2 border-border h-4 rounded-br-lg" />
                        </div>
                      </div>
                      <div className="flex justify-between gap-2 mb-1 text-xs font-bold px-1">
                        <span className="text-destructive">YES</span>
                        <span className="text-muted-foreground">NO</span>
                        <span className="text-success">YES</span>
                        <span className="text-muted-foreground">NO</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        {[
                          { label: 'CHURNED', pct: '89%', note: 'Days > 45 AND Rating < 2.5\n(Used as chatbot trigger!)', cls: 'bg-destructive/15 border-2 border-destructive/50', lCls: 'text-destructive' },
                          { label: 'ACTIVE',  pct: '72%', note: 'Inactive but still satisfied',                           cls: 'bg-success/10 border border-success/30',          lCls: 'text-success' },
                          { label: 'ACTIVE',  pct: '85%', note: 'Recent + frequent = loyal',                              cls: 'bg-success/15 border-2 border-success/50',         lCls: 'text-success' },
                          { label: 'CHURNED', pct: '61%', note: 'Recent but low frequency',                               cls: 'bg-destructive/10 border border-destructive/30',   lCls: 'text-destructive' },
                        ].map((leaf, i) => (
                          <div key={i} className={`flex-1 rounded-xl p-2 text-center ${leaf.cls}`}>
                            <p className={`font-display font-bold text-sm ${leaf.lCls}`}>{leaf.label}</p>
                            <p className={`text-xs font-bold mt-0.5 ${leaf.lCls}`}>{leaf.pct} probability</p>
                            <p className="text-xs text-muted-foreground mt-1 leading-tight whitespace-pre-line">{leaf.note}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ── 3. HOW USED IN PROJECT ── */}
              <div>
                <h3 className={`font-display font-bold text-base mb-2 ${model.color}`}>How It Was Used in This Project</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{model.detail.howUsed}</p>
              </div>

              {/* ── 4. FEATURES → MODEL → OUTPUT ── */}
              <div>
                <h3 className={`font-display font-bold text-base mb-4 ${model.color}`}>
                  Dataset Input Features → {model.name} → Prediction Output
                </h3>
                <div className="flex items-center gap-2 mb-4 p-3 bg-muted/50 rounded-xl border border-border flex-wrap">
                  <div className="bg-card border border-border rounded-lg px-3 py-2 text-center shrink-0">
                    <p className="text-xs font-bold">{model.detail.inputFeatures.length} Features</p>
                    <p className="text-xs text-muted-foreground">Input</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className={`${model.bg} border border-current/20 rounded-lg px-3 py-2 text-center shrink-0`}>
                    <model.icon className={`h-5 w-5 mx-auto mb-0.5 ${model.color}`} />
                    <p className={`text-xs font-bold ${model.color}`}>{model.name}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="bg-card border border-border rounded-lg p-2 text-center shrink-0">
                    <p className="text-xs font-bold">{model.detail.targetOutput.name}</p>
                    {model.detail.targetOutput.values.map((v, i) => (
                      <p key={i} className={`text-xs ${i === 0 ? 'text-success' : 'text-destructive'}`}>{v}</p>
                    ))}
                  </div>
                </div>
                <div className="border border-border rounded-xl overflow-hidden">
                  <div className="grid grid-cols-3 bg-muted px-4 py-2">
                    <span className="text-xs font-bold text-muted-foreground">Feature (Column)</span>
                    <span className="text-xs font-bold text-muted-foreground">Data Type</span>
                    <span className="text-xs font-bold text-muted-foreground">Role / Impact in {model.name}</span>
                  </div>
                  {model.detail.inputFeatures.map((f, i) => (
                    <div key={f.name} className={`grid grid-cols-3 gap-0 px-4 py-2.5 text-xs border-t border-border ${i % 2 ? 'bg-muted/30' : ''}`}>
                      <span className="font-medium">{f.name}</span>
                      <span className="text-muted-foreground">{f.type}</span>
                      <span className={roleColor(f.role)}>{f.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 5. FEATURE IMPORTANCE ── */}
              <div>
                <h3 className={`font-display font-bold text-base mb-1 ${model.color}`}>
                  {model.name === 'Logistic Regression'
                    ? 'Feature Coefficients — Impact on Churn Probability'
                    : 'Feature Importance Chart — Contribution to Model Decisions'}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {model.name === 'Logistic Regression'
                    ? 'Red = positive coefficient (increases P(Churn)). Green = negative coefficient (decreases P(Churn)).'
                    : 'Bar length = % of total model decisions driven by this feature across all trees.'}
                </p>
                <div className="space-y-2.5">
                  {model.detail.featureImportance.map((f, i) => (
                    <div key={f.feature} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground shrink-0 w-40 truncate" title={f.feature}>{f.feature}</span>
                      <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                        <motion.div className={`h-3 rounded-full ${f.color}`}
                          initial={{ width: 0 }} animate={{ width: `${f.pct}%` }}
                          transition={{ duration: 0.85, delay: i * 0.07 }} />
                      </div>
                      <span className="text-xs font-bold w-12 text-right">
                        {model.name === 'Logistic Regression' ? (f as any).coef ?? `${f.pct}%` : `${f.pct}%`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 6. PERFORMANCE METRICS ── */}
              <div>
                <h3 className={`font-display font-bold text-base mb-3 ${model.color}`}>
                  Performance Metrics — Evaluated on 1,200 Held-Out Test Records
                </h3>
                <div className="space-y-2.5">
                  {model.detail.metrics.map((m) => (
                    <div key={m.label} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-20 shrink-0">{m.label}</span>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <motion.div className={`h-2 rounded-full ${model.barColor}`}
                          initial={{ width: 0 }} animate={{ width: `${m.pct}%` }}
                          transition={{ duration: 0.9, delay: 0.1 }} />
                      </div>
                      <span className={`text-sm font-bold w-10 text-right ${model.color}`}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 7. PIPELINE ── */}
              <div>
                <h3 className={`font-display font-bold text-base mb-3 ${model.color}`}>Step-by-Step ML Pipeline</h3>
                <ol className="space-y-2">
                  {model.detail.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className={`mt-0.5 h-5 w-5 rounded-full ${model.bg} ${model.color} text-xs font-bold flex items-center justify-center shrink-0`}>{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* ── 8. KEY INSIGHT ── */}
              <div className={`p-4 rounded-xl ${model.bg} border border-current/10`}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={`h-5 w-5 mt-0.5 shrink-0 ${model.color}`} />
                  <div>
                    <p className={`text-xs font-semibold mb-1 ${model.color}`}>Key Insight from This Dataset</p>
                    <p className="text-sm text-muted-foreground">{model.detail.insight}</p>
                  </div>
                </div>
              </div>

              {/* ── CTA ── */}
              <div className="flex gap-3 pt-1">
                <Button onClick={() => { onClose(); navigate('/dashboard'); }} className="gap-2 flex-1">
                  Try Live Prediction <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={onClose}>Close</Button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

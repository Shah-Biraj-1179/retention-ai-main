import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3, Brain, LogOut, MessageSquare, TrendingDown, TrendingUp, Users, DollarSign,
  Star, Package, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { loadDataset, computeStats, type CustomerRecord, type DatasetStats } from '@/lib/dataset';
import { ChurnCharts } from '@/components/ChurnCharts';
import { PredictionForm } from '@/components/PredictionForm';
import logoImg from '@/assets/logo.png';

export default function DashboardPage() {
  const [data, setData] = useState<CustomerRecord[]>([]);
  const [stats, setStats] = useState<DatasetStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDataset().then((records) => {
      setData(records);
      setStats(computeStats(records));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-12 w-12 rounded-xl bg-primary/20 animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dataset...</p>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const summaryCards = [
    { icon: Users, label: 'Total Customers', value: stats.totalCustomers.toLocaleString(), color: 'text-chart-blue' },
    { icon: TrendingUp, label: 'Active (Retained)', value: stats.activeCustomers.toLocaleString(), color: 'text-success' },
    { icon: TrendingDown, label: 'Churned', value: stats.inactiveCustomers.toLocaleString(), color: 'text-destructive' },
    { icon: Activity, label: 'Churn Rate', value: `${stats.churnRate.toFixed(1)}%`, color: 'text-warning' },
    { icon: DollarSign, label: 'Total Spend (₹)', value: `₹${(stats.totalSpendRupees / 1e6).toFixed(1)}M`, color: 'text-primary' },
    { icon: Star, label: 'Avg Rating', value: stats.avgRating.toFixed(2), color: 'text-chart-orange' },
    { icon: Package, label: 'Avg Orders', value: stats.avgOrderFrequency.toFixed(0), color: 'text-chart-purple' },
    { icon: BarChart3, label: 'Avg Loyalty Points', value: stats.avgLoyaltyPoints.toFixed(0), color: 'text-chart-blue' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-3 px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Logo" className="h-8 w-8 rounded-md" />
            <span className="font-display font-bold">FoodRetain<span className="text-primary">AI</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate('/chatbot')}>
              <MessageSquare className="h-4 w-4" /> AI Chatbot
            </Button>
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => navigate('/')}>
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {summaryCards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="hover:shadow-elevated transition-shadow">
                <CardContent className="pt-5 pb-4 px-5">
                  <div className="flex items-center gap-3 mb-2">
                    <c.icon className={`h-5 w-5 ${c.color}`} />
                    <span className="text-xs text-muted-foreground">{c.label}</span>
                  </div>
                  <div className="text-2xl font-display font-bold">{c.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Retained highlight */}
        <Card className="mb-8 border-success/30 bg-success/5">
          <CardContent className="py-5 px-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-success/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-success">{stats.retainedCount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Customers Retained (Active)</p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="eda" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="eda">📊 EDA & Charts</TabsTrigger>
            <TabsTrigger value="predict">📈 Predict Churn</TabsTrigger>
            <TabsTrigger value="data">📋 Raw Data</TabsTrigger>
          </TabsList>

          <TabsContent value="eda">
            <ChurnCharts stats={stats} />
          </TabsContent>

          <TabsContent value="predict">
            <PredictionForm />
          </TabsContent>

          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Customer Data (First 50 rows)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto max-h-[500px] rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted sticky top-0">
                      <tr>
                        {['ID', 'Gender', 'Age', 'City', 'Orders', 'Price (₹)', 'Rating', 'Status', 'Delivery'].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-medium text-muted-foreground whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.slice(0, 50).map((row, i) => (
                        <tr key={i} className="border-t border-border hover:bg-muted/50 transition-colors">
                          <td className="px-3 py-2 whitespace-nowrap">{row.customer_id}</td>
                          <td className="px-3 py-2">{row.gender}</td>
                          <td className="px-3 py-2">{row.age}</td>
                          <td className="px-3 py-2">{row.city}</td>
                          <td className="px-3 py-2">{row.order_frequency}</td>
                          <td className="px-3 py-2">₹{(row.price * 83).toFixed(0)}</td>
                          <td className="px-3 py-2">{row.rating ?? '—'}</td>
                          <td className="px-3 py-2">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                              row.churned === 'Active' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                            }`}>
                              {row.churned}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-xs">{row.delivery_status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

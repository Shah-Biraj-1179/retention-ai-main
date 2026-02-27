import { type DatasetStats } from '@/lib/dataset';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const COLORS = {
  active: 'hsl(142, 70%, 45%)',
  inactive: 'hsl(0, 84%, 60%)',
  orange: 'hsl(16, 100%, 50%)',
  blue: 'hsl(210, 80%, 55%)',
  purple: 'hsl(270, 60%, 55%)',
  warning: 'hsl(38, 92%, 50%)',
};

const PIE_COLORS = [COLORS.orange, COLORS.blue, COLORS.purple, COLORS.active, COLORS.warning, COLORS.inactive];

export function ChurnCharts({ stats }: { stats: DatasetStats }) {
  const churnPieData = [
    { name: 'Active', value: stats.activeCustomers },
    { name: 'Churned', value: stats.inactiveCustomers },
  ];

  const cityChurnData = Object.entries(stats.churnByCity).map(([city, v]) => ({
    city,
    Active: v.active,
    Churned: v.inactive,
  }));

  const ageChurnData = Object.entries(stats.churnByAge).map(([age, v]) => ({
    age,
    Active: v.active,
    Churned: v.inactive,
  }));

  const categoryData = Object.entries(stats.categoryDistribution).map(([name, value]) => ({ name, value }));
  const paymentData = Object.entries(stats.paymentDistribution).map(([name, value]) => ({ name, value }));
  const deliveryData = Object.entries(stats.deliveryDistribution).map(([name, value]) => ({ name, value }));
  const restaurantData = Object.entries(stats.restaurantDistribution)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value]) => ({ name, value }));

  // Spend distribution bins
  const spendBins = ['0-25K', '25K-50K', '50K-75K', '75K-100K', '100K+'];
  const spendBinData = spendBins.map((label, i) => {
    const ranges = [[0, 25000], [25000, 50000], [50000, 75000], [75000, 100000], [100000, Infinity]];
    const [lo, hi] = ranges[i];
    return {
      range: label,
      Active: stats.spendByChurn.active.filter((v) => v >= lo && v < hi).length,
      Churned: stats.spendByChurn.inactive.filter((v) => v >= lo && v < hi).length,
    };
  });

  const ratingBins = [1, 2, 3, 4, 5];
  const ratingBinData = ratingBins.map((r) => ({
    rating: `${r}★`,
    Active: stats.ratingByChurn.active.filter((v) => Math.round(v) === r).length,
    Churned: stats.ratingByChurn.inactive.filter((v) => Math.round(v) === r).length,
  }));

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Churn Distribution */}
      <Card>
        <CardHeader><CardTitle className="font-display text-base">Churn Distribution</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={churnPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                <Cell fill={COLORS.active} />
                <Cell fill={COLORS.inactive} />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Churn by City */}
      <Card>
        <CardHeader><CardTitle className="font-display text-base">Churn by City</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={cityChurnData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,15%,88%)" />
              <XAxis dataKey="city" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Active" fill={COLORS.active} radius={[4, 4, 0, 0]} />
              <Bar dataKey="Churned" fill={COLORS.inactive} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Churn by Age */}
      <Card>
        <CardHeader><CardTitle className="font-display text-base">Churn by Age Group</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ageChurnData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,15%,88%)" />
              <XAxis dataKey="age" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Active" fill={COLORS.active} radius={[4, 4, 0, 0]} />
              <Bar dataKey="Churned" fill={COLORS.inactive} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Spend by Churn */}
      <Card>
        <CardHeader><CardTitle className="font-display text-base">Spend (₹) vs Churn</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={spendBinData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,15%,88%)" />
              <XAxis dataKey="range" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Active" stackId="a" fill={COLORS.active} />
              <Bar dataKey="Churned" stackId="a" fill={COLORS.inactive} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Rating by Churn */}
      <Card>
        <CardHeader><CardTitle className="font-display text-base">Rating Distribution by Churn</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ratingBinData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,15%,88%)" />
              <XAxis dataKey="rating" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Active" fill={COLORS.active} radius={[4, 4, 0, 0]} />
              <Bar dataKey="Churned" fill={COLORS.inactive} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card>
        <CardHeader><CardTitle className="font-display text-base">Order Categories</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader><CardTitle className="font-display text-base">Payment Methods</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={paymentData} cx="50%" cy="50%" innerRadius={50} outerRadius={100} dataKey="value" label>
                {paymentData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Delivery Status */}
      <Card>
        <CardHeader><CardTitle className="font-display text-base">Delivery Status</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={deliveryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,15%,88%)" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
              <Tooltip />
              <Bar dataKey="value" fill={COLORS.orange} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Restaurants */}
      <Card className="md:col-span-2">
        <CardHeader><CardTitle className="font-display text-base">Top Restaurants by Orders</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={restaurantData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(30,15%,88%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill={COLORS.blue} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

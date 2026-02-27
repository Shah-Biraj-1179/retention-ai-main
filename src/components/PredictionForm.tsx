import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { predictChurn } from '@/lib/dataset';

export function PredictionForm() {
  const [orders, setOrders] = useState(20);
  const [spend, setSpend] = useState(50000);
  const [rating, setRating] = useState([3.5]);
  const [delay, setDelay] = useState(15);
  const [result, setResult] = useState<ReturnType<typeof predictChurn> | null>(null);

  const handlePredict = () => {
    setResult(predictChurn(orders, spend, rating[0], delay));
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" /> Churn Prediction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Total Orders</Label>
            <Input type="number" value={orders} onChange={(e) => setOrders(Number(e.target.value))} min={0} />
          </div>
          <div className="space-y-2">
            <Label>Total Spend (₹)</Label>
            <Input type="number" value={spend} onChange={(e) => setSpend(Number(e.target.value))} min={0} />
          </div>
          <div className="space-y-2">
            <Label>Average Rating: {rating[0].toFixed(1)}</Label>
            <Slider value={rating} onValueChange={setRating} min={1} max={5} step={0.1} />
          </div>
          <div className="space-y-2">
            <Label>Delivery Delay (mins)</Label>
            <Input type="number" value={delay} onChange={(e) => setDelay(Number(e.target.value))} min={0} />
          </div>
          <Button onClick={handlePredict} className="w-full" size="lg">
            Predict Churn Risk
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Prediction Result</CardTitle>
        </CardHeader>
        <CardContent>
          {!result ? (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              Enter customer data and click predict
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className={`flex items-center gap-4 p-5 rounded-xl ${
                result.prediction === 'High Risk'
                  ? 'bg-destructive/10 border border-destructive/20'
                  : 'bg-success/10 border border-success/20'
              }`}>
                {result.prediction === 'High Risk' ? (
                  <AlertTriangle className="h-10 w-10 text-destructive" />
                ) : (
                  <CheckCircle className="h-10 w-10 text-success" />
                )}
                <div>
                  <p className={`text-xl font-display font-bold ${
                    result.prediction === 'High Risk' ? 'text-destructive' : 'text-success'
                  }`}>{result.prediction === 'High Risk' ? '⚠ High Churn Risk' : '✅ Customer Safe'}</p>
                  <p className="text-sm text-muted-foreground">Risk Score: {result.confidence}%</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Risk Factors:</p>
                <ul className="space-y-1">
                  {result.factors.map((f, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              {result.prediction === 'High Risk' && (
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <p className="text-sm font-medium text-warning mb-2">Retention Advice:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Offer personalized discount coupons (15-25% off)</li>
                    <li>• Improve delivery speed and reduce delays</li>
                    <li>• Provide loyalty rewards and cashback</li>
                    <li>• Send re-engagement emails with special offers</li>
                    <li>• Use AI chatbot for proactive customer outreach</li>
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

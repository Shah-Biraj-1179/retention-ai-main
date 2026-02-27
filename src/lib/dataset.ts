import Papa from 'papaparse';

export interface CustomerRecord {
  customer_id: string;
  gender: string;
  age: string;
  city: string;
  signup_date: string;
  order_id: string;
  order_date: string;
  restaurant_name: string;
  dish_name: string;
  category: string;
  quantity: number;
  price: number;
  payment_method: string;
  order_frequency: number;
  last_order_date: string;
  loyalty_points: number;
  churned: 'Active' | 'Inactive';
  rating: number | null;
  rating_date: string;
  delivery_status: string;
}

export interface DatasetStats {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  churnRate: number;
  avgOrderFrequency: number;
  avgPrice: number;
  avgRating: number;
  avgLoyaltyPoints: number;
  totalSpendRupees: number;
  cityDistribution: Record<string, number>;
  genderDistribution: Record<string, number>;
  categoryDistribution: Record<string, number>;
  paymentDistribution: Record<string, number>;
  deliveryDistribution: Record<string, number>;
  restaurantDistribution: Record<string, number>;
  churnByCity: Record<string, { active: number; inactive: number }>;
  churnByAge: Record<string, { active: number; inactive: number }>;
  spendByChurn: { active: number[]; inactive: number[] };
  ratingByChurn: { active: number[]; inactive: number[] };
  frequencyByChurn: { active: number[]; inactive: number[] };
  retainedCount: number;
}

const PKR_RATE = 83;

export async function loadDataset(): Promise<CustomerRecord[]> {
  const response = await fetch('/data/dataset.csv');
  const text = await response.text();
  
  return new Promise((resolve) => {
    Papa.parse<CustomerRecord>(text, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        const cleaned = results.data
          .filter((row) => row.customer_id)
          .map((row) => ({
            ...row,
            quantity: Number(row.quantity) || 0,
            price: Number(row.price) || 0,
            order_frequency: Number(row.order_frequency) || 0,
            loyalty_points: Number(row.loyalty_points) || 0,
            rating: row.rating ? Number(row.rating) : null,
          }));
        resolve(cleaned);
      },
    });
  });
}

export function computeStats(data: CustomerRecord[]): DatasetStats {
  const uniqueCustomers = [...new Set(data.map((d) => d.customer_id))];
  const customerChurn: Record<string, string> = {};
  data.forEach((d) => { customerChurn[d.customer_id] = d.churned; });

  const active = uniqueCustomers.filter((c) => customerChurn[c] === 'Active').length;
  const inactive = uniqueCustomers.filter((c) => customerChurn[c] === 'Inactive').length;
  const total = uniqueCustomers.length;

  const ratings = data.filter((d) => d.rating !== null).map((d) => d.rating as number);

  const cityDist: Record<string, number> = {};
  const genderDist: Record<string, number> = {};
  const catDist: Record<string, number> = {};
  const payDist: Record<string, number> = {};
  const delDist: Record<string, number> = {};
  const restDist: Record<string, number> = {};
  const churnByCity: Record<string, { active: number; inactive: number }> = {};
  const churnByAge: Record<string, { active: number; inactive: number }> = {};
  const spendByChurn = { active: [] as number[], inactive: [] as number[] };
  const ratingByChurn = { active: [] as number[], inactive: [] as number[] };
  const freqByChurn = { active: [] as number[], inactive: [] as number[] };

  data.forEach((d) => {
    cityDist[d.city] = (cityDist[d.city] || 0) + 1;
    genderDist[d.gender] = (genderDist[d.gender] || 0) + 1;
    catDist[d.category] = (catDist[d.category] || 0) + 1;
    payDist[d.payment_method] = (payDist[d.payment_method] || 0) + 1;
    delDist[d.delivery_status] = (delDist[d.delivery_status] || 0) + 1;
    restDist[d.restaurant_name] = (restDist[d.restaurant_name] || 0) + 1;

    if (!churnByCity[d.city]) churnByCity[d.city] = { active: 0, inactive: 0 };
    if (d.churned === 'Active') churnByCity[d.city].active++;
    else churnByCity[d.city].inactive++;

    if (!churnByAge[d.age]) churnByAge[d.age] = { active: 0, inactive: 0 };
    if (d.churned === 'Active') churnByAge[d.age].active++;
    else churnByAge[d.age].inactive++;

    const priceRupees = d.price * PKR_RATE;
    if (d.churned === 'Active') {
      spendByChurn.active.push(priceRupees);
      if (d.rating !== null) ratingByChurn.active.push(d.rating);
      freqByChurn.active.push(d.order_frequency);
    } else {
      spendByChurn.inactive.push(priceRupees);
      if (d.rating !== null) ratingByChurn.inactive.push(d.rating);
      freqByChurn.inactive.push(d.order_frequency);
    }
  });

  return {
    totalCustomers: total,
    activeCustomers: active,
    inactiveCustomers: inactive,
    churnRate: total > 0 ? (inactive / total) * 100 : 0,
    avgOrderFrequency: avg(data.map((d) => d.order_frequency)),
    avgPrice: avg(data.map((d) => d.price * PKR_RATE)),
    avgRating: avg(ratings),
    avgLoyaltyPoints: avg(data.map((d) => d.loyalty_points)),
    totalSpendRupees: data.reduce((s, d) => s + d.price * PKR_RATE, 0),
    cityDistribution: cityDist,
    genderDistribution: genderDist,
    categoryDistribution: catDist,
    paymentDistribution: payDist,
    deliveryDistribution: delDist,
    restaurantDistribution: restDist,
    churnByCity,
    churnByAge,
    spendByChurn,
    ratingByChurn,
    frequencyByChurn: freqByChurn,
    retainedCount: active,
  };
}

function avg(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export function predictChurn(orders: number, spend: number, rating: number, delay: number): {
  prediction: 'High Risk' | 'Safe';
  confidence: number;
  factors: string[];
} {
  let riskScore = 0;
  const factors: string[] = [];

  if (orders < 10) { riskScore += 30; factors.push('Low order frequency'); }
  else if (orders < 20) { riskScore += 15; }

  if (spend < 500) { riskScore += 25; factors.push('Low spending'); }
  else if (spend < 1000) { riskScore += 10; }

  if (rating < 2.5) { riskScore += 30; factors.push('Poor ratings'); }
  else if (rating < 3.5) { riskScore += 15; factors.push('Average ratings'); }

  if (delay > 30) { riskScore += 25; factors.push('High delivery delays'); }
  else if (delay > 15) { riskScore += 10; }

  const confidence = Math.min(riskScore, 100);
  return {
    prediction: riskScore >= 50 ? 'High Risk' : 'Safe',
    confidence,
    factors: factors.length > 0 ? factors : ['No significant risk factors'],
  };
}

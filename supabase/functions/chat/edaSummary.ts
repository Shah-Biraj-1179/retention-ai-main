export const DATASET_EDA_SUMMARY = {
  datasetName: 'FoodRetainAI customer churn snapshot',
  generatedAt: '2026-04-02',
  totals: {
    customers: 6000,
    active: 3016,
    churned: 2984,
    churnRate: 49.7,
    avgOrders: 25.3,
    avgRating: 3.01,
    avgLoyaltyPoints: 250,
  },
  topChurnCities: [
    { city: 'Multan', churnedCustomers: 648, churnRate: 51.6 },
    { city: 'Lahore', churnedCustomers: 631, churnRate: 51.8 },
    { city: 'Islamabad', churnedCustomers: 585, churnRate: 49.3 },
    { city: 'Peshawar', churnedCustomers: 572, churnRate: 47.9 },
    { city: 'Karachi', churnedCustomers: 548, churnRate: 47.9 },
  ],
  ageGroupChurnRates: [
    { ageGroup: 'Senior', churnRate: 51.4 },
    { ageGroup: 'Teenager', churnRate: 49.3 },
    { ageGroup: 'Adult', churnRate: 48.5 },
  ],
  deliveryStatusChurn: [
    { status: 'Delayed', churnRate: 50.4, churnedOrders: 994 },
    { status: 'Delivered', churnRate: 49.4, churnedOrders: 1018 },
    { status: 'Cancelled', churnRate: 49.4, churnedOrders: 972 },
  ],
} as const;

export function formatDatasetSummary(): string {
  const lines = [
    `Dataset snapshot: ${DATASET_EDA_SUMMARY.datasetName} (${DATASET_EDA_SUMMARY.generatedAt}).`,
    `Totals: ${DATASET_EDA_SUMMARY.totals.customers} customers, ${DATASET_EDA_SUMMARY.totals.active} active, ${DATASET_EDA_SUMMARY.totals.churned} churned, ${DATASET_EDA_SUMMARY.totals.churnRate}% churn rate.`,
    `Average signals: ${DATASET_EDA_SUMMARY.totals.avgOrders} orders, rating ${DATASET_EDA_SUMMARY.totals.avgRating}, loyalty ${DATASET_EDA_SUMMARY.totals.avgLoyaltyPoints} points.`,
    `Top churn cities: ${DATASET_EDA_SUMMARY.topChurnCities.map((item) => `${item.city} (${item.churnedCustomers} churned, ${item.churnRate}% rate)`).join('; ')}.`,
    `Age-group churn: ${DATASET_EDA_SUMMARY.ageGroupChurnRates.map((item) => `${item.ageGroup} ${item.churnRate}%`).join('; ')}.`,
    `Delivery-status churn: ${DATASET_EDA_SUMMARY.deliveryStatusChurn.map((item) => `${item.status} ${item.churnRate}%`).join('; ')}.`,
    'Use this summary for broad benchmarking only. Use recent database predictions for user-specific answers.',
  ];

  return lines.join('\n');
}

export type ChatRole = 'user' | 'assistant';

export interface ChatMessagePayload {
  role: ChatRole;
  content: string;
}

export interface ChatPredictionContext {
  createdAt: string;
  customerProfile: {
    totalOrders: number;
    totalSpend: number;
    rating: number;
    deliveryDelayMinutes: number;
    loyaltyPoints: number;
    ageGroup: string;
  };
  assessment: {
    prediction: 'High Risk' | 'Medium Risk' | 'Safe';
    confidence: number;
    riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
    factors: string[];
    strategies: string[];
  };
}

export interface ChatCompletionRequest {
  messages: ChatMessagePayload[];
  userEmail?: string;
  sessionId?: string;
  currentPrediction?: ChatPredictionContext | null;
}

export interface ChatbotLocationState {
  currentPrediction?: ChatPredictionContext;
}

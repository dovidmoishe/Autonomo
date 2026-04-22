export type RiskMode = "defensive" | "balanced" | "aggressive";
export type TriggerType = "volatility" | "price_drop";
export type ActivityStatus = "queued" | "executed" | "failed";
export type GuardrailStatus = "pass" | "review" | "block";

export type CreateStrategyRequest = {
  walletAddress: string;
  strategyName: string;
  allocationAmountUsd: number;
  riskMode: RiskMode;
  triggerType: TriggerType;
  triggerThresholdPercent: number;
  rebalancePercent: number;
  maxSlippagePercent: number;
  autoExecute: boolean;
};

export type StrategyRecord = {
  id: string;
  walletAddress: string;
  strategyName: string;
  allocationAmountUsd: number;
  riskMode: RiskMode;
  triggerType: TriggerType;
  triggerThresholdPercent: number;
  rebalancePercent: number;
  maxSlippagePercent: number;
  autoExecute: boolean;
  status: "draft" | "active" | "paused";
  createdAt: string;
  updatedAt: string;
};

export type CreateStrategyResponse = {
  strategy: StrategyRecord;
};

export type SimulationPreviewRequest = {
  strategyId: string;
  marketVolatilityPercent: number;
  observedPriceMovePercent: number;
};

export type SimulationPreview = {
  simulationId: string;
  strategyId: string;
  generatedAt: string;
  guardrailStatus: GuardrailStatus;
  guardrailReasons: string[];
  expectedOutput: {
    projectedAllocationShiftPercent: number;
    projectedSlippagePercent: number;
    estimatedFeesUsd: number;
    expectedAction: string;
  };
  explanation: string;
};

export type SimulationPreviewResponse = {
  preview: SimulationPreview;
};

export type ActivityEvent = {
  id: string;
  strategyId: string;
  walletAddress: string;
  timestamp: string;
  trigger: string;
  decision: string;
  action: string;
  result: string;
  rationale: string;
  status: ActivityStatus;
};

export type ActivityResponse = {
  events: ActivityEvent[];
};

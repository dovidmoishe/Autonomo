export type RiskMode = 'defensive' | 'balanced' | 'aggressive';
export type TriggerType = 'volatility' | 'price_drop';
export type StrategyStatus = 'draft' | 'active' | 'paused';
export type ActivityStatus = 'queued' | 'executed' | 'failed';
export type GuardrailStatus = 'pass' | 'review' | 'block';

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
  status: StrategyStatus;
  createdAt: string;
  updatedAt: string;
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

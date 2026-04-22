import { RiskMode, TriggerType } from '../types';

export type CreateStrategyDto = {
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

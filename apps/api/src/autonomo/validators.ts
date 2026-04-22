import { BadRequestException } from '@nestjs/common';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { PreviewSimulationDto } from './dto/preview-simulation.dto';

const RISK_MODES = ['defensive', 'balanced', 'aggressive'];
const TRIGGER_TYPES = ['volatility', 'price_drop'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function expectString(
  value: unknown,
  fieldName: string,
  opts: { minLength?: number; maxLength?: number } = {},
): string {
  if (typeof value !== 'string') {
    throw new BadRequestException(`${fieldName} must be a string`);
  }

  const trimmed = value.trim();
  if (!trimmed) {
    throw new BadRequestException(`${fieldName} is required`);
  }

  if (opts.minLength && trimmed.length < opts.minLength) {
    throw new BadRequestException(
      `${fieldName} must be at least ${opts.minLength} characters`,
    );
  }

  if (opts.maxLength && trimmed.length > opts.maxLength) {
    throw new BadRequestException(
      `${fieldName} must be at most ${opts.maxLength} characters`,
    );
  }

  return trimmed;
}

function expectNumber(
  value: unknown,
  fieldName: string,
  opts: { min?: number; max?: number } = {},
): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new BadRequestException(`${fieldName} must be a number`);
  }

  if (opts.min !== undefined && value < opts.min) {
    throw new BadRequestException(`${fieldName} must be >= ${opts.min}`);
  }

  if (opts.max !== undefined && value > opts.max) {
    throw new BadRequestException(`${fieldName} must be <= ${opts.max}`);
  }

  return value;
}

function expectBoolean(value: unknown, fieldName: string): boolean {
  if (typeof value !== 'boolean') {
    throw new BadRequestException(`${fieldName} must be a boolean`);
  }

  return value;
}

export function validateCreateStrategy(input: unknown): CreateStrategyDto {
  if (!isRecord(input)) {
    throw new BadRequestException('Request body must be an object');
  }

  const walletAddress = expectString(input.walletAddress, 'walletAddress', {
    minLength: 32,
    maxLength: 64,
  });
  const strategyName = expectString(input.strategyName, 'strategyName', {
    minLength: 3,
    maxLength: 100,
  });
  const allocationAmountUsd = expectNumber(
    input.allocationAmountUsd,
    'allocationAmountUsd',
    {
      min: 0.01,
    },
  );
  const triggerThresholdPercent = expectNumber(
    input.triggerThresholdPercent,
    'triggerThresholdPercent',
    {
      min: 0.1,
      max: 100,
    },
  );
  const rebalancePercent = expectNumber(
    input.rebalancePercent,
    'rebalancePercent',
    {
      min: 0.1,
      max: 100,
    },
  );
  const maxSlippagePercent = expectNumber(
    input.maxSlippagePercent,
    'maxSlippagePercent',
    {
      min: 0.1,
      max: 100,
    },
  );
  const autoExecute = expectBoolean(input.autoExecute, 'autoExecute');

  const riskMode = expectString(input.riskMode, 'riskMode');
  if (!RISK_MODES.includes(riskMode)) {
    throw new BadRequestException(
      `riskMode must be one of: ${RISK_MODES.join(', ')}`,
    );
  }

  const triggerType = expectString(input.triggerType, 'triggerType');
  if (!TRIGGER_TYPES.includes(triggerType)) {
    throw new BadRequestException(
      `triggerType must be one of: ${TRIGGER_TYPES.join(', ')}`,
    );
  }

  return {
    walletAddress,
    strategyName,
    allocationAmountUsd,
    riskMode: riskMode as CreateStrategyDto['riskMode'],
    triggerType: triggerType as CreateStrategyDto['triggerType'],
    triggerThresholdPercent,
    rebalancePercent,
    maxSlippagePercent,
    autoExecute,
  };
}

export function validatePreviewSimulation(
  input: unknown,
): PreviewSimulationDto {
  if (!isRecord(input)) {
    throw new BadRequestException('Request body must be an object');
  }

  const strategyId = expectString(input.strategyId, 'strategyId');
  const marketVolatilityPercent = expectNumber(
    input.marketVolatilityPercent,
    'marketVolatilityPercent',
    {
      min: 0,
      max: 100,
    },
  );
  const observedPriceMovePercent = expectNumber(
    input.observedPriceMovePercent,
    'observedPriceMovePercent',
    {
      min: -100,
      max: 100,
    },
  );

  return {
    strategyId,
    marketVolatilityPercent,
    observedPriceMovePercent,
  };
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { PreviewSimulationDto } from './dto/preview-simulation.dto';
import { ActivityEvent, SimulationPreview, StrategyRecord } from './types';

@Injectable()
export class AutonomoService {
  private readonly strategies: StrategyRecord[] = [];
  private readonly activityEvents: ActivityEvent[] = [];
  private strategyCounter = 1;
  private simulationCounter = 1;
  private activityCounter = 1;

  createStrategy(input: CreateStrategyDto): StrategyRecord {
    const timestamp = new Date().toISOString();
    const strategy: StrategyRecord = {
      id: `strat_${this.strategyCounter++}`,
      walletAddress: input.walletAddress,
      strategyName: input.strategyName,
      allocationAmountUsd: input.allocationAmountUsd,
      riskMode: input.riskMode,
      triggerType: input.triggerType,
      triggerThresholdPercent: input.triggerThresholdPercent,
      rebalancePercent: input.rebalancePercent,
      maxSlippagePercent: input.maxSlippagePercent,
      autoExecute: input.autoExecute,
      status: 'draft',
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.strategies.unshift(strategy);
    this.pushActivity({
      strategyId: strategy.id,
      walletAddress: strategy.walletAddress,
      timestamp,
      trigger: `Strategy setup: ${strategy.triggerType} threshold ${strategy.triggerThresholdPercent}%`,
      decision: `Created strategy ${strategy.strategyName} in draft mode`,
      action: 'Saved strategy configuration',
      result: 'Ready for preview simulation',
      rationale: 'Establish baseline strategy settings before live execution',
      status: 'queued',
    });

    return strategy;
  }

  previewSimulation(input: PreviewSimulationDto): SimulationPreview {
    const strategy = this.strategies.find(
      (item) => item.id === input.strategyId,
    );
    if (!strategy) {
      throw new NotFoundException(`Strategy ${input.strategyId} was not found`);
    }

    const projectedSlippagePercent = Number(
      Math.min(
        strategy.maxSlippagePercent,
        Math.max(
          0.1,
          strategy.maxSlippagePercent * 0.65 +
            input.marketVolatilityPercent * 0.03 +
            Math.abs(input.observedPriceMovePercent) * 0.02,
        ),
      ).toFixed(2),
    );

    const projectedAllocationShiftPercent = Number(
      Math.min(100, strategy.rebalancePercent * 0.82).toFixed(2),
    );

    const estimatedFeesUsd = Number(
      (strategy.allocationAmountUsd * 0.0025).toFixed(2),
    );

    const guardrailReasons: string[] = [];
    let guardrailStatus: SimulationPreview['guardrailStatus'] = 'pass';
    if (projectedSlippagePercent > strategy.maxSlippagePercent * 0.9) {
      guardrailStatus = 'review';
      guardrailReasons.push(
        'Projected slippage is close to configured max slippage threshold',
      );
    }
    if (input.marketVolatilityPercent > 35) {
      guardrailStatus = 'review';
      guardrailReasons.push('High market volatility detected');
    }
    if (input.marketVolatilityPercent > 60) {
      guardrailStatus = 'block';
      guardrailReasons.push('Volatility exceeds safe execution guardrail');
    }
    if (guardrailReasons.length === 0) {
      guardrailReasons.push('All configured safety checks passed');
    }

    const expectedAction =
      input.observedPriceMovePercent < 0
        ? `Reduce exposure by ${projectedAllocationShiftPercent}%`
        : `Maintain allocation and monitor trigger state`;

    const simulation: SimulationPreview = {
      simulationId: `sim_${this.simulationCounter++}`,
      strategyId: strategy.id,
      generatedAt: new Date().toISOString(),
      guardrailStatus,
      guardrailReasons,
      expectedOutput: {
        projectedAllocationShiftPercent,
        projectedSlippagePercent,
        estimatedFeesUsd,
        expectedAction,
      },
      explanation:
        guardrailStatus === 'pass'
          ? 'Simulation indicates safe execution under current constraints.'
          : 'Simulation requires operator review before execution.',
    };

    this.pushActivity({
      strategyId: strategy.id,
      walletAddress: strategy.walletAddress,
      timestamp: simulation.generatedAt,
      trigger: `Preview run with volatility ${input.marketVolatilityPercent}%`,
      decision: `Guardrail status set to ${simulation.guardrailStatus}`,
      action: 'Generated simulation preview',
      result: simulation.expectedOutput.expectedAction,
      rationale: simulation.guardrailReasons.join('; '),
      status: simulation.guardrailStatus === 'block' ? 'failed' : 'executed',
    });

    return simulation;
  }

  listActivity(walletAddress?: string): ActivityEvent[] {
    if (!walletAddress) {
      return this.activityEvents;
    }

    return this.activityEvents.filter(
      (event) =>
        event.walletAddress.toLowerCase() === walletAddress.toLowerCase(),
    );
  }

  private pushActivity(event: Omit<ActivityEvent, 'id'>): ActivityEvent {
    const completeEvent: ActivityEvent = {
      id: `act_${this.activityCounter++}`,
      ...event,
    };
    this.activityEvents.unshift(completeEvent);
    return completeEvent;
  }
}

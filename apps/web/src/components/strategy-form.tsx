"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

type StrategyFormValues = {
  strategyName: string;
  allocationAmount: string;
  riskMode: "" | "defensive" | "balanced" | "aggressive";
  triggerType: "" | "volatility" | "price_drop";
  triggerThreshold: string;
  rebalancePercent: string;
  maxSlippage: string;
  autoExecute: boolean;
};

type FieldErrors = Partial<Record<keyof StrategyFormValues, string>>;

const INITIAL_VALUES: StrategyFormValues = {
  strategyName: "",
  allocationAmount: "",
  riskMode: "",
  triggerType: "",
  triggerThreshold: "",
  rebalancePercent: "",
  maxSlippage: "",
  autoExecute: false,
};

function parsePositiveNumber(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

function validate(values: StrategyFormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.strategyName.trim()) {
    errors.strategyName = "Strategy name is required.";
  }

  if (!values.riskMode) {
    errors.riskMode = "Pick a risk mode.";
  }

  if (!values.triggerType) {
    errors.triggerType = "Pick a trigger type.";
  }

  const allocation = parsePositiveNumber(values.allocationAmount);
  if (allocation === null || allocation <= 0) {
    errors.allocationAmount = "Allocation amount must be a positive number.";
  }

  const threshold = parsePositiveNumber(values.triggerThreshold);
  if (threshold === null || threshold <= 0) {
    errors.triggerThreshold = "Trigger threshold must be greater than zero.";
  }

  const rebalance = parsePositiveNumber(values.rebalancePercent);
  if (rebalance === null || rebalance <= 0 || rebalance > 100) {
    errors.rebalancePercent = "Rebalance percentage must be between 0 and 100.";
  }

  const slippage = parsePositiveNumber(values.maxSlippage);
  if (slippage === null || slippage <= 0 || slippage > 100) {
    errors.maxSlippage = "Max slippage must be between 0 and 100.";
  }

  return errors;
}

function inputClass(hasError: boolean): string {
  if (hasError) {
    return "mt-1 w-full rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-sm text-red-200 outline-none";
  }

  return "mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-200 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20";
}

export function StrategyForm() {
  const [values, setValues] = useState<StrategyFormValues>(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<keyof StrategyFormValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validate(values), [values]);
  const hasErrors = Object.keys(errors).length > 0;

  function markTouched(field: keyof StrategyFormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function updateField<K extends keyof StrategyFormValues>(field: K, value: StrategyFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function onTextChange(field: keyof StrategyFormValues) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      updateField(field, event.target.value as StrategyFormValues[typeof field]);
    };
  }

  function visibleError(field: keyof StrategyFormValues): string | undefined {
    if (!submitted && !touched[field]) {
      return undefined;
    }

    return errors[field];
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    if (hasErrors) {
      return;
    }
  }

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-4 sm:p-5">
      <header>
        <h3 className="text-lg font-semibold text-zinc-100">
          Strategy Builder
        </h3>
        <p className="mt-1 text-sm text-zinc-500">
          Define one production-ready rule set for auto-optimized yield with risk
          control.
        </p>
      </header>

      <form className="mt-4 grid gap-4" onSubmit={handleSubmit} noValidate>
        <label className="text-sm font-medium text-zinc-300">
          Strategy name
          <input
            name="strategyName"
            type="text"
            value={values.strategyName}
            onChange={onTextChange("strategyName")}
            onBlur={() => markTouched("strategyName")}
            placeholder="Ex: Capital Shield v1"
            className={inputClass(Boolean(visibleError("strategyName")))}
          />
          {visibleError("strategyName") ? (
            <span className="mt-1 block text-xs text-red-400">
              {visibleError("strategyName")}
            </span>
          ) : null}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-zinc-300">
            Allocation amount (USDC)
            <input
              name="allocationAmount"
              type="number"
              min="0"
              step="0.01"
              value={values.allocationAmount}
              onChange={onTextChange("allocationAmount")}
              onBlur={() => markTouched("allocationAmount")}
              placeholder="0.00"
              className={inputClass(Boolean(visibleError("allocationAmount")))}
            />
            {visibleError("allocationAmount") ? (
              <span className="mt-1 block text-xs text-red-400">
                {visibleError("allocationAmount")}
              </span>
            ) : null}
          </label>

          <label className="text-sm font-medium text-zinc-300">
            Risk mode
            <select
              name="riskMode"
              value={values.riskMode}
              onChange={onTextChange("riskMode")}
              onBlur={() => markTouched("riskMode")}
              className={inputClass(Boolean(visibleError("riskMode")))}
            >
              <option value="">Select mode</option>
              <option value="defensive">Defensive</option>
              <option value="balanced">Balanced</option>
              <option value="aggressive">Aggressive</option>
            </select>
            {visibleError("riskMode") ? (
              <span className="mt-1 block text-xs text-red-400">
                {visibleError("riskMode")}
              </span>
            ) : null}
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-zinc-300">
            Trigger type
            <select
              name="triggerType"
              value={values.triggerType}
              onChange={onTextChange("triggerType")}
              onBlur={() => markTouched("triggerType")}
              className={inputClass(Boolean(visibleError("triggerType")))}
            >
              <option value="">Select trigger</option>
              <option value="volatility">Volatility spike</option>
              <option value="price_drop">Price drop</option>
            </select>
            {visibleError("triggerType") ? (
              <span className="mt-1 block text-xs text-red-400">
                {visibleError("triggerType")}
              </span>
            ) : null}
          </label>

          <label className="text-sm font-medium text-zinc-300">
            Trigger threshold (%)
            <input
              name="triggerThreshold"
              type="number"
              min="0"
              step="0.1"
              value={values.triggerThreshold}
              onChange={onTextChange("triggerThreshold")}
              onBlur={() => markTouched("triggerThreshold")}
              placeholder="0.0"
              className={inputClass(Boolean(visibleError("triggerThreshold")))}
            />
            {visibleError("triggerThreshold") ? (
              <span className="mt-1 block text-xs text-red-400">
                {visibleError("triggerThreshold")}
              </span>
            ) : null}
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-zinc-300">
            Rebalance amount (%)
            <input
              name="rebalancePercent"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={values.rebalancePercent}
              onChange={onTextChange("rebalancePercent")}
              onBlur={() => markTouched("rebalancePercent")}
              placeholder="0.0"
              className={inputClass(Boolean(visibleError("rebalancePercent")))}
            />
            {visibleError("rebalancePercent") ? (
              <span className="mt-1 block text-xs text-red-400">
                {visibleError("rebalancePercent")}
              </span>
            ) : null}
          </label>

          <label className="text-sm font-medium text-zinc-300">
            Max slippage (%)
            <input
              name="maxSlippage"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={values.maxSlippage}
              onChange={onTextChange("maxSlippage")}
              onBlur={() => markTouched("maxSlippage")}
              placeholder="0.0"
              className={inputClass(Boolean(visibleError("maxSlippage")))}
            />
            {visibleError("maxSlippage") ? (
              <span className="mt-1 block text-xs text-red-400">
                {visibleError("maxSlippage")}
              </span>
            ) : null}
          </label>
        </div>

        <label className="flex items-start gap-3 rounded-lg border border-zinc-700 bg-zinc-800/50 p-3 text-sm text-zinc-300">
          <input
            name="autoExecute"
            type="checkbox"
            checked={values.autoExecute}
            onChange={(event) => updateField("autoExecute", event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-zinc-600 bg-zinc-800"
          />
          <span>
            Auto-execute once trigger conditions pass validation checks.
          </span>
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-500"
          >
            Save strategy structure
          </button>
          <button
            type="button"
            className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
            onClick={() => {
              setValues(INITIAL_VALUES);
              setTouched({});
              setSubmitted(false);
            }}
          >
            Reset form
          </button>
        </div>

        {submitted && !hasErrors ? (
          <p className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">
            Structure validated. Wire submit handler to backend strategy endpoint
            next.
          </p>
        ) : null}
      </form>
    </section>
  );
}

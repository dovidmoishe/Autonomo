import {
  ActivityResponse,
  CreateStrategyRequest,
  CreateStrategyResponse,
  SimulationPreviewRequest,
  SimulationPreviewResponse,
} from "./types";

const DEFAULT_API_BASE_URL = "http://localhost:4000/api";

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

async function requestJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const fallback = `Request failed with status ${response.status}`;
    try {
      const payload = (await response.json()) as {
        message?: string | string[];
      };
      if (Array.isArray(payload.message) && payload.message.length > 0) {
        throw new Error(payload.message.join(", "));
      }
      if (typeof payload.message === "string" && payload.message.trim()) {
        throw new Error(payload.message);
      }
      throw new Error(fallback);
    } catch (error) {
      if (error instanceof Error && error.message !== fallback) {
        throw error;
      }
      throw new Error(fallback);
    }
  }

  return (await response.json()) as T;
}

export async function createStrategy(
  payload: CreateStrategyRequest,
): Promise<CreateStrategyResponse> {
  return requestJson<CreateStrategyResponse>("/strategies", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function previewSimulation(
  payload: SimulationPreviewRequest,
): Promise<SimulationPreviewResponse> {
  return requestJson<SimulationPreviewResponse>("/simulations/preview", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getActivity(
  walletAddress?: string | null,
): Promise<ActivityResponse> {
  const query =
    walletAddress && walletAddress.trim()
      ? `?walletAddress=${encodeURIComponent(walletAddress)}`
      : "";

  return requestJson<ActivityResponse>(`/activity${query}`);
}

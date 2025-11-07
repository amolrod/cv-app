import { BuilderState } from "@/types/cv";
import { normalizeLoadedState } from "@/utils/state";

const STORAGE_KEY = "cv-builder-state-v1";

export const loadState = (): BuilderState | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  return normalizeLoadedState(JSON.parse(raw) as BuilderState);
  } catch (error) {
    console.warn("No se pudo cargar el estado del CV desde localStorage", error);
    return null;
  }
};

export const saveState = (state: BuilderState) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("No se pudo guardar el estado del CV", error);
  }
};

export const clearState = () => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("No se pudo limpiar el estado del CV", error);
  }
};

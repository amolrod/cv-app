"use client";

import {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import { INITIAL_STATE } from "@/lib/defaults";
import {
  createEmptyEducation,
  createEmptyExperience,
  createEmptyProject,
} from "@/lib/factories";
import { loadState, saveState } from "@/utils/storage";
import {
  BuilderAction,
  BuilderState,
  Education,
  Experience,
  Project,
  MoveDirection,
  Profile,
  UIState,
} from "@/types/cv";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const reducer = (state: BuilderState, action: BuilderAction): BuilderState => {
  switch (action.type) {
    case "updateProfile":
      return {
        ...state,
        data: {
          ...state.data,
          profile: {
            ...state.data.profile,
            ...action.payload,
          },
        },
      };
    case "addExperience":
      return {
        ...state,
        data: {
          ...state.data,
          experience: [...state.data.experience, action.payload],
        },
      };
    case "patchExperience":
      return {
        ...state,
        data: {
          ...state.data,
          experience: state.data.experience.map((item) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload.patch }
              : item
          ),
        },
      };
    case "removeExperience":
      return {
        ...state,
        data: {
          ...state.data,
          experience: state.data.experience.filter(
            (item) => item.id !== action.payload.id
          ),
        },
      };
    case "moveExperience": {
      const idx = state.data.experience.findIndex(
        (item) => item.id === action.payload.id
      );
      if (idx === -1) return state;
      const offset = action.payload.direction === "up" ? -1 : 1;
      const targetIdx = idx + offset;
      if (targetIdx < 0 || targetIdx >= state.data.experience.length) {
        return state;
      }
      const next = [...state.data.experience];
      const [item] = next.splice(idx, 1);
      next.splice(targetIdx, 0, item);
      return {
        ...state,
        data: { ...state.data, experience: next },
      };
    }
    case "addEducation":
      return {
        ...state,
        data: {
          ...state.data,
          education: [...state.data.education, action.payload],
        },
      };
    case "patchEducation":
      return {
        ...state,
        data: {
          ...state.data,
          education: state.data.education.map((item) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload.patch }
              : item
          ),
        },
      };
    case "removeEducation":
      return {
        ...state,
        data: {
          ...state.data,
          education: state.data.education.filter(
            (item) => item.id !== action.payload.id
          ),
        },
      };
    case "moveEducation": {
      const idx = state.data.education.findIndex(
        (item) => item.id === action.payload.id
      );
      if (idx === -1) return state;
      const offset = action.payload.direction === "up" ? -1 : 1;
      const targetIdx = idx + offset;
      if (targetIdx < 0 || targetIdx >= state.data.education.length) {
        return state;
      }
      const next = [...state.data.education];
      const [item] = next.splice(idx, 1);
      next.splice(targetIdx, 0, item);
      return {
        ...state,
        data: { ...state.data, education: next },
      };
    }
    case "updateUi":
      return {
        ...state,
        ui: {
          ...state.ui,
          ...action.payload,
          baseSizePt: clamp(
            action.payload.baseSizePt ?? state.ui.baseSizePt,
            10,
            13
          ),
        },
      };
    case "addProject":
      return {
        ...state,
        data: {
          ...state.data,
          projects: [...state.data.projects, action.payload],
        },
      };
    case "patchProject":
      return {
        ...state,
        data: {
          ...state.data,
          projects: state.data.projects.map((item) =>
            item.id === action.payload.id
              ? { ...item, ...action.payload.patch }
              : item
          ),
        },
      };
    case "removeProject":
      return {
        ...state,
        data: {
          ...state.data,
          projects: state.data.projects.filter(
            (item) => item.id !== action.payload.id
          ),
        },
      };
    case "moveProject": {
      const idx = state.data.projects.findIndex(
        (item) => item.id === action.payload.id
      );
      if (idx === -1) return state;
      const offset = action.payload.direction === "up" ? -1 : 1;
      const targetIdx = idx + offset;
      if (targetIdx < 0 || targetIdx >= state.data.projects.length) {
        return state;
      }
      const next = [...state.data.projects];
      const [item] = next.splice(idx, 1);
      next.splice(targetIdx, 0, item);
      return {
        ...state,
        data: { ...state.data, projects: next },
      };
    }
    case "setJdText":
      return { ...state, jdText: action.payload };
    case "reset":
      return action.payload;
    default:
      return state;
  }
};

type CvContextValue = {
  state: BuilderState;
  hydrated: boolean;
  dispatch: Dispatch<BuilderAction>;
  updateProfile: (payload: Partial<Profile>) => void;
  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  moveExperience: (id: string, direction: MoveDirection) => void;
  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  moveEducation: (id: string, direction: MoveDirection) => void;
  addProject: () => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  removeProject: (id: string) => void;
  moveProject: (id: string, direction: MoveDirection) => void;
  updateUi: (payload: Partial<UIState>) => void;
  setJdText: (text: string) => void;
  reset: (state?: BuilderState) => void;
};

const CvContext = createContext<CvContextValue | null>(null);

export const CvProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadState();
    if (stored) {
      dispatch({ type: "reset", payload: stored });
    }
    const frame = requestAnimationFrame(() => setHydrated(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveState(state);
    }
  }, [hydrated, state]);

  const updateProfile = useCallback(
    (payload: Partial<Profile>) => {
      dispatch({ type: "updateProfile", payload });
    },
    [dispatch]
  );

  const addExperience = useCallback(() => {
    dispatch({ type: "addExperience", payload: createEmptyExperience() });
  }, [dispatch]);

  const updateExperience = useCallback(
    (id: string, patch: Partial<Experience>) => {
      dispatch({ type: "patchExperience", payload: { id, patch } });
    },
    [dispatch]
  );

  const removeExperience = useCallback(
    (id: string) => {
      dispatch({ type: "removeExperience", payload: { id } });
    },
    [dispatch]
  );

  const moveExperience = useCallback(
    (id: string, direction: MoveDirection) => {
      dispatch({ type: "moveExperience", payload: { id, direction } });
    },
    [dispatch]
  );

  const addEducation = useCallback(() => {
    dispatch({ type: "addEducation", payload: createEmptyEducation() });
  }, [dispatch]);

  const updateEducation = useCallback(
    (id: string, patch: Partial<Education>) => {
      dispatch({ type: "patchEducation", payload: { id, patch } });
    },
    [dispatch]
  );

  const removeEducation = useCallback(
    (id: string) => {
      dispatch({ type: "removeEducation", payload: { id } });
    },
    [dispatch]
  );

  const moveEducation = useCallback(
    (id: string, direction: MoveDirection) => {
      dispatch({ type: "moveEducation", payload: { id, direction } });
    },
    [dispatch]
  );

  const updateUi = useCallback(
    (payload: Partial<UIState>) => {
      dispatch({ type: "updateUi", payload });
    },
    [dispatch]
  );

  const addProject = useCallback(() => {
    dispatch({ type: "addProject", payload: createEmptyProject() });
  }, [dispatch]);

  const updateProject = useCallback(
    (id: string, patch: Partial<Project>) => {
      dispatch({ type: "patchProject", payload: { id, patch } });
    },
    [dispatch]
  );

  const removeProject = useCallback(
    (id: string) => {
      dispatch({ type: "removeProject", payload: { id } });
    },
    [dispatch]
  );

  const moveProject = useCallback(
    (id: string, direction: MoveDirection) => {
      dispatch({ type: "moveProject", payload: { id, direction } });
    },
    [dispatch]
  );

  const setJdText = useCallback(
    (text: string) => {
      dispatch({ type: "setJdText", payload: text });
    },
    [dispatch]
  );

  const reset = useCallback(
    (value?: BuilderState) => {
      dispatch({ type: "reset", payload: value ?? INITIAL_STATE });
    },
    [dispatch]
  );

  const value = useMemo(
    () => ({
      state,
      hydrated,
      dispatch,
      updateProfile,
      addExperience,
      updateExperience,
      removeExperience,
      moveExperience,
      addEducation,
      updateEducation,
      removeEducation,
      moveEducation,
      addProject,
      updateProject,
      removeProject,
      moveProject,
      updateUi,
      setJdText,
      reset,
    }),
    [
      state,
      hydrated,
      updateProfile,
      addExperience,
      updateExperience,
      removeExperience,
      moveExperience,
      addEducation,
      updateEducation,
      removeEducation,
      moveEducation,
      addProject,
      updateProject,
      removeProject,
      moveProject,
      updateUi,
      setJdText,
      reset,
    ]
  );

  return <CvContext.Provider value={value}>{children}</CvContext.Provider>;
};

export const useCv = () => {
  const context = useContext(CvContext);
  if (!context) {
    throw new Error("useCv debe usarse dentro de CvProvider");
  }
  return context;
};

import { useCallback } from 'react';

import {
  type ConversationMessage,
  type SimulationFormData,
  type SimulationRecord,
} from '@/data/simulation';
import type { InsightData } from '@/services/aiService';

const LOCAL_STORAGE_KEY = 'simulation-data';

export const useSimulationStorage = () => {
  const saveFormData = useCallback((formData: SimulationFormData) => {
    const id = crypto.randomUUID();
    const record: SimulationRecord = { ...formData, id };

    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedData = storage
      ? (JSON.parse(storage) as SimulationRecord[])
      : [];

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...savedData, record])
    );

    return id;
  }, []);

  const getFormData = useCallback((id: string): SimulationRecord | null => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!storage) {
      return null;
    }

    const savedData = JSON.parse(storage) as SimulationRecord[];
    return savedData.find((record) => record.id === id) ?? null;
  }, []);

  const getAllFormData = useCallback(() => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storage ? (JSON.parse(storage) as SimulationRecord[]) : [];
  }, []);

  const deleteFormData = useCallback(
    (id: string) => {
      const savedData = getAllFormData().filter((record) => record.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedData));
    },
    [getAllFormData]
  );

  const updateFormData = useCallback(
    (
      id: string,
      data: {
        income?: string;
        expenses?: string;
        debts?: string;
        goalName?: string;
        goalAmount?: string;
        goalDeadline?: string;
        insight?: InsightData;
        conversation?: ConversationMessage[];
      }
    ) => {
      const savedData = getAllFormData().map((record) =>
        record.id === id ? { ...record, ...data } : record
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedData));
    },
    [getAllFormData]
  );

  return {
    saveFormData,
    getFormData,
    getAllFormData,
    deleteFormData,
    updateFormData,
  };
};

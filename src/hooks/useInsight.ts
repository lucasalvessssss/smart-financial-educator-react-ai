import { useCallback, useEffect, useRef, useState } from 'react';

import { buildAIPrompt } from '@/data/aiPrompt';
import { getInsight, type InsightData } from '@/services/aiService';

import { useSimulationStorage } from './useSimulationStorage';

export const useInsight = (simulationId: string) => {
  const { getFormData, updateFormData } = useSimulationStorage();
  const requestPending = useRef(false);
  const [insight, setInsight] = useState<InsightData | null>(
    () => getFormData(simulationId)?.insight ?? null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = useCallback(
    async (id: string) => {
      if (requestPending.current) return;
      const simulation = getFormData(id);
      if (!simulation) {
        setError('Simulação não encontrada.');
        return;
      }
      requestPending.current = true;
      setIsLoading(true);
      setError(null);
      try {
        const data = await getInsight(buildAIPrompt(simulation));
        setInsight(data);
        updateFormData(id, { insight: data });
        return data;
      } catch (insightError) {
        setError(
          insightError instanceof Error
            ? insightError.message
            : 'Erro ao gerar o diagnóstico.'
        );
      } finally {
        requestPending.current = false;
        setIsLoading(false);
      }
    },
    [getFormData, updateFormData]
  );

  useEffect(() => {
    if (insight) return;
    const timer = window.setTimeout(() => void fetchInsight(simulationId), 0);
    return () => window.clearTimeout(timer);
  }, [fetchInsight, insight, simulationId]);

  return { insight, isLoading, error, fetchInsight };
};

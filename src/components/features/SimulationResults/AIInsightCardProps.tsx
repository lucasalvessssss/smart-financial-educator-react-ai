import 'react-loading-skeleton/dist/skeleton.css';

import { type FormEvent, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useInsight } from '@/hooks/useInsight';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';
import { askGemini } from '@/services/aiService';

import { Content } from '../Insights/Content';
import { Error as InsightError } from '../Insights/Error';

interface AIInsightCardProps {
  simulationId: string;
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId);
  const { getFormData, updateFormData } = useSimulationStorage();
  const [conversation, setConversation] = useState(
    () => getFormData(simulationId)?.conversation ?? []
  );
  const [question, setQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [questionError, setQuestionError] = useState<string | null>(null);
  const handleAsk = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim() || isAsking) return;
    const currentQuestion = question.trim();
    setQuestion('');
    setIsAsking(true);
    setQuestionError(null);
    try {
      const answer = await askGemini(
        `Responda de forma breve e prática sobre esta simulação financeira: ${JSON.stringify(getFormData(simulationId))}\nPergunta: ${currentQuestion}`
      );
      const updatedConversation = [
        ...conversation,
        { id: crypto.randomUUID(), role: 'user', content: currentQuestion },
        { id: crypto.randomUUID(), role: 'assistant', content: answer },
      ] as typeof conversation;
      setConversation(updatedConversation);
      updateFormData(simulationId, { conversation: updatedConversation });
    } catch (askError) {
      setQuestionError(
        askError instanceof globalThis.Error
          ? askError.message
          : 'Não foi possível responder.'
      );
      setQuestion(currentQuestion);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1.5">
        <span>✨</span>
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Insight Financeiro Personalizado
        </span>
      </div>

      {isLoading && (
        <div className="flex">
          <Skeleton
            count={10.5}
            baseColor="var(--color-skeleton-base)"
            highlightColor="var(--color-skeleton-highlight)"
            className="mb-3 flex rounded-lg"
            containerClassName="flex-1"
            inline
          />
        </div>
      )}
      {!isLoading && error && (
        <InsightError
          simulationId={simulationId}
          message={error}
          onRetry={() => {
            fetchInsight(simulationId);
          }}
        />
      )}
      {!isLoading && insight && !error && <Content insight={insight} />}
      {insight && (
        <>
          <div className="border-border mt-6 space-y-3 border-t pt-5">
            {conversation.map((message) => (
              <p
                key={message.id}
                className={
                  message.role === 'user'
                    ? 'text-foreground text-sm'
                    : 'text-muted-foreground text-sm'
                }
              >
                <strong>
                  {message.role === 'user' ? 'Você: ' : 'Educador: '}
                </strong>
                {message.content}
              </p>
            ))}
          </div>
          <form onSubmit={handleAsk} className="mt-5 flex gap-2">
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Faça uma pergunta sobre sua simulação"
              className="bg-input text-foreground min-w-0 flex-1 rounded-xl px-3 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              disabled={isAsking || !question.trim()}
              className="bg-primary text-primary-foreground rounded-xl px-4 py-2 text-sm disabled:opacity-50"
            >
              {isAsking ? '...' : 'Enviar'}
            </button>
          </form>
          {questionError && (
            <p className="mt-2 text-xs text-red-500">{questionError}</p>
          )}
        </>
      )}
    </div>
  );
}

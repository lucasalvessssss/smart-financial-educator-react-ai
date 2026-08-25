import {
  CalendarClock,
  CreditCard,
  Goal,
  Landmark,
  PiggyBank,
  Wallet,
} from 'lucide-react';
import { useParams } from 'react-router-dom';

import { AIInsightsCard } from '@/components/features/SimulationResults/AIInsightCardProps';
import { Card } from '@/components/features/SimulationResults/Card';
import { PageHero } from '@/components/shared/PageHero';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';
import { parseCurrency } from '@/utils/currency';
import { calcMonthlyGoalAmount, calcMonthlySavings } from '@/utils/simulation';

export function SimulationResultsPage() {
  const { id } = useParams<{ id: string }>();
  const { getFormData } = useSimulationStorage();
  const data = id ? getFormData(id) : null;

  if (!data || !id) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p>Simulação não encontrada.</p>
      </main>
    );
  }

  const monthlySavings = calcMonthlySavings(data);
  const monthlyGoalAmount = calcMonthlyGoalAmount(data);
  const money = (value: number) =>
    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Resultado da sua simulação"
        subtitle="Com base no seu perfil financeiro e objetivos."
      />
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card
          icon={Goal}
          label="Custo da meta"
          value={data.goalAmount}
          subtitle={data.goalName}
        />
        <Card
          icon={CalendarClock}
          label="Prazo"
          value={`${data.goalDeadline} meses`}
          subtitle={`Necessário: ${money(monthlyGoalAmount)}/mês`}
        />
        <Card
          variant="primary"
          icon={PiggyBank}
          label="Economia mensal"
          value={money(monthlySavings)}
          subtitle="Valor livre após gastos e dívidas"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <AIInsightsCard simulationId={id} />
        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <Card
            icon={Wallet}
            label="Renda mensal"
            value={data.income}
            subtitle={`Renda bruta: ${money(parseCurrency(data.income))}`}
          />
          <Card
            icon={CreditCard}
            label="Custos fixos"
            value={data.expenses}
            subtitle="Gastos essenciais por mês"
          />
          <Card
            icon={Landmark}
            label="Dívidas e parcelas"
            value={data.debts}
            subtitle="Compromissos mensais"
          />
        </div>
      </div>
    </main>
  );
}

import type { SimulationFormData } from '../data/simulation';
import { parseCurrency } from './currency';

export function calcMonthlySavings(data: SimulationFormData) {
  return (
    parseCurrency(data.income) -
    parseCurrency(data.expenses) -
    parseCurrency(data.debts)
  );
}

export function calcMonthlyGoalAmount(data: SimulationFormData) {
  const deadline = Number.parseInt(data.goalDeadline, 10);
  return deadline > 0 ? parseCurrency(data.goalAmount) / deadline : 0;
}

import { Clock, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/shared/Button';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';

export function HistoryPage() {
  const navigate = useNavigate();
  const { getAllFormData, deleteFormData } = useSimulationStorage();
  const [records, setRecords] = useState(getAllFormData);

  const remove = (id: string) => {
    deleteFormData(id);
    setRecords(getAllFormData());
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <div className="mb-8 flex items-center gap-3">
        <Clock className="text-primary" />
        <div>
          <h1 className="text-foreground text-2xl font-semibold">Histórico</h1>
          <p className="text-muted-foreground text-sm">
            Suas simulações salvas.
          </p>
        </div>
      </div>
      {records.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma simulação encontrada.</p>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <div
              key={record.id}
              className="bg-card flex flex-col gap-4 rounded-2xl p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="text-foreground font-semibold">
                  {record.goalName}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {record.goalAmount} em {record.goalDeadline} meses
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => void navigate(`/resultado/${record.id}`)}
                >
                  Ver detalhes
                </Button>
                <Button
                  aria-label={`Excluir simulação ${record.goalName}`}
                  variant="ghost"
                  icon={Trash2}
                  onClick={() => remove(record.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

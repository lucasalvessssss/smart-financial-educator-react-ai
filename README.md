# Smart Financial Educator

Aplicação web para planejamento financeiro pessoal. O usuário informa sua renda, gastos, dívidas e uma meta financeira para receber uma análise personalizada.

## Funcionalidades

- Formulário de simulação em várias etapas
- Cálculo da economia mensal disponível
- Página de resultados com resumo financeiro
- Insights gerados pelo Google Gemini
- Histórico de simulações salvo no navegador
- Conversa com o educador financeiro
- Tema claro e escuro

## Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Google Gemini API
- LocalStorage

## Como executar

Instale as dependências:

```bash
npm install
```

Para usar os insights com IA, crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_GEMINI_API_KEY=sua_chave_do_gemini
```

Inicie o projeto:

```bash
npm run dev
```

## Comandos úteis

```bash
npm run build          # gera o build de produção
npm run lint           # verifica o código
npm run format         # formata os arquivos
npm run format:check   # verifica a formatação
```

## Rotas principais

- `/` - formulário de simulação
- `/resultado/:id` - resultado de uma simulação
- `/historico` - simulações salvas

## Estrutura principal

```text
src/
├── components/   # componentes da interface
├── context/      # contexto de tema
├── data/         # dados do formulário e prompt da IA
├── hooks/        # lógica reutilizável e localStorage
├── pages/        # páginas da aplicação
├── services/     # integração com o Gemini
└── utils/        # cálculos e formatação de valores
```

Os dados das simulações são armazenados localmente no navegador. Não há backend ou banco de dados remoto.

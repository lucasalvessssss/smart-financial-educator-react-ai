interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = 'gemini-flash-latest';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

function parseJsonResponse(text: string) {
  const cleanedText = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  try {
    return JSON.parse(cleanedText) as InsightData;
  } catch {
    throw new Error('A IA retornou um JSON inválido.');
  }
}

const callGeminiAPI = async (prompt: string) => {
  if (!API_KEY) {
    throw new Error('Chave da API Gemini não configurada.');
  }

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  return (await response.json()) as GeminiResponse;
};

export interface InsightData {
  feasibility: {
    status: 'viable' | 'needs_adjustment' | 'unfeasible';
    content: string;
  };
  diagnosis: { content: string };
  suggestions: { items: string[] };
  extraIncome: { items: string[] };
  investment: { items: string[] };
  motivation: { content: string };
}

export const getInsight = async (prompt: string) => {
  const response = await callGeminiAPI(prompt);
  const json = response.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!json) {
    throw new Error('A IA não retornou um diagnóstico.');
  }

  return parseJsonResponse(json);
};

export const askGemini = async (prompt: string) => {
  const response = await callGeminiAPI(prompt);
  const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('A IA não retornou uma resposta.');
  }

  return text.trim();
};

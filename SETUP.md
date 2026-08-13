# Configuração do Projeto - Prettier, ESLint e VSCode

## ✅ Configurações Implementadas

### 1. **Prettier - Formatação de Código**
- ✅ Instalado e configurado
- ✅ Plugin Tailwind CSS para organizar classes
- ✅ Formatação automática ao salvar (VSCode)
- ✅ 2 espaços de indentação por padrão
- ✅ Arquivo: `.prettierrc.json`

**Configurações do Prettier:**
- Tabulação: 2 espaços
- Aspas simples
- Vírgulas ao final (es5)
- Linha máxima: 80 caracteres
- Plugin: `prettier-plugin-tailwindcss`

---

### 2. **ESLint - Análise Estática**
- ✅ Configurado com suporte a TypeScript e React
- ✅ Plugin de ordenação de imports: `eslint-plugin-simple-import-sort`
- ✅ Detecção de variáveis não utilizadas
- ✅ Arquivo: `eslint.config.js`

**Regras ESLint Ativas:**
- `simple-import-sort/imports`: Ordena imports automaticamente
- `simple-import-sort/exports`: Ordena exports
- `@typescript-eslint/no-unused-vars`: Remove imports/variáveis não utilizadas

---

### 3. **VSCode - Configuração do Editor**
- ✅ Formatação automática ao salvar
- ✅ ESLint integrado
- ✅ TypeScript com alias configurado
- ✅ Arquivo: `.vscode/settings.json`

**Configurações de Auto-Fix ao Salvar:**
```json
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": "explicit",
  "source.removeUnusedImports": "explicit",
  "source.organizeImports": "explicit"
}
```

---

### 4. **Path Aliases - @/ para src/**
- ✅ Configurado no `tsconfig.app.json`
- ✅ Configurado no `vite.config.ts`

**Como usar:**
```typescript
// Em vez de:
import App from '../../../App';

// Use:
import App from '@/App';
```

---

## 📦 Dependências Instaladas

```json
{
  "prettier": "latest",
  "prettier-plugin-tailwindcss": "latest",
  "eslint-plugin-simple-import-sort": "latest",
  "@typescript-eslint/parser": "latest"
}
```

---

## 🔧 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Linter
npm run lint           # Verificar problemas
npm run lint:fix       # Corrigir automaticamente

# Formatação
npm run format         # Formatar com Prettier
npm run format:check   # Verificar formatação

# Preview
npm run preview
```

---

## 💾 Arquivos Configurados

1. **`.prettierrc.json`** - Configuração do Prettier
2. **`.prettierignore`** - Arquivos ignorados pelo Prettier
3. **`eslint.config.js`** - Configuração do ESLint (atualizado)
4. **`.vscode/settings.json`** - Configurações do VSCode
5. **`.vscode/extensions.json`** - Recomendação de extensões
6. **`tsconfig.app.json`** - Path aliases (atualizado)
7. **`vite.config.ts`** - Resolve aliases (atualizado)
8. **`package.json`** - Scripts adicionados (atualizado)

---

## 🎯 Funcionalidades Principais

### Ao Salvar um Arquivo:
1. ✅ Formata automaticamente com Prettier
2. ✅ Organiza imports automaticamente
3. ✅ Remove imports não utilizados
4. ✅ Corrige problemas do ESLint

### Espaçamento:
- ✅ 2 tabs por padrão (configurado em `tabWidth: 2`)

### Organização de Classes Tailwind:
- ✅ Prettier organiza automaticamente as classes com o plugin `prettier-plugin-tailwindcss`

### Path Aliases:
- ✅ Use `@/` para importar da pasta `src/`

---

## 🚀 Próximos Passos

1. Instale as extensões recomendadas no VSCode:
   - **Prettier** (esbenp.prettier-vscode)
   - **ESLint** (dbaeumer.vscode-eslint)
   - **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)

2. Reinicie o VSCode para ativar as configurações

3. Ao salvar arquivos, o formatação será aplicada automaticamente

---

## ✨ Exemplos de Uso

### Import com Alias:
```typescript
// src/components/MyComponent.tsx
import Button from '@/components/ui/Button';
import { API_URL } from '@/config/constants';
```

### Formatação Automática:
```typescript
// Antes (desordenado)
import React,{useState} from 'react'
import App from './App'

// Depois (formatado automaticamente)
import React, { useState } from 'react';

import App from './App';
```

### Classes Tailwind Organizadas:
```jsx
// O Prettier organiza as classes automaticamente
<div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-blue-500 to-purple-600">
  Hello World
</div>
```

---

## 📝 Notas

- As configurações estão prontas para uso imediato
- Certifique-se de que as extensões do VSCode estão instaladas
- O ESLint é verificado também no CI/CD (execute `npm run lint`)
- Prettier formata código de forma consistente em todo o projeto

---

**Configuração concluída com sucesso! 🎉**

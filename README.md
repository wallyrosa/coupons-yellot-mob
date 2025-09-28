# 🎫 Coupons Yellot Mobile

Aplicativo mobile para gerenciamento de cupons de desconto, desenvolvido com React Native, Expo e arquitetura Onion.

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- pnpm (gerenciador de pacotes)
- Expo CLI
- Android Studio (para Android) ou Xcode (para iOS)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/wallyrosa/coupons-yellot-mob.git
cd coupons-yellot-mob
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Execute o projeto**
```bash
# Desenvolvimento
pnpm run start

# Android
pnpm run android

# iOS  
pnpm run ios

# Web
pnpm run web
```

## 🏗️ Arquitetura

Este projeto utiliza a **Arquitetura Onion (Clean Architecture)** para garantir separação de responsabilidades e facilidade de manutenção.

### 📁 Estrutura de Pastas

```
src/
├── app/                    # Configuração do Expo Router
│   ├── _layout.tsx         # Layout raiz com providers
│   └── navigation/         # Navegação entre telas
├── domain/                 # Regras de negócio (camada central)
│   └── use-cases/          # Casos de uso
├── infra/                  # Infraestrutura (camada externa)
│   ├── repositories/       # Implementação dos repositórios
│   ├── services/           # APIs e serviços externos
│   ├── storage/            # Armazenamento local
│   └── types/              # Tipos da infraestrutura
├── presentation/           # Interface do usuário (camada externa)
│   ├── components/         # Componentes reutilizáveis
│   ├── hooks/              # Hooks customizados
│   └── screens/            # Telas da aplicação
├── theme/                  # Sistema de design
├── types/                  # Tipagens globais
└── utils/                  # Utilitários
```

## 🛠️ Tecnologias Utilizadas

### Core
- **React Native 0.81.4** - Framework mobile
- **Expo 54** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **Expo Router** - Navegação baseada em arquivos

### Estado e Dados
- **TanStack Query** - Gerenciamento de estado servidor
- **Zustand** - Gerenciamento de estado cliente
- **Axios** - Cliente HTTP

### UI/UX
- **NativeWind** - Tailwind CSS para React Native
- **React Native Reanimated** - Animações nativas
- **React Native Toast Message** - Notificações

### Desenvolvimento
- **Tailwind CSS** - Estilização
- **Prettier** - Formatação de código
- **ESLint** - Análise de código

## 🎨 Sistema de Design

### Cores
```typescript
const colors = {
  background: "#141414",      // Fundo principal
  foreground: "#221e23",     // Fundo secundário
  primary: "#2c282d",        // Cor primária
  secondary: "#4b4b4b",      // Cor secundária
  success: "#cedc3b",        // Sucesso
  warning: "#ff9500",        // Aviso
  destructive: "#d43d77",     // Erro
}
```

### Componentes
- **Skeleton** - Loading com animação nativa
- **Separator** - Divisor visual
- **TabBar** - Navegação inferior
- **Card** - Cartão de cupom

## 📱 Funcionalidades

### ✅ Implementadas
- [x] Listagem de cupons com agrupamento por mês
- [x] Sistema de loading com skeleton
- [x] Pull-to-refresh
- [x] Tratamento de erros com retry automático
- [x] Navegação por abas
- [x] Filtros por período
- [x] Toast notifications
- [x] Armazenamento local

## 🧪 Testes

```bash
# Executar testes
pnpm test

# Testes com coverage
pnpm test:coverage
```

## 📦 Build

```bash
# Build para produção
expo build:android
expo build:ios

# Build local
eas build --platform android
eas build --platform ios
```

## 👥 Equipe

- **Desenvolvedor Frontend** - Wally
- **Arquitetura** - Onion Architecture
- **Design System** - Custom

---

**Desenvolvido com ❤️ usando React Native e Expo**

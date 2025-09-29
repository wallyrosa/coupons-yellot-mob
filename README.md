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
│   ├── index.tsx           # Index raiz indicando para Coupons
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
- **Jest ^30.2.0** - Framework de testes
- **Testing Library** - Testes de componentes

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
- [x] **Tela de Cupons**: Listagem completa com agrupamento por mês
- [x] **Sistema de Loading**: Skeleton com animação nativa
- [x] **Pull-to-refresh**: Atualização manual dos dados
- [x] **Tratamento de Erros**: Retry automático e notificações
- [x] **Navegação por Abas**: TabBar customizada com animações
- [x] **Filtros por Período**: Filtro por dias (7, 15, 30 dias)
- [x] **Toast Notifications**: Feedback visual para usuário
- [x] **Armazenamento Local**: Cache com Zustand
- [x] **Arquitetura Onion**: Separação clara de responsabilidades
- [x] **Testes Completos**: Cobertura de componentes, hooks e casos de uso

## 🧪 Testes

O projeto possui uma estrutura completa de testes com alta cobertura:

### Comandos Disponíveis
```bash
# Executar todos os testes
pnpm test

# Executar testes em modo watch (desenvolvimento)
pnpm test:watch

# Executar testes com cobertura
pnpm test:coverage

# Executar testes para CI/CD
pnpm test:ci
```

### Cobertura de Testes
- ✅ **Funções Utilitárias**: `firstLetterToUppercase`, `mergeCss`
- ✅ **Serviços de API**: Cliente HTTP, repositórios
- ✅ **Gerenciamento de Estado**: Zustand stores
- ✅ **Hooks Customizados**: `useCouponsQuery`, `useFilterDays`, `useTabBar`
- ✅ **Componentes React**: `Card`, `ProgressBar`, `Separator`
- ✅ **Casos de Uso**: `filterByRange`

### Tecnologias de Teste
- **Jest ^30.2.0** - Framework de testes
- **@testing-library/react-native** - Testes de componentes
- **@testing-library/jest-native** - Matchers adicionais
- **React Test Renderer** - Renderização de componentes

> 📋 Para mais detalhes sobre testes, consulte [src/tests/README.md](src/tests/README.md)

## 📦 Build

### Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
pnpm start

# Executar no Android
pnpm android

# Executar no iOS
pnpm ios

# Executar na Web
pnpm web
```

# Build local
```bash
# Executa o build
pnpx expo prebuild

# Executar no Android
pnpx expo run:android

# Executar no IOS
pnpx expo run:ios
```

## 👥 Equipe

- **Desenvolvedor Frontend** - Wally
- **Arquitetura** - Onion Architecture
- **Design System** - Custom

---

**Desenvolvido com ❤️ usando React Native e Expo**

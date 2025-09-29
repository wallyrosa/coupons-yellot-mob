# Guia de Testes - Coupons Yellot Mobile

Este projeto possui uma estrutura completa de testes para garantir a qualidade e confiabilidade do código.

## 🧪 Estrutura de Testes

```
src/
├── tests/
│   ├── setup.ts                 # Configuração global dos testes
│   ├── test-utils.tsx          # Utilitários para testes
│   ├── mocks/
│   │   └── coupons.ts          # Dados mock para testes
│   └── README.md               # Este arquivo
├── utils/__tests__/            # Testes de funções utilitárias
├── infra/
│   ├── services/__tests__/     # Testes de serviços (API)
│   ├── repositories/__tests__/ # Testes de repositórios
│   └── storage/__tests__/      # Testes de estado (Zustand)
├── domain/use-cases/__tests__/ # Testes de casos de uso
└── presentation/
    ├── components/__tests__/   # Testes de componentes
    └── hooks/__tests__/        # Testes de hooks customizados
```

## 🚀 Como Executar os Testes

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

### Executando Testes Específicos

```bash
# Testar apenas uma pasta
pnpm test src/utils

# Testar apenas um arquivo
pnpm test firstLetterToUppercase.test.ts

# Testar com padrão
pnpm test --testNamePattern="Card Component"
```

## 📊 Cobertura de Testes

Os testes cobrem:

- ✅ **Funções Utilitárias**: `firstLetterToUppercase`, `mergeCss`
- ✅ **Serviços de API**: Cliente HTTP, repositórios
- ✅ **Gerenciamento de Estado**: Zustand stores
- ✅ **Hooks Customizados**: `useCouponsQuery`, `useFilterDays`, `useTabBar`
- ✅ **Componentes React**: `Card`, `ProgressBar`, `Separator`
- ✅ **Casos de Uso**: `filterByRange`

## 🛠️ Tecnologias Utilizadas

- **Jest**: Framework de testes
- **@testing-library/react-native**: Testes de componentes React Native
- **@testing-library/jest-native**: Matchers adicionais
- **React Query**: Testes de queries assíncronas

## 📝 Padrões de Teste

### Estrutura dos Testes

```typescript
describe('ComponentName', () => {
  describe('Funcionalidade específica', () => {
    it('deve fazer algo específico', () => {
      // Arrange
      // Act  
      // Assert
    });
  });
});
```

### Convenções

1. **Nomes descritivos**: Use português para descrições claras
2. **Teste isolado**: Cada teste deve ser independente
3. **AAA Pattern**: Arrange, Act, Assert
4. **Mocks**: Use mocks para dependências externas
5. **testID**: Adicione testID para elementos importantes

### Exemplo de Teste de Componente

```typescript
import { render, screen } from '@testing-library/react-native';
import { Card } from '../Card';

describe('Card Component', () => {
  it('deve mostrar loading quando isLoading é true', () => {
    // Arrange
    const mockProps = { isLoading: true };
    
    // Act
    render(<Card {...mockProps} />);
    
    // Assert
    expect(screen.getByTestId('skeleton')).toBeTruthy();
  });
});
```

## 🔧 Configuração

### Jest Config (`jest.config.js`)

- **Preset**: `react-native`
- **Setup**: `src/tests/setup.ts`
- **Transform**: Ignora `node_modules` exceto React Native
- **Module Mapping**: Suporte para `@/` alias
- **Coverage**: Relatórios em HTML e LCOV

### Setup Global (`src/tests/setup.ts`)

- Mocks para React Native Reanimated
- Mocks para Expo Router
- Mocks para NativeWind
- Mocks para Axios
- Helper para renderizar com QueryClient

## 🎯 Boas Práticas

1. **Teste o comportamento, não a implementação**
2. **Use dados mock realistas**
3. **Teste casos extremos e edge cases**
4. **Mantenha testes simples e focados**
5. **Atualize testes quando mudar funcionalidades**

## 🐛 Troubleshooting

### Problemas Comuns

1. **Mock não funciona**: Verifique se o mock está no `setup.ts`
2. **Teste falha em CI**: Use `--ci` flag
3. **Cobertura baixa**: Adicione testes para branches não cobertos
4. **Timeout**: Aumente timeout para testes assíncronos

### Debug

```bash
# Executar com debug
pnpm test --verbose

# Executar apenas um arquivo específico
pnpm test Card.test.tsx --verbose
```

## 📈 Métricas

- **Cobertura de Código**: > 80%
- **Cobertura de Branches**: > 75%
- **Cobertura de Funções**: > 90%
- **Cobertura de Linhas**: > 85%

---

Para mais informações sobre testes em React Native, consulte a [documentação oficial](https://reactnative.dev/docs/testing-overview).


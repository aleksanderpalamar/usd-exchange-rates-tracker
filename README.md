# USD Exchange Rates Tracker 📈
![GitHub](https://img.shields.io/github/license/aleksanderpalamar/usd-exchange-rates-tracker)
![GitHub last commit](https://img.shields.io/github/last-commit/aleksanderpalamar/usd-exchange-rates-tracker)
![GitHub top language](https://img.shields.io/github/languages/top/aleksanderpalamar/usd-exchange-rates-tracker)

## 📝 Descrição
Uma aplicação web moderna para acompanhar taxas de câmbio do Dólar Americano (USD) em relação a outras moedas. A aplicação oferece visualização em tempo real e histórico de taxas de câmbio através de gráficos interativos.

## 🚀 Funcionalidades
Visualização em Tempo Real
- Cards mostrando taxas de câmbio atuais do USD para moedas selecionadas.
- Atualização dinâmica dos valores.
- Filtros Personalizáveis.
Seleção de moedas para acompanhamento (BRL, EUR, GBP, JPY, CNY)

**Períodos de visualização:**
```
Últimos 7 dias
Últimos 30 dias
Último ano
```

## Gráfico Histórico
Visualização de dados históricos em gráfico de linha
Suporte para múltiplas moedas simultaneamente
### Legendas interativas
Cores únicas para cada moeda
Exportação de Dados
Download dos dados históricos em formato CSV
### 🛠️ Tecnologias Utilizadas
- Next.js - Framework React para produção
- TypeScript - Tipagem estática
- Tailwind CSS - Framework CSS utilitário
- Chart.js - Biblioteca de gráficos
- React Chart.js 2 - Wrapper React para Chart.js
- React Icons - Biblioteca de ícones

### 📦 Estrutura do Projeto
```bash
usd-exchange-rates-tracker
├── components
│   ├── CurrencyCards.tsx
│   ├── Filters.tsx
│   ├── HistoricalChart.tsx
├── app
│   ├── page.tsx
│   ├── layouts.tsx
```
### 💻 Como Executar
Clone o repositório:
```bash
git clone https://github.com/aleksanderpalamar/usd-exchange-rates-tracker.git
```
Instale as dependências:
```bash
npm install
```
Execute o servidor de desenvolvimento:
```bash
npm run dev
```
Acesse http://localhost:3000 no seu navegador

### 🔧 Configuração
- Requisitos
- Node.js 16.8.0 ou superior `npm ou yarn`.

## 📱 Responsividade
**A aplicação é totalmente responsiva:**

Layout fluido para diferentes tamanhos de tela
Grid adaptativo para currency cards
Gráfico responsivo
🎨 Personalização
Temas e Cores
O projeto utiliza Tailwind CSS para estilização. As cores principais são:

```css
Background: bg-gray-100
Cards: bg-white
Botões: bg-blue-500
Texto: text-gray-800, text-zinc-900
```
**Moedas Suportadas**

Para adicionar novas moedas, edite o array currencyOptions em Filters.tsx

## 📊 Componentes Principais
- CurrencyCards
Exibe cards com taxas de câmbio em tempo real
Props:
data: Objeto com taxas atuais
currencies: Array de moedas selecionadas
- Filters
Controles para seleção de período e moedas
Props:

- selectedPeriod: Período atual selecionado
- selectedCurrencies: Moedas selecionadas
- setSelectedPeriod: Função para atualizar período
- setSelectedCurrencies: Função para atualizar moedas
- HistoricalChart: Gráfico de linha com dados históricos

Props:
data: Objeto com dados históricos
currencies: Array de moedas para exibição
## 📄 Licença

[LICENSE - MIT](https://github.com/aleksanderpalamar/usd-exchange-rates-tracker/blob/main/LICENSE)

## 👥 Contribuição
- Faça o fork do projeto
- Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
- Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
- Push para a branch (`git push origin feature/nova-feature`)
- Abra um Pull Request (`git pull-request -m 'Adiciona nova feature'`)
- Para reportar bugs ou solicitar features, abra uma issue no repositório.

Desenvolvido com ❤️ [Aleksander Palamar](https://aleksanderpalamar.dev/)
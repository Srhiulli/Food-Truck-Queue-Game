# 🚚 Food Truck Queue Game

Um jogo interativo de gerenciamento de fila de food truck construído com Next.js que demonstra o conceito de estrutura de dados **FIFO (First In, First Out)**.

## 📚 Sobre FIFO (First In, First Out)

FIFO é um princípio de gerenciamento de fila onde o **primeiro elemento a entrar é o primeiro a sair**, similar a uma fila de pessoas em um estabelecimento comercial.

### Como funciona no jogo:

1. **Enqueue (Adicionar à fila)**: Quando um novo cliente chega, ele é adicionado ao **final da fila**
2. **Dequeue (Remover da fila)**: Quando você serve um cliente, sempre serve o **primeiro da fila** (o que chegou primeiro)
3. **Limite de capacidade**: A fila tem um limite máximo de 5 clientes

### Implementação

A lógica da fila FIFO está implementada no hook `useQueue`:

```typescript
function enqueue(c: Customer) {
  if (queue.length >= limit) return false
  setQueue(increaseCustomer => [...increaseCustomer, c])  // Adiciona no final
  return c
}

function dequeue() {
  if (queue.length === 0) return null
  const first = queue[0]  // Pega o primeiro
  setQueue(queue.slice(1))  // Remove o primeiro
  return first
}
```

### Exemplo visual:

```
Fila inicial: []
enqueue(Cliente1) → [Cliente1]
enqueue(Cliente2) → [Cliente1, Cliente2]
enqueue(Cliente3) → [Cliente1, Cliente2, Cliente3]
dequeue() → Remove Cliente1 → [Cliente2, Cliente3]
dequeue() → Remove Cliente2 → [Cliente3]
```

## 🎮 Como Jogar

1. Clique em **"New customer"** para adicionar clientes à fila
2. Veja o pedido de cada cliente no balão de fala
3. Selecione os ingredientes necessários para preparar o pedido
4. Clique em **"Serve Customer"** quando tiver todos os ingredientes corretos
5. O primeiro cliente da fila será atendido (FIFO!)

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

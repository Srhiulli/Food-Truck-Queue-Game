// app/hooks/useQueue.ts
import { useState } from 'react'
import { Customer } from '../types/Customer'

export function useQueue(limit = 5) {
  const [queue, setQueue] = useState<Customer[]>([])

  function enqueue(c: Customer) {
    if (queue.length >= limit) return false
    setQueue(increaseCustomer => [...increaseCustomer, c])
    return true
  }

  function dequeue() {
      if (queue.length === 0) return null
      const first = queue[0]
      setQueue(queue.slice(1))
    return first
  }

  return { queue, enqueue, dequeue }
}
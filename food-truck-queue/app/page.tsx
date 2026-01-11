'use client'

import { useState } from 'react'
import { ORDERS, ITENS_ICONS, PREPARE_ORDER_ITENS } from './constants/orders'
import { useQueue } from './hooks/useQueue'
import styles from './page.module.css'

let id = 1

export default function Page() {
  const { queue, enqueue, dequeue } = useQueue(5)
  const [itens, setItens] = useState([])
  const [costumer, setCostumer] = useState([])

  function addCustomer() {
    const ordered = ORDERS[Math.floor(Math.random() * ORDERS.length)]
    const c = enqueue({
      id: id++,
      order: ordered
    })
    setCostumer([...costumer, c])
  }

  function serveCustomer() {
    if (!itens.length) return
    const ordered = costumer[0]?.order
    const requiredItens = ordered ? PREPARE_ORDER_ITENS[ordered] : []

    const hasAllItens = requiredItens.every((requiredItem) => {
      const hasItem = itens.includes(requiredItem)
      return hasItem
    })

    if (hasAllItens) {
      dequeue()
      setItens([])
    }
  }

  function unselectItens(item: string) {
    setItens(itens.filter((i) => i !== item))
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>Food Truck Queue</h1>
      </div>

      <div className={styles.counter}>
        <div className={styles.counterTop}></div>
        <div className={styles.counterBottom}>
          <div className={styles.chef}>🧑‍🍳</div>
        </div>
      </div>

      <div className={styles.queueContainer}>
        {queue.length === 0
          ? (
          <div className={styles.emptyQueue}>No customers in queue...</div>
          )
          : (
          <div className={styles.queue}>
              {queue.map((c) => (
              <div key={c.id} className={styles.customerWrapper}>
                <div className={styles.speechBubble}>
                  {c.order}
                  <div className={styles.bubbleTail}></div>
                </div>
                <div className={styles.person}>
                    🙋
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <button className={styles.button} onClick={addCustomer} disabled={queue.length >= 5}>
          👤 New customer
        </button>
        <button className={styles.button} onClick={serveCustomer} disabled={queue.length === 0}>
          ✅ Serve Customer
        </button>
      </div>

      <div className={styles.status}>
        Queue: {queue.length}/5
      </div>

      <div>
        <div className={styles.itensLegend}>
          {Object.entries(ITENS_ICONS).map(([item, icon]) => (
            <div key={item} className={styles.itemWrapper}>
              <div
                className={`${styles.item} ${itens.includes(item) ? styles.itemSelected : ''}`}
                onClick={() => itens.includes(item) ? unselectItens(item) : setItens([...itens, item])}
              >
                {icon}
              </div>
              {itens.includes(item) && (
                <div className={styles.removeButton} onClick={() => unselectItens(item)}>
                  ✕
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
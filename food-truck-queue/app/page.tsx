'use client'

import { useQueue } from './hooks/useQueue'
import styles from './page.module.css'

let id = 1
const ORDERS = ['🌮 Taco', '🍔 Burger', '🌭 Hot Dog']

export default function Page() {
  const { queue, enqueue, dequeue } = useQueue(5)

  function addCustomer() {
    enqueue({
      id: id++,
      order: ORDERS[Math.floor(Math.random() * ORDERS.length)]
    })
  }

  function serveCustomer() {
    dequeue()
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <div className={styles.truck}>🚚</div>
        <h1>Food Truck Queue</h1>
      </div>

      <div className={styles.counter}>
        <div className={styles.counterTop}></div>
        <div className={styles.counterBottom}></div>
      </div>

      <div className={styles.queueContainer}>
        {queue.length === 0 ? (
          <div className={styles.emptyQueue}>No customers in queue...</div>
        ) : (
          <div className={styles.queue}>
            {queue.map((c, index) => (
              <div key={c.id} className={styles.customerWrapper}>
                <div className={styles.speechBubble}>
                  {c.order}
                  <div className={styles.bubbleTail}></div>
                </div>
                <div className={styles.person}>
                  {index === 0 ? '🙋' : '🧍'}
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
    </main>
  )
}
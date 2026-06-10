// Service Worker for push notifications
self.addEventListener('message', (event) => {
  if (event.data.type === 'SCHEDULE_DAILY') {
    // Schedule notification for 9am tomorrow
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(9, 0, 0, 0)

    const delay = tomorrow - now

    setTimeout(() => {
      self.registration.showNotification('Good morning 🌸', {
        body: 'How are you feeling today? Your daily check-in is waiting.',
        icon: '/favicon.svg',
        badge: '/favicon.svg',
        tag: 'daily-checkin',
        requireInteraction: false,
      })

      // Reschedule for the next day
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'SCHEDULE_DAILY' })
        })
      })
    }, delay)
  }
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (let client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/')
      }
    })
  )
})

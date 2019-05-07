class EventBus {
  private eventMap
  constructor() {
    this.eventMap = new Map()
  }
  addEventListener(event, listener) {
    if (!this.eventMap.has(event)) this.eventMap.set(event, [])
    this.eventMap.get(event).push(listener)
  }
  removeEventListener(event, listener) {
    if (!this.eventMap.has(event)) return
    for (let i = this.eventMap.get(event).length; i > 0; i--) {
      if (this.eventMap.get(event)[i].listener === listener) {
        this.eventMap.get(event).splice(i, 1)
      }
    }
  }
  emitEvent(event, ...args) {
    if (!this.eventMap.has(event)) return
    this.eventMap.get(event).forEach(func => {
      func.apply(this, args)
    })
  }
}
const eventBus = new EventBus()
export default eventBus

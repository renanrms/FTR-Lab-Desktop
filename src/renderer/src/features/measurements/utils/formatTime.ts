export function formatTime(t: number) {
  const hours = Math.floor(t / 3600)
  const minutes = Math.floor((t - 3600 * hours) / 60)
  const seconds = Math.floor((t - 3600 * hours - 60 * minutes) % 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  } else {
    return `${seconds}s`
  }
}

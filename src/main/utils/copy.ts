export function copy<T>(state: T): T {
  return JSON.parse(JSON.stringify(state))
}

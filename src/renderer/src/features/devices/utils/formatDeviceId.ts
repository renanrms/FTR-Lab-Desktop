export function formatDeviceId(deviceId: string) {
  const slices = []

  const rest = deviceId.length % 3

  slices.push(deviceId.slice(0, rest))
  let start = rest

  while (start < deviceId.length) {
    slices.push(deviceId.slice(start, start + 3))
    start = start + 3
  }

  return slices.join('.')
}

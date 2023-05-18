import {
  Battery20,
  Battery30,
  Battery50,
  Battery60,
  Battery80,
  Battery90,
  BatteryFull,
  BatteryCharging20,
  BatteryCharging30,
  BatteryCharging50,
  BatteryCharging60,
  BatteryCharging80,
  BatteryCharging90,
  BatteryChargingFull,
} from '@mui/icons-material'

export function getBatteryIcon(level: number, charging: boolean = false) {
  if (level < 25) return charging ? BatteryCharging20 : Battery20
  else if (level < 40) return charging ? BatteryCharging30 : Battery30
  else if (level < 55) return charging ? BatteryCharging50 : Battery50
  else if (level < 70) return charging ? BatteryCharging60 : Battery60
  else if (level < 85) return charging ? BatteryCharging80 : Battery80
  else if (level < 95) return charging ? BatteryCharging90 : Battery90
  else return charging ? BatteryChargingFull : BatteryFull
}

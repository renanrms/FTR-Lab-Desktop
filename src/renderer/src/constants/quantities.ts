type Quantity = {
  name: string
  defaultUnit: {
    symbol: string
    isSI?: boolean
  }
}

export const quantities: Record<string, Quantity | undefined> = {
  distance: {
    name: 'Distância',
    defaultUnit: { symbol: 'm', isSI: true },
  },
  temperature: {
    name: 'Temperatura',
    defaultUnit: { symbol: 'ºC', isSI: false },
  },
  mass: {
    name: 'Massa',
    defaultUnit: { symbol: 'kg', isSI: true },
  },
  time: {
    name: 'Tempo',
    defaultUnit: { symbol: 's', isSI: true },
  },
  velocity: {
    name: 'Velocidade',
    defaultUnit: { symbol: 'm/s', isSI: true },
  },
  acceleration: {
    name: 'Aceleração',
    defaultUnit: { symbol: 'm/s²', isSI: true },
  },
  force: {
    name: 'Força',
    defaultUnit: { symbol: 'N', isSI: true },
  },
  energy: {
    name: 'Energia',
    defaultUnit: { symbol: 'J', isSI: true },
  },
  power: {
    name: 'Potência',
    defaultUnit: { symbol: 'W', isSI: true },
  },
  pressure: {
    name: 'Pressão',
    defaultUnit: { symbol: 'Pa', isSI: true },
  },
  electric_current: {
    name: 'Corrente elétrica',
    defaultUnit: { symbol: 'A', isSI: true },
  },
  voltage: {
    name: 'Tensão',
    defaultUnit: { symbol: 'V', isSI: true },
  },
  resistance: {
    name: 'Resistência',
    defaultUnit: { symbol: 'Ω', isSI: true },
  },
  frequency: {
    name: 'Frequência',
    defaultUnit: { symbol: 'Hz', isSI: true },
  },
  angle: {
    name: 'Ângulo',
    defaultUnit: { symbol: 'rad', isSI: true },
  },
  area: {
    name: 'Área',
    defaultUnit: { symbol: 'm²', isSI: true },
  },
  volume: {
    name: 'Volume',
    defaultUnit: { symbol: 'm³', isSI: true },
  },
  electric_charge: {
    name: 'Carga elétrica',
    defaultUnit: { symbol: 'C', isSI: true },
  },
  capacitance: {
    name: 'Capacitância',
    defaultUnit: { symbol: 'F', isSI: true },
  },
  inductance: {
    name: 'Indutância',
    defaultUnit: { symbol: 'H', isSI: true },
  },
  magnetic_field_strength: {
    name: 'Intensidade de campo magnético',
    defaultUnit: { symbol: 'T', isSI: true },
  },
  magnetic_flux: {
    name: 'Fluxo magnético',
    defaultUnit: { symbol: 'Wb', isSI: true },
  },
  electric_field_strength: {
    name: 'Intensidade de campo elétrico',
    defaultUnit: { symbol: 'V/m', isSI: true },
  },
  electric_potential: {
    name: 'Potencial elétrico',
    defaultUnit: { symbol: 'V', isSI: true },
  },
  electric_resistance: {
    name: 'Resistência elétrica',
    defaultUnit: { symbol: 'Ω', isSI: true },
  },
  electric_conductance: {
    name: 'Condutância elétrica',
    defaultUnit: { symbol: 'S', isSI: true },
  },
  luminous_intensity: {
    name: 'Intensidade luminosa',
    defaultUnit: { symbol: 'cd', isSI: true },
  },
  illuminance: {
    name: 'Iluminância',
    defaultUnit: { symbol: 'lx', isSI: true },
  },
  radioactivity: {
    name: 'Radioatividade',
    defaultUnit: { symbol: 'Bq', isSI: true },
  },
  absorbed_dose: {
    name: 'Dose absorvida',
    defaultUnit: { symbol: 'Gy', isSI: true },
  },
  equivalent_dose: {
    name: 'Dose equivalente',
    defaultUnit: { symbol: 'Sv', isSI: true },
  },
  catalytic_activity: {
    name: 'Atividade catalítica',
    defaultUnit: { symbol: 'kat', isSI: true },
  },
  information: {
    name: 'Informação',
    defaultUnit: { symbol: 'bit', isSI: false },
  },
  data_storage: {
    name: 'Armazenamento de dados',
    defaultUnit: { symbol: 'byte', isSI: false },
  },
  linear_force_density: {
    name: 'Densidade linear de força',
    defaultUnit: { symbol: 'N/m', isSI: true },
  },
  torque: {
    name: 'Torque',
    defaultUnit: { symbol: 'N.m', isSI: true },
  },
  angular_velocity: {
    name: 'Velocidade angular',
    defaultUnit: { symbol: 'rad/s', isSI: true },
  },
  angular_acceleration: {
    name: 'Aceleração angular',
    defaultUnit: { symbol: 'rad/s²', isSI: true },
  },
  angular_momentum: {
    name: 'Momento angular',
    defaultUnit: { symbol: 'kg.m²/s', isSI: true },
  },
  moment_of_inertia: {
    name: 'Momento de inércia',
    defaultUnit: { symbol: 'kg.m²', isSI: true },
  },
  surface_tension: {
    name: 'Tensão superficial',
    defaultUnit: { symbol: 'N/m', isSI: true },
  },
}

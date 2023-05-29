import { TxtAnswer } from 'dns-packet'

export function getTxtAnswerData(txtAnswer: TxtAnswer) {
  const txtAnswerItems = (txtAnswer.data as Array<string | Buffer>).map(
    (entry) => {
      const [key, value] = entry.toString().split('=')
      try {
        return { key, value: JSON.parse(value) }
      } catch (error) {
        return { key, value }
      }
    },
  )

  let txtAnswerData: any = { sensors: [] }
  for (const item of txtAnswerItems) {
    if (item.key.match(/^sensor\[.*\]$/)) {
      txtAnswerData.sensors = [...(txtAnswerData.sensors || []), item.value]
    } else {
      txtAnswerData = {
        ...txtAnswerData,
        ...{ [item.key]: item.value },
      }
    }
  }

  return txtAnswerData
}

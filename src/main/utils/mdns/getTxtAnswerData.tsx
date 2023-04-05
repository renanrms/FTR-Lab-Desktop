import { TxtAnswer } from 'dns-packet'

export function getTxtAnswerData(txtAnswer: TxtAnswer) {
  const txtAnswerItems = (txtAnswer.data as Array<string | Buffer>).map(
    (entry) => {
      const [key, value] = entry.toString().split('=')
      try {
        return { [key]: JSON.parse(value) }
      } catch (error) {
        return { [key]: value }
      }
    },
  )

  let txtAnswerData: any = { sensors: [] }
  for (const item of txtAnswerItems) {
    if (item.sensor) {
      txtAnswerData.sensors = [...(txtAnswerData.sensors || []), item.sensor]
    } else {
      txtAnswerData = {
        ...txtAnswerData,
        ...item,
      }
    }
  }

  return txtAnswerData
}

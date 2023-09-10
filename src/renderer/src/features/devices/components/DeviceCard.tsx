import AccessTimeIcon from '@mui/icons-material/AccessTime'
// import PauseIcon from '@mui/icons-material/Pause'
import PauseIcon from '@mui/icons-material/PauseOutlined'
import PlayIcon from '@mui/icons-material/PlayArrowOutlined'
import { Button, Tooltip } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { twMerge } from 'tailwind-merge'

import { quantities } from '@renderer/constants/quantities'
import { Device } from '@shared/types/Device'

import { toggleConnection } from '../services/toggleConnection'
import { formatDeviceId } from '../utils/formatDeviceId'
import { BatteryIndicator } from './BatteryIndicator'

interface DeviceCardProps {
  device: Device
}

export function DeviceCard(props: DeviceCardProps) {
  const connectionMutation = useMutation({ mutationFn: toggleConnection })

  return (
    <div
      className={twMerge(
        'relative w-full min-h-[180px] p-4 mb-4 border border-neutral-90 dark:border-neutral-30 rounded-md flex flex-col items-start justify-between bg-neutral-100 dark:bg-background text-on-background',
        !props.device.available && !props.device.connected && 'opacity-60',
      )}
    >
      <div className="w-full flex items-center justify-between">
        <div>
          <p className="grow text-md">{props.device.name}</p>
        </div>

        <div className="flex gap-0.5">
          {!props.device.timeSynced && (
            <Tooltip
              title={
                <>
                  <p className="font-extrabold">
                    Horário não sincronizado: Medidas absolutas de tempo serão
                    imprecisas para o dispositivo.
                  </p>
                  <p>(Possivelmente a rede não tem acesso à internet)</p>
                </>
              }
            >
              <AccessTimeIcon
                sx={{
                  fontSize: '20px',
                  color: 'var(--md-sys-color-error)',
                }}
              />
            </Tooltip>
          )}
          {props.device.battery && (
            <BatteryIndicator {...props.device.battery} />
          )}
        </div>
      </div>

      <p className="text-sm tracking-wider text-neutral-50 dark:text-neutral-70 uppercase">
        {formatDeviceId(props.device.id)}
      </p>

      <div
        className={twMerge(
          'w-full my-4 grow flex flex-wrap flex-row gap-1 justify-left',
        )}
      >
        {props.device.sensors?.map((sensor, index) => {
          const quantity = quantities[sensor.quantity]
          return (
            <div
              className="flex flex-nowrap w-fit h-fit divide-x rounded-2xl border bg-neutral-95 dark:bg-neutral-20 border-neutral-90 dark:border-neutral-25 divide-neutral-90 dark:divide-neutral-25 text-neutral-30 dark:text-neutral-90"
              key={index}
            >
              <div className="text-sm px-2 py-0.5">
                {quantity?.name || sensor.quantity}
              </div>

              {quantity?.defaultUnit.symbol && (
                <div className="text-sm px-2 py-0.5">
                  {quantity.defaultUnit.symbol}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="w-full h-8 flex justify-center items-center">
        <Button
          className={twMerge(
            'rounded-full px-4 py-1 capitalize',
            props.device.connected && 'dark:text-error-90',
            props.device.available &&
              !props.device.connected &&
              'dark:text-primary-90',
          )}
          variant={'outlined'}
          color={props.device.connected ? 'error' : 'primary'}
          onClick={() => {
            connectionMutation.mutate(props.device)
          }}
          startIcon={props.device.connected ? <PauseIcon /> : <PlayIcon />}
          disabled={
            (!props.device.available && !props.device.connected) ||
            connectionMutation.isLoading
          }
        >
          <span className="w-12">
            {props.device.connected ? 'Parar' : 'Iniciar'}
          </span>
        </Button>
      </div>
    </div>
  )
}

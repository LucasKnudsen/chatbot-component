import { onMount } from 'solid-js'

type Props = {
  color?: string | undefined
  source?: any
  height?: number
  width?: number
}

export const AudioVisualizer = (props: Props) => {
  let canvas: any

  function visualize(isElement: boolean, source: any) {
    const ctx = canvas.getContext('2d')
    const context = new AudioContext()
    let src: any

    if (isElement) {
      // audio record
      src = context.createMediaElementSource(source)
    } else {
      // live record
      src = context.createMediaStreamSource(source)
    }

    const analyser = context.createAnalyser()
    const listen = context.createGain()

    src.connect(listen)

    listen.connect(analyser)

    if (isElement) analyser.connect(context.destination)

    analyser.fftSize = 2 ** 12

    const bufferLength = analyser.frequencyBinCount

    const dataArray = new Uint8Array(bufferLength)

    renderFrame()

    function renderFrame() {
      requestAnimationFrame(renderFrame)

      analyser.smoothingTimeConstant = 0.5

      listen.gain.setValueAtTime(1, context.currentTime)

      // const WIDTH = (canvas.width = window.innerWidth)
      // const HEIGHT = (canvas.height = window.innerHeight)

      const WIDTH = (canvas.width = props.width || 128)
      const HEIGHT = (canvas.height = props.height || 128)

      const sliceWidth = (WIDTH * 1) / bufferLength

      let x = 0

      ctx.fillStyle = 'transparent'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      ctx.lineWidth = 1
      ctx.strokeStyle = props.color ?? '#fff'
      ctx.beginPath()

      ctx.stroke()
      ctx.closePath()

      // waveform
      analyser.getByteFrequencyData(dataArray)
      let start = 0 //dataArray.find(a=> Math.max.apply('',dataArray));
      analyser.getByteTimeDomainData(dataArray)
      ctx.lineWidth = 2
      ctx.strokeStyle = props.color ?? '#fff'
      ctx.beginPath()
      x = 0

      for (var i = start; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0
        var y = (v * HEIGHT) / 2

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }

        x = i * sliceWidth //frequencyBins/analyser.sampleRate;
      }

      ctx.lineTo(WIDTH, ((dataArray[0] / 128.0) * HEIGHT) / 2)
      ctx.stroke()
    }
  }

  const openMic = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    visualize(false, stream)
  }

  const openAudio = async () => visualize(true, props.source)

  onMount(() => {
    openMic()

    props.source && openAudio()
  })

  return (
    <canvas ref={canvas} width='256' height='256' class='pointer-events-none overflow-hidden' />
  )
}

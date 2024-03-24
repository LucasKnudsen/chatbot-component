import { onMount } from 'solid-js'

export const AudioVisualizer = () => {
  let canvas: any

  function visualize(from: number, source: any) {
    const ctx = canvas.getContext('2d')
    const context = new AudioContext()
    let src: any

    if (0 == from) {
      src = context.createMediaElementSource(source)
    } else if (1 == from) {
      src = context.createMediaStreamSource(source)
    } else if (2 == from) {
      src = context.createMediaStreamSource(source)
    }

    const analyser = context.createAnalyser()
    const listen = context.createGain()

    src.connect(listen)

    listen.connect(analyser)

    if (from == 0) analyser.connect(context.destination)

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

      const WIDTH = (canvas.width = 128)
      const HEIGHT = (canvas.height = 128)

      const sliceWidth = (WIDTH * 1.0) / bufferLength

      let x = 0

      ctx.fillStyle = 'transparent'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      ctx.lineWidth = 1
      ctx.strokeStyle = '#fff'
      ctx.beginPath()

      ctx.stroke()
      ctx.closePath()

      // waveform
      analyser.getByteFrequencyData(dataArray)
      let start = 0 //dataArray.find(a=> Math.max.apply('',dataArray));
      analyser.getByteTimeDomainData(dataArray)
      ctx.lineWidth = 1
      ctx.strokeStyle = '#fff'
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
    visualize(1, stream)
  }

  onMount(() => openMic())

  return (
    <canvas
      ref={canvas}
      width='256'
      height='256'
      class='absolute inset-0 w-full h-full pointer-events-none'
    />
  )
}

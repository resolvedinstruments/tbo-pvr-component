import { useEffect } from "preact/hooks"
import { pannellum } from "./pannellum/pannellum"
import { container } from "./styles.css"

import { useRef } from "preact/hooks"

export const Panorama = ({
  stichedImage = "stiched.jpg",
  stichedImageSmall,
  previewImage,
  aspectRatio = "5/2",
}: {
  stichedImage?: string
  stichedImageSmall?: string
  previewImage?: string
  aspectRatio?: string
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  if (!previewImage) {
    previewImage = stichedImage.replace("stitched.jpg", "thumbnail.png")
  }

  const getMaxTextureSize = () => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.error("Canvas not found")
      return 8192
    }
    const gl = canvas.getContext("webgl2")
    if (!gl) {
      console.error("WebGL not supported")
      return 8192
    }
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
    return maxTextureSize
  }

  const isIphone = () => {
    return /iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
  }

  const useSmallTexture = () => getMaxTextureSize() * 2 < 20891 || isIphone()

  useEffect(() => {
    // calculate vaov from ponomara image dimensions
    const vaov = (2160 / 20891) * 360 * 1

    const maxTextureSize = getMaxTextureSize()

    // pannellum can automatically split textures into 2x if needed.  However iPhones seem to report a larger max texture size than they can actually handle.
    const stichedImageToUse =
      getMaxTextureSize() * 2 < 20891 || isIphone()
        ? stichedImageSmall
        : stichedImage

    let aspectRatio
    if (divRef.current) {
      // divRef should always be defined if called in useEffect handler.
      const { clientWidth, clientHeight } = divRef.current
      aspectRatio = clientWidth / clientHeight
      console.log("aspectRatio", aspectRatio)
    } else {
      // should never happen
      console.error("divRef.current is null")
      aspectRatio = 5 / 2
    }

    const hfov =
      2 *
      Math.atan(Math.tan((vaov / 2) * (Math.PI / 180)) * aspectRatio) *
      (180 / Math.PI)

    pannellum.viewer("panorama", {
      type: "equirectangular",
      panorama: stichedImageToUse || stichedImage,
      preview: previewImage,
      vaov,
      minPitch: -vaov / 2,
      maxPitch: vaov / 2,
      showFullscreenCtrl: false,
      showControls: false,
      showZoomCtrl: false,
      autoLoad: true,
      minHfov: 30,
      maxHfov: hfov * 1.0,
      hfov: hfov,
    })
  })

  return (
    <>
      <div
        id="panorama"
        className={container}
        ref={divRef}
        style={{ aspectRatio }}
      ></div>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </>
  )
}
export default Panorama

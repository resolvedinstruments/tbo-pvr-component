import { useEffect } from "preact/hooks"
import { pannellum } from "./pannellum/pannellum"
import { container } from "./styles.css"

import { useRef } from "preact/hooks"

export const Panorama = ({
  stichedImage = "stiched.jpg",
  previewImage,
}: {
  stichedImage?: string
  previewImage?: string
}) => {
  const divRef = useRef<HTMLDivElement>(null)

  if (!previewImage) {
    previewImage = stichedImage.replace("stitched.jpg", "thumbnail.png")
  }

  useEffect(() => {
    // calculate vaov from ponomara image dimensions
    const width = 20891
    const height = 2160
    const vaov = (height / width) * 360 * 1

    let aspectRatio = 2.5
    if (divRef.current) {
      const { clientWidth, clientHeight } = divRef.current
      aspectRatio = clientWidth / clientHeight
    }

    const hfov =
      2 *
      Math.atan(Math.tan((vaov / 2) * (Math.PI / 180)) * aspectRatio) *
      (180 / Math.PI)

    pannellum.viewer("panorama", {
      type: "equirectangular",
      panorama: stichedImage,
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
    })
  })

  return <div id="panorama" className={container} ref={divRef}></div>
}
export default Panorama

import { useEffect } from "preact/hooks"
import { pannellum } from "./pannellum/pannellum"
import { container } from "./styles.css"

import { useRef } from "preact/hooks"

export const Panorama = () => {
  const panoramaImage = "example_stitched.jpg"
  const previewImage = panoramaImage.replace("stitched.jpg", "thumbnail.png")
  const imgRef = useRef(null)

  useEffect(() => {
    // calculate vaov from ponomara image dimensions
    const width = 20891
    const height = 2160
    const vaov = (height / width) * 360

    // fudge factor to remove edges from image
    const vaov2 = vaov * 0.92

    pannellum.viewer("panorama", {
      type: "equirectangular",
      panorama: panoramaImage,
      preview: previewImage,
      vaov,
      minPitch: -vaov2 / 2,
      maxPitch: vaov2 / 2,
      showFullscreenCtrl: false,
      showZoomCtrl: false,
      autoLoad: true,
      minHfov: 40,
      maxHfov: (vaov2 * 16) / 9,
      dynamic: false,
    })
  })

  return <div id="panorama" className={container}></div>
}
export default Panorama

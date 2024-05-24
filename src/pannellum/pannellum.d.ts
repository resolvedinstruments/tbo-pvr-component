export interface ViewerConfig {
  panorama: string
  preview?: string
  hfov?: number
  minHfov?: number
  multiResMinHfov?: boolean
  maxHfov?: number
  pitch?: number
  minPitch?: number
  maxPitch?: number
  yaw?: number
  minYaw?: number
  maxYaw?: number
  roll?: number
  haov?: number
  vaov?: number
  vOffset?: number
  autoRotate?: boolean
  autoRotateInactivityDelay?: number
  autoRotateStopDelay?: number
  type?: string
  northOffset?: number
  showFullscreenCtrl?: boolean
  dynamic?: boolean
  dynamicUpdate?: boolean
  doubleClickZoom?: boolean
  keyboardZoom?: boolean
  mouseZoom?: boolean
  showZoomCtrl?: boolean
  autoLoad?: boolean
  showControls?: boolean
  orientationOnByDefault?: boolean
  hotSpotDebug?: boolean
  backgroundColor?: [number, number, number]
  avoidShowingBackground?: boolean
  animationTimingFunction?: (t: number) => number
  draggable?: boolean
  dragConfirm?: boolean
  disableKeyboardCtrl?: boolean
  crossOrigin?: string
  targetBlank?: boolean
  touchPanSpeedCoeffFactor?: number
  capturedKeyNumbers?: number[]
  friction?: number
  strings?: {
    loadButtonLabel?: string
    loadingLabel?: string
    bylineLabel?: string
    noPanoramaError?: string
    fileAccessError?: string
    malformedURLError?: string
    iOS8WebGLError?: string
    genericWebGLError?: string
    textureSizeError?: string
    unknownError?: string
    twoTouchActivate?: string
    twoTouchXActivate?: string
    twoTouchYActivate?: string
    ctrlZoomActivate?: string
  }
}

export class Viewer {
  constructor(container: HTMLElement | string, initialConfig: ViewerConfig)
  // Add methods and properties as needed
}

export const pannellum: {
  viewer: (container: HTMLElement | string, config: ViewerConfig) => Viewer
}

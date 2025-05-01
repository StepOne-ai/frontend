"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { RotateCcw, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import type * as THREE from "three"

function TeethModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (modelRef.current) {
      // Медленное вращение модели для демонстрации
      modelRef.current.rotation.y += 0.001
    }
  })

  return <primitive ref={modelRef} object={scene} scale={1} position={[0, 0, 0]} />
}

interface TeethModelViewerProps {
  modelUrl: string
  title?: string
}

export default function TeethModelViewer({ modelUrl, title }: TeethModelViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const isMobile = useIsMobile()

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Ошибка при переходе в полноэкранный режим: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const handleZoom = (value: number[]) => {
    setZoom(value[0])
  }

  const resetCamera = () => {
    setZoom(1)
  }

  return (
    <div ref={containerRef} className="relative w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden border">
      {title && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm p-2 md:p-3 border-b">
          <h3 className="font-medium text-sm md:text-base">{title}</h3>
        </div>
      )}

      <div
        className={`absolute bottom-4 left-4 right-4 z-10 flex ${isMobile ? "flex-col gap-2" : "justify-between items-center"}`}
      >
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg">
          <Button variant="outline" size="icon" onClick={resetCamera} className="h-8 w-8 md:h-9 md:w-9">
            <RotateCcw className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
          <ZoomOut className="h-3 w-3 md:h-4 md:w-4 text-gray-500" />
          <Slider
            className={`${isMobile ? "w-24" : "w-32"}`}
            value={[zoom]}
            min={0.5}
            max={2}
            step={0.1}
            onValueChange={handleZoom}
          />
          <ZoomIn className="h-3 w-3 md:h-4 md:w-4 text-gray-500" />
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleFullscreen}
          className={`${isMobile ? "self-end" : ""} h-8 w-8 md:h-9 md:w-9`}
        >
          {isFullscreen ? (
            <Minimize2 className="h-3 w-3 md:h-4 md:w-4" />
          ) : (
            <Maximize2 className="h-3 w-3 md:h-4 md:w-4" />
          )}
        </Button>
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} zoom={zoom} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <TeethModel url={modelUrl} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          rotateSpeed={isMobile ? 0.5 : 1} // Замедляем вращение на мобильных устройствах
          zoomSpeed={isMobile ? 0.5 : 1} // Замедляем зум на мобильных устройствах
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}

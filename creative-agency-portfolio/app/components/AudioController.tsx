"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function AudioController() {
  const [isMuted, setIsMuted] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio("/audio/ambient.mp3")
      audioRef.current.loop = true
      audioRef.current.volume = 0.2
    }

    // Show controller after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => {
      clearTimeout(timer)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((error) => {
          console.log("Audio playback prevented:", error)
          setIsMuted(true)
        })
      }
    }
  }, [isMuted])

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        // Try to play and handle any autoplay restrictions
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsMuted(false)
            })
            .catch((error) => {
              console.log("Audio playback prevented:", error)
              // Keep it muted if autoplay is blocked
              setIsMuted(true)
            })
        }
      } else {
        audioRef.current.pause()
        setIsMuted(true)
      }
    }
  }

  if (!isVisible) return null

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/80 hover:bg-black/50 transition-colors"
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  )
}


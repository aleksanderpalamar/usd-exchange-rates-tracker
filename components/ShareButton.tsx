"use client"

import { useState } from "react"
import { ShareIcon } from "@heroicons/react/16/solid"
import html2canvas from "html2canvas"

export default function ShareButton() {
  const [isCapturing, setIsCapturing] = useState(false)

  const captureScreenshot = async () => {
    try {
      const element = document.documentElement
      const canvas = await html2canvas(element)
      return await new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob)
        }, 'image/png', 0.8)
      })
    } catch (error) {
      console.error('Erro ao capturar screenshot:', error)
      return null
    }
  }

  const handleShare = async () => {
    try {
      setIsCapturing(true)
      
      // Verifica se o navegador suporta compartilhamento com arquivos
      if (navigator.share && navigator.canShare) {
        const screenshot = await captureScreenshot() as Blob
        
        if (screenshot) {
          const file = new File([screenshot], 'screenshot.png', { 
            type: 'image/png' 
          })
  
          const currentUrl = new URL(window.location.href)
          const shareData = {
            title: 'Cotação do Dólar',
            text: `${currentUrl.host} - Confira a cotação atual do dólar!`,
            url: window.location.href,
            files: [file]
          }
  
          // Verifica se pode compartilhar com arquivos
          if (navigator.canShare(shareData)) {
            await navigator.share(shareData)
          } else {
            // Fallback para compartilhamento sem arquivo
            await navigator.share({
              title: 'Cotação do Dólar',
              text: `${currentUrl.host} - Confira a cotação atual do dólar!`,	
              url: window.location.href
            })
          }
        }
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copiado para área de transferência!')
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error)
    } finally {
      setIsCapturing(false)
    }
  } 

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50">
      <button
        onClick={handleShare}
        disabled={isCapturing}
        className="flex items-center justify-center gap-2 
          px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3
          text-sm sm:text-base md:text-lg
          font-medium text-white 
          bg-blue-600 hover:bg-blue-700
          rounded-full sm:rounded-lg md:rounded-xl
          shadow-lg hover:shadow-xl
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ShareIcon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        <span className="hidden sm:inline">
          {isCapturing ? 'Capturando...' : 'Compartilhar'}
        </span>
      </button>
    </div>
  )
}
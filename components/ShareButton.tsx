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
    <div className="flex items-center gap-2">
      <button 
        onClick={handleShare}
        disabled={isCapturing}
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50">
        <ShareIcon className="h-5 w-5 mr-2" />
        {isCapturing ? 'Capturando...' : 'Compartilhar'}
      </button>      
    </div>
  )
}
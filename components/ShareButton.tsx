import { FiTwitter } from "react-icons/fi";
import { TwitterShareButton } from "react-share";

export default function ShareButton() {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const title = 'Check the dollar rate in real time!'
  return (
    <div className="flex items-center gap-2">
      <div className="text-gray-800">Share:</div>
      <TwitterShareButton url={shareUrl} title={title}>
        <div className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          <FiTwitter className="w-6 h-6" />
        </div>
      </TwitterShareButton>
    </div>
  )
}
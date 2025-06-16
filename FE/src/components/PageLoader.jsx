import { LoaderIcon } from 'lucide-react'
import React from 'react'

const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
    <LoaderIcon className="size-12 animate-spin text-primary" />
    </div>
  )
}

export default PageLoader
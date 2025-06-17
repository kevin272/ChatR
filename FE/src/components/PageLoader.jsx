import { LoaderIcon } from 'lucide-react'
import React from 'react'
import { useThemeStore } from '../store/useThemeStore'

const PageLoader = () => {
  const {theme} = useThemeStore();
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme={theme}>
    <LoaderIcon className="size-12 animate-spin text-primary" />
    </div>
  )
}

export default PageLoader
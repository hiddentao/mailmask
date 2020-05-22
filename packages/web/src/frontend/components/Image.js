import React, { useMemo } from 'react'

const IMAGES = {
  favicon: require('../images/favicon_144.png'),
}

const Image = ({ className, src }) => {
  const finalSrc = useMemo(() => {
    return (src.startsWith('http') ? src : IMAGES[src])
  }, [ src ])

  return (
    <img className={className} src={finalSrc} />
  )
}

export default Image

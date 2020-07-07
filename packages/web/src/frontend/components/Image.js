import React, { useMemo } from 'react'

const IMG = {
  howItWorks1: require('../images/how_it_works_1.png'),
  howItWorks2: require('../images/how_it_works_2.png'),
  howItWorks3: require('../images/how_it_works_3.png'),
  fire: require('../images/fire.png'),
  farez: require('../images/farez.jpeg'),
}

const ImageComponent = ({ src, ...props }) => {
  const finalSrc = useMemo(() => {
    return IMG[src] || src
  }, [ src ])

  return <img src={finalSrc} {...props} />
}

export default ImageComponent

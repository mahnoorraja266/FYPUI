import React from 'react'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fill?: boolean
  priority?: boolean
}

export default function Image({
  src,
  alt,
  className,
  fill,
  width,
  height,
  priority,
  style,
  ...props
}: ImageProps) {
  const mergedStyle: React.CSSProperties = {
    ...style,
  }

  if (fill) {
    mergedStyle.position = 'absolute'
    mergedStyle.height = '100%'
    mergedStyle.width = '100%'
    mergedStyle.inset = 0
    mergedStyle.objectFit = 'cover'
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={mergedStyle}
      width={width}
      height={height}
      {...props}
    />
  )
}

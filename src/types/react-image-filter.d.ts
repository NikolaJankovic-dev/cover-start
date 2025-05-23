declare module 'react-image-filter' {
  interface ImageFilterProps {
    image: string;
    filter: number[];
    className?: string;
    svgStyle?: React.CSSProperties;
    preserveAspectRatio?: string;
  }
  
  const ImageFilter: React.FC<ImageFilterProps>;
  export default ImageFilter;
} 
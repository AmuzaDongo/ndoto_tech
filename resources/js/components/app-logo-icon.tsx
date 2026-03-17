interface AppLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
}

export default function AppLogo({ 
  src = "/assets/logos/icon.png", // default logo path
  alt = "Ndoto Company",
  className,
  ...props 
}: AppLogoProps) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`h-auto w-auto ${className ?? ""}`} 
      {...props} 
      onError={(e) => {
        // fallback if image fails to load
        (e.target as HTMLImageElement).src = "https://placehold.co/100x40?text=Logo";
      }}
    />
  );
}
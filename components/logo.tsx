import Image from 'next/image';
import UniclothLogo from '@/assets/logo.svg';
import UniclothLogoWhite from '@/assets/logo-white.svg';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  isWhite?: boolean;
}

export default function Logo({
  width = 140,
  height = 32,
  className = '',
  isWhite = false,
}: LogoProps) {
  return (
    <Image
      src={isWhite ? UniclothLogoWhite : UniclothLogo}
      alt='Unicloth Logo'
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}

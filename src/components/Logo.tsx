import './Logo.css';

type LogoProps = {
  variant?: 'full' | 'mark' | 'png';
  theme?: 'light' | 'dark';
  className?: string;
};

export function Logo({ variant = 'full', theme = 'dark', className = '' }: LogoProps) {
  if (variant === 'png') {
    return (
      <img
        src="/logo/spydercorp.png"
        alt="spydercorp"
        className={`logo logo--png ${className}`.trim()}
        width={280}
        height={175}
      />
    );
  }

  const src =
    variant === 'mark'
      ? theme === 'dark'
        ? '/logo/spydercorp-mark-light.svg'
        : '/logo/spydercorp-mark.svg'
      : theme === 'dark'
        ? '/logo/spydercorp-light.svg'
        : '/logo/spydercorp.svg';

  return (
    <img
      src={src}
      alt="spydercorp"
      className={`logo logo--${variant} ${className}`.trim()}
      width={variant === 'mark' ? 40 : 200}
      height={variant === 'mark' ? 40 : 48}
    />
  );
}

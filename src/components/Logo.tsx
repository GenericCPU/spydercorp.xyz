import './Logo.css';

type LogoProps = {
  variant?: 'full' | 'compact';
  className?: string;
};

/** Uses the source PNG so the mark matches your file exactly. */
export function Logo({ variant = 'full', className = '' }: LogoProps) {
  return (
    <span className={`logo-frame logo-frame--${variant} ${className}`.trim()}>
      <img
        src="/logo/spydercorp.png"
        alt="spydercorp"
        className="logo-frame__img"
        width={variant === 'compact' ? 120 : 320}
        height={variant === 'compact' ? 40 : 100}
      />
    </span>
  );
}

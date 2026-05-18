import markSvg from '../assets/spydercorp-mark.svg?raw';
import './Logo.css';

type LogoProps = {
  variant?: 'full' | 'compact' | 'mark';
  className?: string;
};

const markHtml = markSvg.replace(/\saria-label="[^"]*"/, ' aria-hidden="true"');

function LogoMark({ variant, className }: { variant: 'compact' | 'mark'; className: string }) {
  return (
    <span
      className={`logo-mark logo-mark--${variant} ${className}`.trim()}
      role="img"
      aria-label="SpyderCorp"
      dangerouslySetInnerHTML={{ __html: markHtml }}
    />
  );
}

/** Full lockup (PNG). Header uses vector mark only — no wordmark. */
export function Logo({ variant = 'full', className = '' }: LogoProps) {
  if (variant === 'mark' || variant === 'compact') {
    return <LogoMark variant="mark" className={className} />;
  }

  return (
    <span className={`logo-frame logo-frame--full ${className}`.trim()}>
      <img
        src="/logo/spydercorp.svg"
        alt="SpyderCorp"
        className="logo-frame__img"
        width={320}
        height={100}
      />
    </span>
  );
}

import React from 'react';

interface VariantSwitcherProps {
  variantCount: number;
  activeVariant: number;
  onVariantChange: (variant: number) => void;
}

/**
 * A floating action button component for switching between design variants.
 * 
 * Usage:
 * ```tsx
 * const [variant, setVariant] = useState(1);
 * 
 * <VariantSwitcher 
 *   variantCount={3}
 *   activeVariant={variant}
 *   onVariantChange={setVariant}
 * />
 * 
 * // Then conditionally render based on variant:
 * {variant === 1 && <OptionOne />}
 * {variant === 2 && <OptionTwo />}
 * {variant === 3 && <OptionThree />}
 * ```
 */
export function VariantSwitcher({ variantCount, activeVariant, onVariantChange }: VariantSwitcherProps) {
  const variants = Array.from({ length: variantCount }, (_, i) => i + 1);

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex items-center gap-1 rounded-full bg-[#333333]/90 px-2 py-2 shadow-lg backdrop-blur-sm">
      {variants.map((num) => (
        <button
          key={num}
          onClick={() => onVariantChange(num)}
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all ${
            activeVariant === num
              ? 'bg-white text-[#333333]'
              : 'bg-transparent text-white/70 hover:bg-white/20 hover:text-white'
          }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
}

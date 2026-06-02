interface AiAssistantIconProps {
  size?: number;
}

export function AiAssistantIcon({ size = 28 }: AiAssistantIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
      <path d="M12 14c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4z" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

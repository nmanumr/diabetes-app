export function PillIcon({ className }: { className: string }) {
  return (
    <svg
      className={className} fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="4"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path
        fill="currentColor" fillOpacity=".5"
        d="M16 41.9a9.9 9.9 0 0 0 7-2.9l8-8-14-14-8 8a9.9 9.9 0 0 0 7 16.9Z"
      />
      <path
        fill="none"
        d="M32 6.1A9.9 9.9 0 0 0 25 9l-8 8 14 14 8-8a9.9 9.9 0 0 0-7-16.9Z"
      />
    </svg>
  );
}

export function DropIcon({ className }: { className: string }) {
  return (
    <svg
      className={className} fill="currentColor" stroke="currentColor" viewBox="0 0 48 48" strokeLinecap="round"
      strokeLinejoin="round" strokeWidth="4"
    >
      <path
        fillOpacity=".5"
        d="M13.6 22a12 12 0 1 0 20.792 0L23.998 6l-10.4 16h.002Z"
      />
    </svg>
  );
}

export function InsulinIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
      <path
        fill="currentColor" stroke="none" fillOpacity=".5"
        d="M33 23 20 36h-8v-8l13-13M34 6l8 8ZM38 10l-9 9ZM23 13l12 12ZM15 25l3 3ZM21 19l3 3ZM6 42l6-6Z"
      />
      <path
        stroke="currentColor" fill="none"
        d="M33 23 20 36h-8m0 0v-8l13-13M12 36l-6 6M34 6l8 8m-4-4-9 9m-6-6 12 12m-20 0 3 3m3-9 3 3"
      />
    </svg>
  );
}

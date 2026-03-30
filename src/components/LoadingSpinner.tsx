export function LoadingSpinner() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-[var(--tg-blue-light)] border-t-[var(--tg-blue)] animate-spin" />
    </div>
  )
}


export default function Footer() {
  return (
    <footer className="px-6 pb-12 pt-8">
      <div className="mx-auto max-w-3xl border-t border-line pt-8 text-center">
        <p className="font-display text-lg font-light italic text-ink-soft">
          Мова помічає більше, ніж око.
        </p>
        <p className="mt-3 text-xs text-ink-soft">
          «Шкала краси» — {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

const BG_HEX = "fbf7f2";

/** Затемнює hex-колір, щоб світлі тіри лишалися контрастними на білому (WCAG AA) */
export function darken(hex: string, factor: number): string {
  const n = parseInt(hex.slice(1), 16);
  const channel = (shift: number) =>
    Math.round(((n >> shift) & 0xff) * factor);
  return `rgb(${channel(16)}, ${channel(8)}, ${channel(0)})`;
}

/** Поканальна інтерполяція між двома hex-кольорами, t ∈ [0, 1] */
export function lerpHex(h1: string, h2: string, t: number): string {
  const a = parseInt(h1.slice(1), 16);
  const b = parseInt(h2.slice(1), 16);
  const channel = (shift: number) => {
    const ca = (a >> shift) & 0xff;
    const cb = (b >> shift) & 0xff;
    return Math.round(ca + (cb - ca) * t);
  };
  return `#${[16, 8, 0]
    .map((shift) => channel(shift).toString(16).padStart(2, "0"))
    .join("")}`;
}

/** Домішує колір до кремового фону сторінки; amount ∈ [0, 1] — частка кольору */
export function mixWithBg(hex: string, amount: number): string {
  const a = parseInt(hex.slice(1), 16);
  const b = parseInt(BG_HEX, 16);
  const channel = (shift: number) =>
    Math.round(
      ((a >> shift) & 0xff) * amount + ((b >> shift) & 0xff) * (1 - amount),
    );
  return `rgb(${channel(16)}, ${channel(8)}, ${channel(0)})`;
}

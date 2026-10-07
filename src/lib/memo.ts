/**
 * Süreç boyunca bir kez hesaplanan değer. Build sırasında yüzlerce sayfa aynı veriyi kullanır;
 * React `cache` yalnızca tek istek içinde geçerli olduğu için build'i yavaşlatıyordu.
 * Geliştirme modunda JSON değişiklikleri anında görünsün diye önbellek kullanılmaz.
 */
export function memo<T>(fn: () => T): () => T {
  let done = false;
  let value: T;
  return () => {
    if (process.env.NODE_ENV !== "production") return fn();
    if (!done) {
      value = fn();
      done = true;
    }
    return value;
  };
}

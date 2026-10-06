import { ImageResponse } from "next/og";

export const alt = "Motorcu Kıyafeti – Doğru ekipman, daha güvenli sürüş";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Varsayılan paylaşım görseli (tüm sayfalar). */
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(110deg,#0f1114 45%,#2a0f12)", color: "#fff" }}>
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
          Motorcu <span style={{ color: "#d4202a", marginLeft: 12 }}>Kıyafeti</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 800, lineHeight: 1.05, marginTop: 40 }}>
          <span>Doğru Ekipman</span>
          <span style={{ color: "#d4202a" }}>Daha Güvenli</span>
          <span>Daha Keyifli Sürüşler</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#c6c9ce", marginTop: 36 }}>Kask · Mont · Eldiven · Bot · İnterkom – kaynaklı karşılaştırma ve rehberler</div>
      </div>
    ),
    size,
  );
}

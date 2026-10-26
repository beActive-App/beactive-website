import QRCode from "qrcode";

/**
 * QR-Code als SVG-Markup für einen Store-Link – nur für absolute
 * http(s)-Adressen, sonst leer. Wird auf dem Server gebaut und auf dem
 * Desktop neben dem Store-Badge gezeigt, damit man die App direkt mit dem
 * Handy scannen kann.
 */
export async function qrSvg(url: string): Promise<string> {
  if (!/^https?:\/\/\S+$/i.test(url)) return "";
  try {
    return await QRCode.toString(url, {
      type: "svg",
      margin: 0,
      errorCorrectionLevel: "M",
      color: { dark: "#0b140f", light: "#ffffff" },
    });
  } catch {
    return "";
  }
}

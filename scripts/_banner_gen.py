"""
Generate wide-format hero banner PNGs for Tornaz (Path 2 - full-bleed photo
style). Each banner is 1920x700: a navy/gold background with the product
photo full-bleed on the right, and a smooth navy scrim fading across from the
left for headline legibility.

Brand colors:
  brand-950 #0a1120 (deep navy)   brand-900 #0E1C43 (mid navy)
  accent-400 #e9ac2f (gold)        accent-300 #f2cb66 (light gold)
"""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageOps

BASE = os.path.join(os.path.dirname(__file__), "..", "public", "media", "hero")
os.makedirs(BASE, exist_ok=True)
PROD = os.path.join(os.path.dirname(__file__), "..", "public", "media", "products")

NAVY_DEEP = (10, 17, 32, 255)
NAVY = (14, 28, 67, 255)
GOLD = (233, 172, 47, 255)


def h_gradient(w, h, c1, c2) -> Image.Image:
    base = Image.new("RGB", (w, 1))
    for x in range(w):
        t = x / (w - 1)
        base.putpixel((x, 0), tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3)))
    return base.resize((w, h))


def radial_glow(size, color, strength=95) -> Image.Image:
    s = 24
    grad = Image.new("L", (s, s), 0)
    ImageDraw.Draw(grad).ellipse((0, 0, s - 1, s - 1), fill=255)
    grad = grad.resize((size, size), Image.BICUBIC)
    grad = grad.filter(ImageFilter.GaussianBlur(size * 0.16))
    grad = grad.point(lambda v: int((v / 255) * strength))
    glow = Image.new("RGBA", (size, size), (color[0], color[1], color[2], 0))
    glow.putalpha(grad)
    return glow


def build_banner(name, prod_rel):
    W, H = 1920, 700
    bg = h_gradient(W, H, NAVY_DEEP, NAVY).convert("RGBA")

    # gold glow behind the product (right side)
    glow = radial_glow(1200, GOLD, 90)
    bw, bh = glow.size
    bg.alpha_composite(glow, (int(0.80 * W) - bw // 2, int(0.50 * H) - bh // 2))

    # product photo, full-bleed right
    src = Image.open(os.path.join(PROD, prod_rel, "1.png")).convert("RGB")
    area_w = int(W * 0.55)
    photo = ImageOps.fit(src, (area_w, H), method=Image.LANCZOS, centering=(0.6, 0.5)).convert("RGBA")
    bg.alpha_composite(photo, (W - area_w, 0))

    # navy scrim: strong on left, fades to transparent around 82%
    alpha_line = Image.new("L", (W, 1))
    for x in range(W):
        t = x / W
        if t < 0.45:
            a = 255
        elif t < 0.82:
            a = int(255 * (1 - (t - 0.45) / 0.37))
        else:
            a = 0
        alpha_line.putpixel((x, 0), a)
    alpha = alpha_line.resize((W, H))
    scrim = Image.new("RGBA", (W, H), NAVY_DEEP[:3])
    scrim.putalpha(alpha)
    bg.alpha_composite(scrim, (0, 0))

    # bottom vignette for depth
    bot = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(bot)
    for i in range(130):
        a = int(120 * (i / 130))
        d.line((0, H - 130 + i, W, H - 130 + i), fill=(0, 0, 0, a))
    bg.alpha_composite(bot, (0, 0))

    out = os.path.join(BASE, f"{name}.png")
    bg.convert("RGB").save(out, "PNG", optimize=True)
    print(f"saved {out} {W}x{H}")


if __name__ == "__main__":
    build_banner("hero-electrics", "bright-3-5kva-petrol-generator")
    build_banner("hero-phones", "tecno-spark-smartphone")
    build_banner("hero-appliances", "binatone-standing-fan")
    build_banner("hero-solar", "solar-home-starter-kit")
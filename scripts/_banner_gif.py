"""
Generate looping animated GIFs from the hero banner PNGs (Ken Burns slow zoom).
Frames are produced at a reduced width (960px) to keep file size reasonable.
"""
import os
from PIL import Image

HERO = os.path.join(os.path.dirname(__file__), "..", "public", "media", "hero")
OUT_W = 960          # gif width
OUT_H = 350          # keeps 1920x700 aspect (0.5)
FRAMES = 16          # frames per loop
DURATION = 120       # ms per frame -> ~1.9s loop


def make_gif(name):
    src = Image.open(os.path.join(HERO, f"{name}.png")).convert("RGB")
    W, H = src.size
    frames = []
    for i in range(FRAMES):
        p = i / (FRAMES - 1)
        # Ken Burns: from 1.00 -> 1.10 zoom, pan slightly right for variety
        zoom = 1.00 + 0.10 * p
        cw = int(W / zoom)
        ch = int(H / zoom)
        # center-based crop, with slight pan
        x0 = int((W - cw) * 0.5)
        y0 = int((H - ch) * 0.5)
        # add a little drift
        x0 -= int((W - cw) * 0.15 * p)  # pan toward subject side
        x0 = max(0, min(W - cw, x0))
        crop = src.crop((x0, y0, x0 + cw, y0 + ch))
        frame = crop.resize((OUT_W, OUT_H), Image.LANCZOS)
        # gentle brightness ease for premium feel
        if 0 < p < 1:
            b = 1.0 + 0.03 * ((p - 0.5) * 2)
            frame = frame.point(lambda v: max(0, min(255, int(v * b))))
        frames.append(frame)
    # save loop forever
    frames[0].save(
        os.path.join(HERO, f"{name}.gif"),
        save_all=True,
        append_images=frames[1:],
        duration=DURATION,
        loop=0,
        optimize=True,
    )
    sz = os.path.getsize(os.path.join(HERO, f"{name}.gif"))
    print(f"saved {name}.gif  {OUT_W}x{OUT_H}  {len(frames)} frames  {sz//1024} KB")


if __name__ == "__main__":
    for n in ("hero-electrics", "hero-phones", "hero-appliances", "hero-solar"):
        make_gif(n)
"""Run: python3 tools/team_crops.py <folder of originals>/ public/images/team  (needs Pillow)

Frame the team portraits for the Who we are cards.
Each card crops from the centre (object-fit: cover), so each file is cut to its card's shape with the
head at the same height (head centre 38% from the top) and given the site's shared treatment for
natural photos: a little less saturated and a little cooler."""
import sys
from PIL import Image, ImageOps, ImageEnhance
src, out = sys.argv[1], sys.argv[2]  # folder of originals (named as below), output folder
# name: (file, ratio w/h, head top y, chin y, face centre x)  - measured by eye on the originals
people = {
  'fernando-guzman': ('fernando.jpg', 4/5, 480, 1380, 860),
  'sam-cakici':      ('sam.png',      4/5,  85,  560, 400),
  'kabir-muzumdar':  ('kabir.png',    1/1, 175,  590, 470),
  'nicholas-khu':    ('nicholas.png', 3/4,  70,  300, 395),
  'dominick-chu':    ('dominick.jpg', 1/1, 140, 1000, 650),
  'alvin-zheng':     ('alvin.png',    5/4, 120,  410, 395),
}
for name, (f, ratio, top, chin, cx) in people.items():
    im = ImageOps.exif_transpose(Image.open(src + f)).convert('RGB')
    head = chin - top
    H = head / (0.32 if name == 'nicholas-khu' else 0.38)
    W = H * ratio
    if W > im.width: W, H = im.width, im.width / ratio
    if H > im.height: H, W = im.height, im.height * ratio
    cy = (top + chin) / 2
    y0 = min(max(0, cy - 0.38 * H), im.height - H)
    x0 = min(max(0, cx - W / 2), im.width - W)
    im = im.crop((round(x0), round(y0), round(x0 + W), round(y0 + H)))
    if im.height > 1500: im = im.resize((round(1500 * ratio), 1500), Image.LANCZOS)
    im = ImageEnhance.Color(im).enhance(0.88)               # a little less saturated
    r, g, b = im.split()                                    # a little cooler
    r = r.point(lambda v: round(v * 0.975)); b = b.point(lambda v: min(255, round(v * 1.025)))
    im = Image.merge('RGB', (r, g, b))
    im.save(f'{out}/{name}.jpg', quality=85, optimize=True, progressive=True)
    print(name, im.size)

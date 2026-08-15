from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent.parent
HEAD_CUTOFF = 320

ASSETS = {
    "lantern-yukata": {
        "source": "avatar-holiday-lantern-yukata-v1.png",
        "output": "avatar-holiday-lantern-yukata-layer-v1.png",
        "accessory": "none",
    },
    "cozy-christmas": {
        "source": "avatar-holiday-cozy-christmas-v1.png",
        "output": "avatar-holiday-cozy-christmas-layer-v1.png",
        "accessory": "santa-hat",
    },
    "santa-celebration": {
        "source": "avatar-holiday-santa-celebration-v1.png",
        "output": "avatar-holiday-santa-celebration-layer-v1.png",
        "accessory": "santa-hat",
    },
    "summer-matsuri": {
        "source": "avatar-holiday-summer-matsuri-v1.png",
        "output": "avatar-holiday-summer-matsuri-layer-v1.png",
        "accessory": "kitsune-mask",
    },
}


def is_hat_pixel(red: int, green: int, blue: int) -> bool:
    bright_fur = red > 168 and green > 158 and blue > 148
    holiday_red = red > 86 and green < 118 and blue < 122 and red > green * 1.32
    return bright_fur or holiday_red


def is_mask_pixel(x: int, y: int, red: int, green: int, blue: int) -> bool:
    if not (485 <= x <= 650 and 35 <= y <= 250):
        return False
    porcelain = red > 132 and green > 92 and blue > 70 and (red + green + blue) > 355
    painted_red = red > 92 and green < 115 and blue < 100 and red > green * 1.22
    dark_detail = x >= 520 and y <= 225 and max(red, green, blue) < 105
    return porcelain or painted_red or dark_detail


def make_layer(source: Path, output: Path, accessory: str) -> None:
    image = Image.open(source).convert("RGBA")
    pixels = image.load()
    for y in range(min(HEAD_CUTOFF, image.height)):
        for x in range(image.width):
            red, green, blue, alpha = pixels[x, y]
            if alpha == 0:
                continue
            keep = accessory == "santa-hat" and is_hat_pixel(red, green, blue)
            if accessory == "kitsune-mask":
                keep = is_mask_pixel(x, y, red, green, blue)
            if not keep:
                pixels[x, y] = (red, green, blue, 0)
    image.save(output, optimize=True)


def main() -> None:
    for name, spec in ASSETS.items():
        source = ROOT / spec["source"]
        output = ROOT / spec["output"]
        make_layer(source, output, spec["accessory"])
        print(f"Built {name}: {output.name}")


if __name__ == "__main__":
    main()

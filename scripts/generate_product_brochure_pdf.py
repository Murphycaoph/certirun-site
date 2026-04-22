from pathlib import Path
from textwrap import wrap

from reportlab.graphics import renderPDF
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = ROOT / "output" / "pdf"
TMP_DIR = ROOT / "tmp" / "pdfs"
REF_DIR = ROOT / "tmp" / "ppt_ref"
IMAGES_DIR = ROOT / "public" / "images"
BRANDS_DIR = IMAGES_DIR / "brands"
ASSEMBLIES_DIR = IMAGES_DIR / "assemblies"
HERO_COVER = IMAGES_DIR / "hero-01-highway-transport.jpg"
HERO_CLOSING = IMAGES_DIR / "hero-03-container-port.jpg"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
TMP_DIR.mkdir(parents=True, exist_ok=True)

PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN = 42

NAVY = colors.HexColor("#0f2147")
NAVY_2 = colors.HexColor("#17346b")
BLUE = colors.HexColor("#3f6bff")
BLUE_SOFT = colors.HexColor("#edf3ff")
INK = colors.HexColor("#162338")
MUTED = colors.HexColor("#5f6f86")
LINE = colors.HexColor("#dfe7f5")
WHITE = colors.white

SITE_URL = "https://certispares.com/product/"
EMAIL = "murphy@certispares.com"

BRANDS = [
    ("Foton", "foton.png"),
    ("JAC", "jac.png"),
    ("Dongfeng", "dongfeng.png"),
    ("JMC", "jmc.png"),
    ("Sinotruk", "sinotruk.png"),
    ("DFSK", "dfsk.png"),
    ("Wuling", "wuling.png"),
    ("SHACMAN", "shacman.png"),
    ("FAW", "faw.png"),
]

CATEGORIES = [
    {
        "title": "Engine Systems",
        "subtitle": "Platform-focused support for maintenance, repair, and replacement needs.",
        "image": ASSEMBLIES_DIR / "assembly-engine.png",
        "brands": "Foton, JAC, Dongfeng, JMC, Sinotruk, DFSK, Wuling, SHACMAN, FAW",
        "support_groups": [
            ("Maintenance Kit", ["Oil filter", "Fuel filter", "Air filter", "Drive belt", "Tensioner"]),
            ("Repair Kit", ["Oil seals", "Gaskets", "O-rings", "Washer sets", "Seal ring kits"]),
            ("Replacement Parts", ["Water pump", "Thermostat", "Sensors", "Injectors", "Hoses"]),
        ],
    },
    {
        "title": "Gearbox Systems",
        "subtitle": "Support scope for transmission repair, clutch-side matching, and overhaul parts.",
        "image": ASSEMBLIES_DIR / "assembly-gearbox.png",
        "brands": "Foton, JAC, Dongfeng, JMC, Sinotruk, DFSK, Wuling, SHACMAN, FAW",
        "support_groups": [
            ("Gearbox Repair Kit", ["Bearings", "Oil seals", "Gaskets", "Synchronizer parts", "Needle bearings"]),
            ("Clutch & Release", ["Clutch disc", "Pressure plate", "Release bearing", "Pilot bearing", "Clutch fork"]),
            ("Shift & Housing Parts", ["Shift fork", "Selector shaft", "Housing seals", "Covers", "Fastener kits"]),
        ],
    },
    {
        "title": "Axle Systems",
        "subtitle": "Wheel-end, differential, and axle-side service support for commercial vehicle platforms.",
        "image": ASSEMBLIES_DIR / "assembly-axle.png",
        "brands": "Foton, JAC, Dongfeng, JMC, Sinotruk, SHACMAN, FAW",
        "support_groups": [
            ("Axle Repair Kit", ["Differential bearings", "Pinion seals", "Shim sets", "Gaskets", "Repair washers"]),
            ("Hub & Bearing Parts", ["Hub bearings", "Wheel seals", "Bearing nuts", "Lock washers", "Hub caps"]),
            ("Differential Parts", ["Crown wheel", "Pinion gear", "Spider gears", "Cross shaft", "Thrust washers"]),
        ],
    },
    {
        "title": "Brake Systems",
        "subtitle": "From friction parts to actuation and drum-side hardware for heavy-use applications.",
        "image": ASSEMBLIES_DIR / "assembly-brake.png",
        "brands": "Foton, JAC, Dongfeng, JMC, Sinotruk, DFSK, Wuling, SHACMAN, FAW",
        "support_groups": [
            ("Brake Wear Parts", ["Brake shoes", "Brake linings", "Brake pads", "Return springs", "Adjuster kits"]),
            ("Brake Chamber & Actuation", ["Brake chamber", "Slack adjuster", "Push rod", "Clevis", "Repair diaphragm"]),
            ("Brake Drum & Hardware", ["Brake drum", "Wheel studs", "Brake hardware", "Anchor pins", "Mounting kits"]),
        ],
    },
    {
        "title": "Suspension Systems",
        "subtitle": "Core under-chassis coverage for load support, articulation, and ride-control maintenance.",
        "image": ASSEMBLIES_DIR / "assembly-suspension.png",
        "brands": "Foton, JAC, Dongfeng, JMC, Sinotruk, SHACMAN, FAW",
        "support_groups": [
            ("Leaf Spring Parts", ["Leaf spring", "Center bolt", "Spring clips", "Spring pins", "Mounting plates"]),
            ("Shackle & Bushing Kit", ["Shackle kits", "Bushings", "Pins", "Rubber sleeves", "Grease fittings"]),
            ("Stability Components", ["U-bolts", "Torque rod bushings", "Stabilizer bushes", "Mount rubbers", "Hardware kits"]),
        ],
    },
]


def fit_text(c: canvas.Canvas, text: str, font_name: str, max_size: int, min_size: int, width: float) -> int:
    size = max_size
    while size >= min_size:
        if c.stringWidth(text, font_name, size) <= width:
            return size
        size -= 1
    return min_size


def draw_wrapped_text(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    font_name: str,
    font_size: int,
    color: colors.Color,
    leading: float | None = None,
    max_lines: int | None = None,
):
    leading = leading or font_size * 1.45
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        if c.stringWidth(candidate, font_name, font_size) <= width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    if max_lines is not None and len(lines) > max_lines:
        lines = lines[:max_lines]
        if lines:
            trimmed = lines[-1]
            while trimmed and c.stringWidth(f"{trimmed}...", font_name, font_size) > width:
                trimmed = trimmed[:-1]
            lines[-1] = f"{trimmed.rstrip()}..."

    c.setFont(font_name, font_size)
    c.setFillColor(color)
    cursor = y
    for line in lines:
        c.drawString(x, cursor, line)
        cursor -= leading
    return cursor


def draw_image(c: canvas.Canvas, path: Path, x: float, y: float, width: float, height: float, mode: str = "cover"):
    if not path.exists():
        return
    image = ImageReader(str(path))
    iw, ih = image.getSize()
    if iw == 0 or ih == 0:
        return
    image_ratio = iw / ih
    box_ratio = width / height
    if mode == "cover":
        if image_ratio > box_ratio:
            draw_height = height
            draw_width = draw_height * image_ratio
            draw_x = x - (draw_width - width) / 2
            draw_y = y
        else:
            draw_width = width
            draw_height = draw_width / image_ratio
            draw_x = x
            draw_y = y - (draw_height - height) / 2
    else:
        if image_ratio > box_ratio:
            draw_width = width
            draw_height = draw_width / image_ratio
            draw_x = x
            draw_y = y + (height - draw_height) / 2
        else:
            draw_height = height
            draw_width = draw_height * image_ratio
            draw_x = x + (width - draw_width) / 2
            draw_y = y
    c.drawImage(image, draw_x, draw_y, draw_width, draw_height, mask="auto")


def draw_edge_fade(c: canvas.Canvas, x: float, y: float, width: float, height: float, base_color: colors.Color):
    steps = 8
    max_alpha = 0.26
    for i in range(steps):
        ratio = (i + 1) / steps
        alpha = max_alpha * ratio
        inset = i * 4
        c.setFillColor(colors.Color(base_color.red, base_color.green, base_color.blue, alpha=alpha))
        c.rect(x + inset, y + height - 5, width - inset * 2, 5, fill=1, stroke=0)
        c.rect(x + inset, y, width - inset * 2, 5, fill=1, stroke=0)
        c.rect(x, y + inset, 5, height - inset * 2, fill=1, stroke=0)
        c.rect(x + width - 5, y + inset, 5, height - inset * 2, fill=1, stroke=0)


def draw_footer(c: canvas.Canvas, page_label: str):
    c.setStrokeColor(LINE)
    c.line(MARGIN, 28, PAGE_WIDTH - MARGIN, 28)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 9)
    c.drawString(MARGIN, 16, "CertiSpares | Commercial Vehicle Aftermarket Product Overview")
    c.drawRightString(PAGE_WIDTH - MARGIN, 16, page_label)


def draw_cover(c: canvas.Canvas):
    bg = HERO_COVER
    draw_image(c, bg, 0, 0, PAGE_WIDTH, PAGE_HEIGHT, mode="cover")
    c.setFillColor(colors.Color(15 / 255, 33 / 255, 71 / 255, alpha=0.8))
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    c.setFillColor(colors.Color(23 / 255, 52 / 255, 107 / 255, alpha=0.35))
    c.roundRect(MARGIN, 96, PAGE_WIDTH - MARGIN * 2, PAGE_HEIGHT - 172, 24, fill=1, stroke=0)

    logo = IMAGES_DIR / "logo.webp"
    if logo.exists():
        c.setFillColor(colors.Color(1, 1, 1, alpha=0.95))
        c.roundRect(MARGIN - 8, PAGE_HEIGHT - 122, 134, 66, 14, fill=1, stroke=0)
        draw_image(c, logo, MARGIN, PAGE_HEIGHT - 118, 118, 58, mode="contain")

    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(MARGIN, PAGE_HEIGHT - 146, "CERTISPARES PRODUCT OVERVIEW")
    title_size = fit_text(
        c,
        "Commercial Vehicle Aftermarket Product Brochure",
        "Helvetica-Bold",
        30,
        22,
        PAGE_WIDTH - 2 * MARGIN - 40,
    )
    c.setFont("Helvetica-Bold", title_size)
    c.drawString(MARGIN, PAGE_HEIGHT - 205, "Commercial Vehicle")
    c.drawString(MARGIN, PAGE_HEIGHT - 242, "Aftermarket Product Brochure")

    draw_wrapped_text(
        c,
        "Built for cold outreach and first-touch customer introductions. This brochure helps buyers understand the brands we support, the major assemblies we cover, and the matching parts scope before they move into detailed website review or RFQ discussion.",
        MARGIN,
        PAGE_HEIGHT - 286,
        300,
        "Helvetica",
        11,
        colors.Color(1, 1, 1, alpha=0.9),
        leading=16,
    )

    bullets = [
        "Supported commercial vehicle brands",
        "Core assembly-level product coverage",
        "Representative parts support by category",
        "Website handoff for deeper platform browsing",
    ]
    bullet_y = PAGE_HEIGHT - 392
    for item in bullets:
        c.setFillColor(BLUE)
        c.circle(MARGIN + 5, bullet_y + 4, 3, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica", 11)
        c.drawString(MARGIN + 16, bullet_y, item)
        bullet_y -= 20

    c.setFillColor(colors.Color(1, 1, 1, alpha=0.14))
    c.roundRect(PAGE_WIDTH - 244, 78, 202, 148, 18, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(PAGE_WIDTH - 220, 196, "Website")
    c.setFont("Helvetica", 11)
    draw_wrapped_text(c, SITE_URL, PAGE_WIDTH - 220, 172, 112, "Helvetica", 11, colors.Color(1, 1, 1, alpha=0.88))
    c.drawString(PAGE_WIDTH - 220, 126, EMAIL)

    qr_code = qr.QrCodeWidget(SITE_URL)
    bounds = qr_code.getBounds()
    qr_w = bounds[2] - bounds[0]
    qr_h = bounds[3] - bounds[1]
    size = 84
    d = Drawing(size, size)
    group = qr_code.draw()
    group.scale(size / qr_w, size / qr_h)
    d.add(group)
    render_x = PAGE_WIDTH - 126
    render_y = 96

    renderPDF.draw(d, c, render_x, render_y)
    draw_footer(c, "Cover")
    c.showPage()


def draw_brand_overview(c: canvas.Canvas):
    c.setFillColor(BLUE_SOFT)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.rect(0, PAGE_HEIGHT - 96, PAGE_WIDTH, 96, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(MARGIN, PAGE_HEIGHT - 50, "Supported Brands")
    c.setFont("Helvetica", 11)
    c.drawString(MARGIN, PAGE_HEIGHT - 70, "Representative platform coverage currently mapped across our catalog.")

    draw_wrapped_text(
        c,
        "The purpose of this brochure is not to list every SKU. It gives buyers a fast, first-pass view of the vehicle brands we support and the core aftermarket assemblies we can supply against those platforms.",
        MARGIN,
        PAGE_HEIGHT - 126,
        PAGE_WIDTH - 2 * MARGIN,
        "Helvetica",
        11,
        MUTED,
        leading=16,
    )

    cols = 3
    gap = 18
    card_width = (PAGE_WIDTH - 2 * MARGIN - gap * 2) / cols
    card_height = 92
    start_y = PAGE_HEIGHT - 254

    for index, (brand, file_name) in enumerate(BRANDS):
        col = index % cols
        row = index // cols
        x = MARGIN + col * (card_width + gap)
        y = start_y - row * (card_height + 18)
        c.setFillColor(WHITE)
        c.roundRect(x, y, card_width, card_height, 18, fill=1, stroke=0)
        c.setStrokeColor(LINE)
        c.roundRect(x, y, card_width, card_height, 18, fill=0, stroke=1)
        draw_image(c, BRANDS_DIR / file_name, x + 22, y + 28, card_width - 44, 34, mode="contain")
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 12)
        c.drawCentredString(x + card_width / 2, y + 14, brand)

    info_y = 150
    c.setFillColor(WHITE)
    c.roundRect(MARGIN, info_y, PAGE_WIDTH - 2 * MARGIN, 142, 20, fill=1, stroke=0)
    c.setStrokeColor(LINE)
    c.roundRect(MARGIN, info_y, PAGE_WIDTH - 2 * MARGIN, 142, 20, fill=0, stroke=1)

    blocks = [
        ("Core Assemblies", "Engine, gearbox, axle, brake, and suspension systems."),
        ("Buyer Intent", "Useful for first-touch introductions, email attachments, and product direction setting."),
        ("Website Handoff", "Full platform browsing and inquiry can continue on certispares.com/product/."),
    ]
    block_width = (PAGE_WIDTH - 2 * MARGIN - 36) / 3
    for idx, (title, body) in enumerate(blocks):
        x = MARGIN + 18 + idx * block_width
        c.setFillColor(BLUE)
        c.roundRect(x, info_y + 88, 54, 22, 10, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 10)
        c.drawCentredString(x + 27, info_y + 95, f"0{idx + 1}")
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(x, info_y + 66, title)
        draw_wrapped_text(c, body, x, info_y + 46, block_width - 18, "Helvetica", 10, MUTED, leading=14)

    draw_footer(c, "01")
    c.showPage()


def draw_category_page(c: canvas.Canvas, category: dict, page_number: int):
    c.setFillColor(WHITE)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.rect(0, PAGE_HEIGHT - 86, PAGE_WIDTH, 86, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(MARGIN, PAGE_HEIGHT - 44, category["title"])
    c.setFont("Helvetica", 11)
    c.drawString(MARGIN, PAGE_HEIGHT - 64, "Representative product support overview")

    left_x = MARGIN
    right_x = PAGE_WIDTH - MARGIN - 220
    top_y = PAGE_HEIGHT - 128

    c.setFillColor(BLUE_SOFT)
    c.roundRect(right_x, top_y - 202, 220, 202, 22, fill=1, stroke=0)
    c.setStrokeColor(LINE)
    c.roundRect(right_x, top_y - 202, 220, 202, 22, fill=0, stroke=1)
    draw_image(c, category["image"], right_x + 10, top_y - 185, 200, 178, mode="contain")
    draw_edge_fade(c, right_x + 10, top_y - 185, 200, 178, BLUE_SOFT)

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(left_x, top_y, category["title"])
    draw_wrapped_text(c, category["subtitle"], left_x, top_y - 24, 290, "Helvetica", 11, MUTED, leading=16)

    c.setFillColor(BLUE)
    c.roundRect(left_x, top_y - 82, 124, 24, 10, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 10)
    c.drawCentredString(left_x + 62, top_y - 74, "Parts Support Scope")

    section_y = top_y - 120
    card_gap = 14
    card_height = 116
    for group in category["support_groups"]:
        c.setFillColor(WHITE)
        c.roundRect(left_x, section_y - card_height, PAGE_WIDTH - 2 * MARGIN, card_height, 20, fill=1, stroke=0)
        c.setStrokeColor(LINE)
        c.roundRect(left_x, section_y - card_height, PAGE_WIDTH - 2 * MARGIN, card_height, 20, fill=0, stroke=1)
        c.setFillColor(NAVY_2)
        c.roundRect(left_x + 18, section_y - 36, 136, 24, 10, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 10)
        c.drawCentredString(left_x + 86, section_y - 28, group[0])

        bullets = group[1]
        bullet_x = left_x + 24
        bullet_y = section_y - 58
        row_gap = 22
        for bullet_index, bullet in enumerate(bullets):
            bx = bullet_x + (bullet_index % 2) * 240
            by = bullet_y - (bullet_index // 2) * row_gap
            c.setFillColor(BLUE)
            c.circle(bx, by + 3, 2.6, fill=1, stroke=0)
            c.setFillColor(INK)
            c.setFont("Helvetica", 11)
            c.drawString(bx + 10, by, bullet)
        section_y -= card_height + card_gap

    c.setFillColor(BLUE_SOFT)
    c.roundRect(MARGIN, 82, PAGE_WIDTH - 2 * MARGIN, 74, 18, fill=1, stroke=0)
    c.setStrokeColor(LINE)
    c.roundRect(MARGIN, 82, PAGE_WIDTH - 2 * MARGIN, 74, 18, fill=0, stroke=1)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(MARGIN + 18, 132, "Commonly Supported Brands")
    draw_wrapped_text(c, category["brands"], MARGIN + 18, 114, PAGE_WIDTH - 2 * MARGIN - 36, "Helvetica", 10, MUTED)
    draw_wrapped_text(
        c,
        "For exact application matching, buyers can move from this overview brochure to the website catalog or send OEM numbers, dimensions, and photos for checking.",
        MARGIN + 18,
        98,
        PAGE_WIDTH - 2 * MARGIN - 36,
        "Helvetica",
        9,
        MUTED,
        leading=13,
    )

    draw_footer(c, f"{page_number:02d}")
    c.showPage()


def draw_closing_page(c: canvas.Canvas):
    c.setFillColor(BLUE_SOFT)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)

    left_width = PAGE_WIDTH * 0.46
    c.setFillColor(NAVY)
    c.rect(0, 0, left_width, PAGE_HEIGHT, fill=1, stroke=0)

    factory = HERO_CLOSING
    draw_image(c, factory, left_width - 24, 74, PAGE_WIDTH - left_width + 24, PAGE_HEIGHT - 148, mode="cover")
    c.setFillColor(colors.Color(1, 1, 1, alpha=0.16))
    c.roundRect(MARGIN, PAGE_HEIGHT - 172, left_width - MARGIN * 1.4, 108, 18, fill=1, stroke=0)

    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(MARGIN, PAGE_HEIGHT - 112, "Next Step")
    draw_wrapped_text(
        c,
        "Use this brochure as the first-touch overview, then guide buyers to the website for deeper platform browsing and inquiry.",
        MARGIN,
        PAGE_HEIGHT - 138,
        left_width - MARGIN * 1.7,
        "Helvetica",
        11,
        colors.Color(1, 1, 1, alpha=0.92),
        leading=16,
    )

    panel_x = left_width + 26
    panel_y = PAGE_HEIGHT - 180
    panel_w = PAGE_WIDTH - panel_x - MARGIN

    c.setFillColor(WHITE)
    c.roundRect(panel_x, 96, panel_w, PAGE_HEIGHT - 182, 24, fill=1, stroke=0)
    c.setStrokeColor(LINE)
    c.roundRect(panel_x, 96, panel_w, PAGE_HEIGHT - 182, 24, fill=0, stroke=1)

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(panel_x + 22, panel_y, "How Buyers Can Use It")

    steps = [
        ("01", "Scan the supported brand range and core assembly coverage."),
        ("02", "Open the website to review more platform-specific product details."),
        ("03", "Send RFQ with OEM numbers, part names, quantities, or photos."),
    ]
    step_y = panel_y - 42
    for code, text in steps:
        c.setFillColor(BLUE)
        c.roundRect(panel_x + 22, step_y - 8, 38, 22, 9, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 10)
        c.drawCentredString(panel_x + 41, step_y - 1, code)
        draw_wrapped_text(c, text, panel_x + 76, step_y + 2, panel_w - 98, "Helvetica", 11, MUTED, leading=15)
        step_y -= 62

    c.setFillColor(BLUE_SOFT)
    c.roundRect(panel_x + 22, 158, panel_w - 44, 118, 18, fill=1, stroke=0)
    c.setStrokeColor(LINE)
    c.roundRect(panel_x + 22, 158, panel_w - 44, 118, 18, fill=0, stroke=1)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(panel_x + 40, 246, "Contact & Website")
    c.setFont("Helvetica", 11)
    c.drawString(panel_x + 40, 220, SITE_URL)
    c.drawString(panel_x + 40, 198, EMAIL)
    c.drawString(panel_x + 40, 176, "CertiSpares | Beijing-Hebei industrial belt supply network")

    qr_code = qr.QrCodeWidget(SITE_URL)
    bounds = qr_code.getBounds()
    qr_w = bounds[2] - bounds[0]
    qr_h = bounds[3] - bounds[1]
    size = 72
    drawing = Drawing(size, size)
    group = qr_code.draw()
    group.scale(size / qr_w, size / qr_h)
    drawing.add(group)

    renderPDF.draw(drawing, c, panel_x + panel_w - 120, 176)

    draw_footer(c, "Closing")
    c.showPage()


def main():
    output = OUTPUT_DIR / "CertiSpares-Product-Overview-A4.pdf"
    c = canvas.Canvas(str(output), pagesize=A4)
    c.setTitle("CertiSpares Product Overview A4")
    c.setAuthor("OpenAI Codex")
    c.setSubject("Commercial vehicle aftermarket product brochure")

    draw_cover(c)
    draw_brand_overview(c)
    for idx, category in enumerate(CATEGORIES, start=2):
        draw_category_page(c, category, idx)
    draw_closing_page(c)

    c.save()
    print(output)


if __name__ == "__main__":
    main()

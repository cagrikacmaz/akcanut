"""Writes a lighter copy of the brand guide for the website download.

Same pages, text and vector content; only the embedded images are recompressed and
downsampled to print resolution. The original stays in ./AkcanutAssets (not in git).

Requires Python 3 and PyMuPDF:  pip install pymupdf
Run:  python scripts/optimize-pdf.py
"""

from pathlib import Path

import fitz  # PyMuPDF

SOURCE = Path("AkcanutAssets/AKCANUT_Brand_Profile_Identity_Guide.pdf")
TARGET = Path("public/downloads/akcanut-brand-profile.pdf")


def main() -> None:
    TARGET.parent.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(SOURCE)
    # Images above 250 dpi are brought down to 220 dpi and stored as JPEG (quality 85).
    doc.rewrite_images(dpi_threshold=250, dpi_target=220, quality=85)
    doc.save(TARGET, garbage=4, deflate=True, clean=True)
    before = SOURCE.stat().st_size / 1024 / 1024
    after = TARGET.stat().st_size / 1024 / 1024
    print(f"{TARGET}: {before:.1f} MB -> {after:.2f} MB, {doc.page_count} pages")


if __name__ == "__main__":
    main()

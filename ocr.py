import os
from PIL import Image
import pytesseract
import io
import sys

script_dir = os.path.dirname(__file__)
config = "-c tessedit_char_whitelist=0123456789.abcdefghO-QKNBR+#x\ "


def getPgnFromPic(id):
    img_path = os.path.join(script_dir, 'pics/' + str(id) + '.png')
    img = Image.open(img_path)
    pgn = pytesseract.image_to_string(img, config=config).replace("\n", " ")
    return pgn


def main():
    id = sys.argv[1]
    pgn = getPgnFromPic(id)
    sys.stdout.write(pgn)


main()

import numpy as np
import string
from PIL import Image, ImageFont, ImageDraw
import chess.pgn
import os
import json
import textwrap

script_dir = os.path.dirname(__file__)
rel_path = "pgns/Akobian.pgn"
abs_path = os.path.join(script_dir, rel_path)

pgns = open(abs_path)


def MakeImg(t, fn):
    '''
    Generate an image of text
    t:      The text to display in the image
    fn:     The file name
    '''

    wrapper = textwrap.TextWrapper(width=50)
    word_list = wrapper.wrap(text=t)
    wrapped = ''
    for ii in word_list[:-1]:
        wrapped = wrapped + ii + '\n\n'
    wrapped += word_list[-1]

    img = Image.new('RGB', (600, 2000), color=(255, 255, 255))

    fnt = ImageFont.truetype('/Library/Fonts/Arial.ttf', 20)
    d = ImageDraw.Draw(img)
    d.text((5, 5), wrapped, font=fnt, fill=(0, 0, 0))

    img.save(fn)


def createGameImages():
    id = 1
    data = {}

    while True:
        try:
            idStr = str(id)

            current_game = chess.pgn.read_game(pgns)
            pgn = str(current_game.mainline_moves())
            MakeImg(pgn, 'images/' + idStr + '.png')
            data[idStr] = pgn
            id += 1
            print('Making image with id ' + idStr)
        except:
            break

    with open('data.json', 'w') as outfile:
        json.dump(data, outfile)


createGameImages()

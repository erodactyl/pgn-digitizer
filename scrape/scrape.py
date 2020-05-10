import requests
from links import links
import os
import zipfile

# Scrape a total of 389505 games in pgn files from pgnmentor.com

script_dir = os.path.dirname(__file__)

base_link = 'https://www.pgnmentor.com/players/'
base_link_length = len(base_link)


def download_url(url, chunk_size=128):
    name = url[base_link_length:-4]
    abs_zip_path = os.path.join(script_dir, name + '.zip')
    r = requests.get(url, stream=True)
    with open(abs_zip_path, 'wb') as fd:
        for chunk in r.iter_content(chunk_size=chunk_size):
            fd.write(chunk)
    pgn_dir = os.path.join(script_dir, 'pgns')
    with zipfile.ZipFile(abs_zip_path, 'r') as zip_ref:
        zip_ref.extractall(pgn_dir)
    os.remove(abs_zip_path)


for link in links:
    download_url(link)

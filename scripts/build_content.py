"""Turn a WordPress export (pages.json, posts.json, canon.json, manifest.json)
into the JSON the site reads. Run with: python3 -I scripts/build_content.py <export_dir>"""
import json, re, sys, html, os
from html.parser import HTMLParser

src = sys.argv[1]
out = os.path.join(os.path.dirname(__file__), '..', 'src', 'content', 'generated')
os.makedirs(out, exist_ok=True)
posts = json.load(open(f'{src}/posts.json'))
canon = json.load(open(f'{src}/canon.json'))
man = json.load(open(f'{src}/manifest.json'))
feat = json.load(open(f'{src}/featured.json')) if os.path.exists(f'{src}/featured.json') else {}

orig2name = {v['orig']: k for k, v in man.items()}
base2name = {}
for base, info in canon.items():
    fn = info['url'].rsplit('/', 1)[1]
    if fn in orig2name: base2name[base] = orig2name[fn]

def name_for(url):
    fn = url.rsplit('/', 1)[1]
    m = re.match(r'(.+?)-(\d+)x(\d+)(\.\w+)$', fn)
    base = (m.group(1) + m.group(4)) if m else fn
    return base2name.get(base) or base2name.get(fn)

class Blocks(HTMLParser):
    def __init__(s):
        super().__init__(); s.blocks = []; s.cur = None; s.skip = 0
    def handle_starttag(s, t, a):
        if t in ('script', 'style', 'figcaption'): s.skip += 1
        if t in ('p', 'h1', 'h2', 'h3', 'h4', 'li', 'blockquote'):
            s.flush(); s.cur = {'type': 'h' if t[0] == 'h' and t != 'h1' or t == 'h1' else ('li' if t == 'li' else 'p'), 'text': ''}
        if t == 'br' and s.cur: s.cur['text'] += '\n'
    def handle_endtag(s, t):
        if t in ('script', 'style', 'figcaption'): s.skip -= 1
        if t in ('p', 'h1', 'h2', 'h3', 'h4', 'li', 'blockquote'): s.flush()
    def handle_data(s, d):
        if s.skip: return
        if s.cur is None: s.cur = {'type': 'p', 'text': ''}
        s.cur['text'] += d
    def flush(s):
        if s.cur:
            t = re.sub(r'[ \t ]+', ' ', html.unescape(s.cur['text'])).strip()
            t = EMOJI.sub('', t).strip()
            if t and not re.fullmatch(r'[\W_]+', t) and t.lower() not in JUNK: s.blocks.append({'type': s.cur['type'], 'text': t})
        s.cur = None

EMOJI = re.compile('[\U0001F000-\U0001FAFF\u2600-\u27BF\u2B00-\u2BFF\uFE0F\u200D\u25B6\u23E9-\u23FA]')
JUNK = {'powered by embedpress', 'click here', 'click below to view the results.', 'you can view the results through the link below:'}
CATS = {1: 'News', 9: 'Blog', 13: 'Results'}
outp = []
for p in posts:
    c = p['content']['rendered']
    b = Blocks(); b.feed(c); b.flush()
    imgs = []
    for u in re.findall(r'https://greenacres\.ac\.tz/wp-content/uploads/[^"\'\s,)]+\.(?:jpe?g|png|webp)', c):
        n = name_for(u)
        if n and n not in imgs: imgs.append(n)
    vids = sorted(set(re.findall(r'uploads/[^"\'\s]+\.mp4', c)))
    cover = name_for(feat[str(p['featured_media'])]) if str(p['featured_media']) in feat else (imgs[0] if imgs else None)
    cats = [CATS.get(x, 'News') for x in p['categories']]
    ex = html.unescape(re.sub('<[^>]+>', '', p['excerpt']['rendered'])).strip()
    ex = re.sub(r'\s*\[&hellip;\]|\s*\[…\]', '…', ex)
    outp.append({
        'slug': p['slug'], 'title': html.unescape(p['title']['rendered']).strip(), 'date': p['date'][:10],
        'category': 'Results' if 'Results' in cats else cats[0], 'excerpt': ex[:260], 'cover': cover,
        'images': imgs, 'hasVideo': bool(vids), 'blocks': b.blocks,
    })
json.dump(outp, open(f'{out}/posts.json', 'w'), ensure_ascii=False, indent=1)

# media library: name -> w,h,where
media = {k: {'w': v['w'], 'h': v['h'], 'from': v['from']} for k, v in man.items()}
json.dump(media, open(f'{out}/media.json', 'w'), indent=0)
print(len(outp), 'posts', len(media), 'images')

# ---- gallery albums, in page order: a heading starts an album, images and videos fill it
pages = json.load(open(f'{src}/pages.json'))
gal = next(p for p in pages if p['slug'] == 'gallery')['content']['rendered']
tokens = re.findall(r'<h[2-4][^>]*>(.*?)</h[2-4]>|(https://greenacres\.ac\.tz/wp-content/uploads/[^"\'\s,)]+\.(?:jpe?g|png|webp|mp4))|<p(?:\s[^>]*)?>(.*?)</p>', gal, flags=re.S)
albums = []; cur = None
SKIP = {'Gallery', 'Snapshots of Success', 'A glimpse into the heart of learning, growth, and community'}
VID = {'Future-leaders': 'crdb-visit', 'Sunday-vibes': 'sunday-service', 'Spreading-love': 'mwananyamala-visit', 'A-beautiful-chapter': 'graduation-form6'}
for h, u, ptxt in tokens:
    if h:
        t = html.unescape(re.sub('<[^>]+>', '', h)).strip()
        if not t or t in SKIP: continue
        cur = {'title': t, 'text': '', 'images': [], 'video': None}; albums.append(cur)
    elif u and cur is not None:
        if u.endswith('.mp4'):
            fn = u.rsplit('/', 1)[1]
            cur['video'] = next((v for k, v in VID.items() if fn.startswith(k)), None)
        else:
            n = name_for(u)
            if n and n not in cur['images']: cur['images'].append(n)
    elif ptxt and cur is not None and len(cur['text']) < 600:
        t = html.unescape(re.sub('<[^>]+>', '', ptxt)).strip()
        if t: cur['text'] = (cur['text'] + ' ' + t).strip()
albums = [a for a in albums if a['images'] or a['video']]
json.dump(albums, open(f'{out}/albums.json', 'w'), ensure_ascii=False, indent=1)
for a in albums: print('album', len(a['images']), a['video'], a['title'][:60])

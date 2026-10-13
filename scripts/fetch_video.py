import urllib.request
import json
import re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
}

# Test URLs
urls = [
    'https://www.pexels.com/video/close-up-of-rasgulla-on-a-serving-tray-free-stock-video-footage-royalty-free-4k-hd-video-clip-9169623/',
    'https://www.pexels.com/video/video-of-different-sweet-foods-free-stock-video-footage-royalty-free-4k-hd-video-clip-9169640/'
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            print(f"Fetched {url}, len: {len(html)}")
            # look for mp4 links
            mp4s = re.findall(r'https://[^\s"\'<>]+\.mp4[^\s"\'<>]*', html)
            print("Found mp4s:", mp4s[:5])
    except Exception as e:
        print("Error fetching", url, e)

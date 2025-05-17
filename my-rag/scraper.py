import requests
from bs4 import BeautifulSoup

def scrape_and_collect(url, chunk_size=3):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"❌ Failed to retrieve {url}: {response.status_code}")
        return []

    soup = BeautifulSoup(response.content, "html.parser")
    paragraphs = [p.get_text(strip=True) for p in soup.find_all("p") if p.get_text(strip=True)]

    # Group every `chunk_size` paragraphs into a new document
    chunks = ["\n".join(paragraphs[i:i + chunk_size]) for i in range(0, len(paragraphs), chunk_size)]
    print(f"✅ Scraped {len(chunks)} chunks from {url}")
    return chunks

def scrape_multiple_and_save(urls, output_file="documents1.txt", chunk_size=3):
    all_chunks = []
    for url in urls:
        chunks = scrape_and_collect(url, chunk_size)
        all_chunks.extend(chunks)

    # Write all chunks to file, each separated by two newlines
    with open(output_file, "w", encoding="utf-8") as f:
        f.write("\n\n".join(all_chunks))

    print(f"\n📁 Saved {len(all_chunks)} total chunks from {len(urls)} URLs to {output_file}")

# Example usage:
urls = [
    "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
    "https://www.who.int/news-room/fact-sheets/detail/depression",
    "https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders"
]
scrape_multiple_and_save(urls)
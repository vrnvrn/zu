#!/usr/bin/env python3
"""Convert .eml newsletter files to markdown with frontmatter."""

import os
import re
import quopri
from pathlib import Path
from datetime import datetime
from email import policy
from email.parser import BytesParser

# Newsletter files with their dates extracted from headers
NEWSLETTERS = [
    ("Zuzalu Newsletter - February Edition.eml", "2024-02-13", "ZuLetter — February 13, 2024"),
    ("Zuzalu Newsletter - March 2024.eml", "2024-03-06", "ZuLetter — March 6, 2024"),
    ("Zuzalu Newsletter - April Edition.eml", "2024-04-01", "ZuLetter — April 1, 2024"),
    ("Zuzalu Newsletter - May Edition.eml", "2024-05-01", "ZuLetter — May 1, 2024"),
    ("Zuzalu Newsletter - June Edition.eml", "2024-06-01", "ZuLetter — June 1, 2024"),
    ("Zuzalu Newsletter - July 2024 Edition.eml", "2024-07-01", "ZuLetter — July 1, 2024"),
    ("Zuzalu Newsletter - August 2024 Edition.eml", "2024-08-01", "ZuLetter — August 1, 2024"),
    ("Zuzalu Newsletter - September 2024 Edition.eml", "2024-09-04", "ZuLetter — September 4, 2024"),
    ("Zuzalu Newsletter - October 2024 Edition.eml", "2024-10-08", "ZuLetter — October 8, 2024"),
    ("Zuzalu Community Newsletter | 2024 Retrospective.eml", "2024-12-31", "ZuLetter — 2024 Retrospective"),
]

def decode_quoted_printable(content: str) -> str:
    """Decode quoted-printable content."""
    # Handle soft line breaks (=\n)
    content = content.replace("=\n", "")
    # Handle =XX encoding
    try:
        decoded = quopri.decodestring(content.encode('utf-8', errors='replace')).decode('utf-8', errors='replace')
        return decoded
    except:
        return content

def extract_html_from_eml(eml_path: str) -> str:
    """Extract HTML content from .eml file."""
    with open(eml_path, 'rb') as f:
        msg = BytesParser(policy=policy.default).parse(f)
    
    # Get HTML part
    html_content = None
    if msg.is_multipart():
        for part in msg.walk():
            content_type = part.get_content_type()
            if content_type == 'text/html':
                payload = part.get_payload(decode=True)
                if payload:
                    html_content = payload.decode('utf-8', errors='replace')
                break
    else:
        if msg.get_content_type() == 'text/html':
            payload = msg.get_payload(decode=True)
            if payload:
                html_content = payload.decode('utf-8', errors='replace')
    
    return html_content or ""

def clean_html_to_markdown(html: str) -> str:
    """Convert HTML newsletter content to markdown."""
    from html.parser import HTMLParser
    
    # First, extract meaningful content
    lines = []
    images = []
    
    # Find all image URLs
    img_pattern = r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>'
    for match in re.finditer(img_pattern, html, re.IGNORECASE):
        img_url = match.group(1)
        # Skip tracking pixels and tiny images
        if 'width="1"' not in match.group(0) and 'height="1"' not in match.group(0):
            if 'storage.mlcdn.com' in img_url or img_url.endswith(('.jpg', '.png', '.gif', '.jpeg')):
                if img_url not in images:
                    images.append(img_url)
    
    # Remove HTML tags but preserve structure
    # First, convert <br> to newlines
    html = re.sub(r'<br\s*/?>', '\n', html, flags=re.IGNORECASE)
    
    # Extract headers
    h1_pattern = r'<h1[^>]*>(.*?)</h1>'
    h2_pattern = r'<h2[^>]*>(.*?)</h2>'
    
    # Extract paragraphs and lists
    p_pattern = r'<p[^>]*>(.*?)</p>'
    li_pattern = r'<li[^>]*>(.*?)</li>'
    
    # Extract links
    link_pattern = r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>'
    
    def clean_text(text):
        """Remove HTML tags and decode entities."""
        # Remove remaining HTML tags
        text = re.sub(r'<[^>]+>', '', text)
        # Decode common HTML entities
        text = text.replace('&amp;', '&')
        text = text.replace('&lt;', '<')
        text = text.replace('&gt;', '>')
        text = text.replace('&nbsp;', ' ')
        text = text.replace('&quot;', '"')
        text = text.replace('&#8211;', '–')
        text = text.replace('&#8212;', '—')
        text = text.replace('&#8216;', ''')
        text = text.replace('&#8217;', ''')
        text = text.replace('&#8220;', '"')
        text = text.replace('&#8221;', '"')
        text = text.replace('&mdash;', '—')
        text = text.replace('&ndash;', '–')
        text = text.replace('&rsquo;', ''')
        text = text.replace('&lsquo;', ''')
        text = text.replace('&rdquo;', '"')
        text = text.replace('&ldquo;', '"')
        # Clean up whitespace
        text = re.sub(r'\s+', ' ', text)
        return text.strip()
    
    result = []
    
    # Track what we've processed to avoid duplicates
    processed_content = set()
    
    # Find main title (h1)
    for match in re.finditer(h1_pattern, html, re.IGNORECASE | re.DOTALL):
        title = clean_text(match.group(1))
        if title and title not in processed_content:
            result.append(f"# {title}\n")
            processed_content.add(title)
            break
    
    # Find all h2 headers and their following content
    h2_positions = [(m.start(), m.end(), clean_text(m.group(1))) for m in re.finditer(h2_pattern, html, re.IGNORECASE | re.DOTALL)]
    
    # Process the content between headers
    current_pos = 0
    for i, (start, end, h2_text) in enumerate(h2_positions):
        # Get content before this h2 (but after previous h2)
        section_html = html[current_pos:start]
        
        # Process paragraphs in this section
        for p_match in re.finditer(p_pattern, section_html, re.IGNORECASE | re.DOTALL):
            p_text = p_match.group(1)
            
            # Process links within the paragraph
            p_text_with_links = p_text
            for link_match in re.finditer(link_pattern, p_text, re.IGNORECASE | re.DOTALL):
                link_url = link_match.group(1)
                link_text = clean_text(link_match.group(2))
                # Skip tracking URLs
                if 'clicks.mlsend.com' in link_url:
                    p_text_with_links = p_text_with_links.replace(link_match.group(0), link_text)
                else:
                    p_text_with_links = p_text_with_links.replace(link_match.group(0), f"[{link_text}]({link_url})")
            
            cleaned = clean_text(p_text_with_links)
            if cleaned and len(cleaned) > 2 and cleaned not in processed_content:
                result.append(cleaned + "\n")
                processed_content.add(cleaned)
        
        # Add the h2 header
        if h2_text and len(h2_text) > 0:
            result.append(f"\n## {h2_text}\n")
        
        current_pos = end
    
    # Process remaining content after last h2
    if current_pos < len(html):
        section_html = html[current_pos:]
        for p_match in re.finditer(p_pattern, section_html, re.IGNORECASE | re.DOTALL):
            p_text = p_match.group(1)
            p_text_with_links = p_text
            for link_match in re.finditer(link_pattern, p_text, re.IGNORECASE | re.DOTALL):
                link_url = link_match.group(1)
                link_text = clean_text(link_match.group(2))
                if 'clicks.mlsend.com' in link_url:
                    p_text_with_links = p_text_with_links.replace(link_match.group(0), link_text)
                else:
                    p_text_with_links = p_text_with_links.replace(link_match.group(0), f"[{link_text}]({link_url})")
            
            cleaned = clean_text(p_text_with_links)
            if cleaned and len(cleaned) > 2 and cleaned not in processed_content:
                result.append(cleaned + "\n")
                processed_content.add(cleaned)
    
    # Process lists
    for li_match in re.finditer(li_pattern, html, re.IGNORECASE | re.DOTALL):
        li_text = li_match.group(1)
        li_text_with_links = li_text
        for link_match in re.finditer(link_pattern, li_text, re.IGNORECASE | re.DOTALL):
            link_url = link_match.group(1)
            link_text = clean_text(link_match.group(2))
            if 'clicks.mlsend.com' in link_url:
                li_text_with_links = li_text_with_links.replace(link_match.group(0), link_text)
            else:
                li_text_with_links = li_text_with_links.replace(link_match.group(0), f"[{link_text}]({link_url})")
        
        cleaned = clean_text(li_text_with_links)
        if cleaned and len(cleaned) > 2 and cleaned not in processed_content:
            result.append(f"- {cleaned}\n")
            processed_content.add(cleaned)
    
    # Add images
    if images:
        result.append("\n## Images\n")
        for img_url in images:
            result.append(f"\n![Newsletter Image]({img_url})\n")
    
    return "\n".join(result)

def simple_html_to_markdown(html: str) -> tuple[str, list[str]]:
    """Simpler HTML to markdown conversion focusing on preserving content and images."""
    images = []
    
    # Extract image URLs (skip tracking pixels)
    img_pattern = r'<img[^>]+src=["\']([^"\']+)["\'][^>]*(?:width=["\'](\d+)["\'])?[^>]*>'
    for match in re.finditer(img_pattern, html, re.IGNORECASE):
        img_url = match.group(1)
        width = match.group(2) if match.group(2) else "500"
        # Skip tracking pixels
        if int(width) if width.isdigit() else 500 > 10:
            if 'storage.mlcdn.com' in img_url:
                if img_url not in images:
                    images.append(img_url)
    
    # Remove style and script tags with their content first
    content = re.sub(r'<style[^>]*>.*?</style>', '', html, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    content = re.sub(r'<head[^>]*>.*?</head>', '', content, flags=re.IGNORECASE | re.DOTALL)
    
    # Remove table/layout related tags but keep content
    content = re.sub(r'</?table[^>]*>', '', content, flags=re.IGNORECASE)
    content = re.sub(r'</?tr[^>]*>', '', content, flags=re.IGNORECASE)
    content = re.sub(r'</?td[^>]*>', '', content, flags=re.IGNORECASE)
    content = re.sub(r'</?div[^>]*>', '\n', content, flags=re.IGNORECASE)
    content = re.sub(r'</?span[^>]*>', '', content, flags=re.IGNORECASE)
    content = re.sub(r'</?ol[^>]*>', '\n', content, flags=re.IGNORECASE)
    content = re.sub(r'</?ul[^>]*>', '\n', content, flags=re.IGNORECASE)
    
    # Replace common patterns
    content = re.sub(r'<h1[^>]*>(.*?)</h1>', r'\n# \1\n', content, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(r'<h2[^>]*>(.*?)</h2>', r'\n## \1\n', content, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(r'<h3[^>]*>(.*?)</h3>', r'\n### \1\n', content, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(r'<strong[^>]*>(.*?)</strong>', r'**\1**', content, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(r'<b[^>]*>(.*?)</b>', r'**\1**', content, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(r'<em[^>]*>(.*?)</em>', r'*\1*', content, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(r'<i[^>]*>(.*?)</i>', r'*\1*', content, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(r'<br\s*/?>', '\n', content, flags=re.IGNORECASE)
    content = re.sub(r'<p[^>]*>', '\n', content, flags=re.IGNORECASE)
    content = re.sub(r'</p>', '\n', content, flags=re.IGNORECASE)
    content = re.sub(r'<li[^>]*>', '\n- ', content, flags=re.IGNORECASE)
    content = re.sub(r'</li>', '', content, flags=re.IGNORECASE)
    
    # Remove links but keep text (the MailerLite tracking URLs aren't useful)
    content = re.sub(r'<a[^>]+>(.*?)</a>', r'\1', content, flags=re.IGNORECASE | re.DOTALL)
    
    # Remove remaining HTML tags
    content = re.sub(r'<[^>]+>', '', content)
    
    # Decode HTML entities
    content = content.replace('&amp;', '&')
    content = content.replace('&lt;', '<')
    content = content.replace('&gt;', '>')
    content = content.replace('&nbsp;', ' ')
    content = content.replace('&quot;', '"')
    content = content.replace('&mdash;', '—')
    content = content.replace('&ndash;', '–')
    content = content.replace('&rsquo;', "'")
    content = content.replace('&lsquo;', "'")
    content = content.replace('&rdquo;', '"')
    content = content.replace('&ldquo;', '"')
    
    # Clean up excessive whitespace
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
    content = re.sub(r'  +', ' ', content)
    
    # Clean up header formatting
    content = re.sub(r'# \s*\n\s*', '# ', content)
    content = re.sub(r'## \s*\n\s*', '## ', content)
    content = re.sub(r'### \s*\n\s*', '### ', content)
    
    # Clean up stray asterisks
    content = re.sub(r'^\*\*\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'\*\*\*\*+', '**', content)
    content = re.sub(r'\*\*\s*\*\*', '', content)
    content = re.sub(r'^\*\*\n', '', content, flags=re.MULTILINE)
    content = re.sub(r'\n\*\*\n', '\n', content)
    
    # Remove footer content (Unsubscribe, MailerLite branding)
    content = re.sub(r'You\'re receiving this newsletter.*$', '', content, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(r'Unsubscribe.*$', '', content, flags=re.IGNORECASE | re.DOTALL)
    content = re.sub(r'Sent by MailerLite.*$', '', content, flags=re.IGNORECASE | re.DOTALL)
    
    return content.strip(), images

def create_markdown_file(eml_file: str, date: str, title: str, refs_dir: str, newsletters_dir: str):
    """Create a markdown file from an .eml file."""
    eml_path = os.path.join(refs_dir, eml_file)
    
    if not os.path.exists(eml_path):
        print(f"Warning: {eml_file} not found")
        return
    
    # Extract HTML
    html = extract_html_from_eml(eml_path)
    if not html:
        print(f"Warning: No HTML content in {eml_file}")
        return
    
    # Convert to markdown
    content, images = simple_html_to_markdown(html)
    
    # Create frontmatter
    frontmatter = f'''---
title: "{title}"
cycle: "{date}"
editors: ["@veronica"]
source_repo: "vrnvrn/zu"
---

'''
    
    # Add images inline or at sections where they fit
    # For now, add them at the end
    if images:
        content += "\n\n---\n\n## Images from this edition\n\n"
        for i, img_url in enumerate(images, 1):
            content += f"![Image {i}]({img_url})\n\n"
    
    # Add verification footer
    content += f'\n\n---\n\n*This edition is verifiable on GitHub. [View source](https://github.com/vrnvrn/zu/blob/main/newsletters/{date}.md)*\n'
    
    # Final cleanup of content
    content = content.strip()
    # Remove leading ** that may appear
    while content.startswith('**\n') or content.startswith('**\r'):
        content = content[3:].strip()
    while content.startswith('**'):
        content = content[2:].strip()
    
    # Write the file
    md_path = os.path.join(newsletters_dir, f"{date}.md")
    with open(md_path, 'w', encoding='utf-8') as f:
        f.write(frontmatter + content)
    
    print(f"Created: {md_path}")
    print(f"  - {len(images)} images included")

def main():
    # Paths
    base_dir = Path(__file__).parent.parent
    refs_dir = base_dir / "refs"
    newsletters_dir = base_dir / "newsletters"
    
    # Create newsletters directory if needed
    newsletters_dir.mkdir(exist_ok=True)
    
    # Process each newsletter
    for eml_file, date, title in NEWSLETTERS:
        print(f"\nProcessing: {eml_file}")
        create_markdown_file(eml_file, date, title, str(refs_dir), str(newsletters_dir))
    
    print("\n✅ Done! All newsletters converted.")

if __name__ == "__main__":
    main()

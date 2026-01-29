#!/usr/bin/env python3
"""Convert .eml newsletter files to markdown with embedded HTML."""

import os
import re
from pathlib import Path
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

def clean_html_for_display(html: str) -> str:
    """Clean up HTML for better display while preserving formatting."""
    # Remove tracking pixel at the start
    html = re.sub(r'<span style="display:none">.*?</span>', '', html, flags=re.DOTALL)
    
    # Remove the MailerLite footer/unsubscribe section
    # Find and remove the footer table with unsubscribe link
    html = re.sub(r'<table[^>]*>.*?mlRTEfooterUnsubscribe.*?</table>', '', html, flags=re.DOTALL | re.IGNORECASE)
    
    # Remove "Sent by MailerLite" branding
    html = re.sub(r'<table[^>]*>.*?Sent by MailerLite.*?</table>', '', html, flags=re.DOTALL | re.IGNORECASE)
    html = re.sub(r'<a[^>]*>.*?<img[^>]*MailerLite[^>]*>.*?</a>', '', html, flags=re.DOTALL | re.IGNORECASE)
    
    # Remove ml-hide-branding class content
    html = re.sub(r'<tr class="ml-hide-branding">.*?</tr>', '', html, flags=re.DOTALL | re.IGNORECASE)
    
    # Convert MailerLite tracking URLs to cleaner display
    # These are base64-encoded redirect URLs, we'll just keep the link text
    
    return html

def create_markdown_file(eml_file: str, date: str, title: str, refs_dir: str, newsletters_dir: str):
    """Create a markdown file with embedded HTML from an .eml file."""
    eml_path = os.path.join(refs_dir, eml_file)
    
    if not os.path.exists(eml_path):
        print(f"Warning: {eml_file} not found")
        return
    
    # Extract HTML
    html = extract_html_from_eml(eml_path)
    if not html:
        print(f"Warning: No HTML content in {eml_file}")
        return
    
    # Clean up the HTML
    html = clean_html_for_display(html)
    
    # Create frontmatter
    frontmatter = f'''---
title: "{title}"
cycle: "{date}"
editors: ["@veronica"]
source_repo: "vrnvrn/zu"
---

'''
    
    # Add verification footer
    footer = f'''

<div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
<em>This edition is verifiable on GitHub. <a href="https://github.com/vrnvrn/zu/blob/main/newsletters/{date}.md">View source</a></em>
</div>
'''
    
    # Combine: frontmatter + raw HTML + footer
    content = frontmatter + html + footer
    
    # Write the file
    md_path = os.path.join(newsletters_dir, f"{date}.md")
    with open(md_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Created: {md_path}")
    print(f"  - HTML content preserved")

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
    
    print("\n✅ Done! All newsletters converted with HTML preserved.")

if __name__ == "__main__":
    main()

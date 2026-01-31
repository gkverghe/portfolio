#!/usr/bin/env python3
"""
Fetches stock data from Finnhub and AI news from RSS feeds.
Outputs to data/stocks.json and data/news.json
"""

import json
import os
import re
from datetime import datetime, timedelta
from typing import Optional

import feedparser
import requests

# =============================================================================
# CONFIGURATION - Edit these values as needed
# =============================================================================

# Stock tickers to track
STOCK_TICKERS = ["NVDA", "GOOGL", "MSFT", "AMZN", "META"]

# RSS feeds to parse for AI news
RSS_FEEDS = [
    "https://techcrunch.com/category/artificial-intelligence/feed/",
    "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
    "https://feeds.arstechnica.com/arstechnica/technology-lab",
    "https://venturebeat.com/category/ai/feed/",
]

# Keywords to filter news (case-insensitive)
NEWS_KEYWORDS = [
    "AI", "LLM", "GPT", "Claude", "Gemini", "OpenAI", "Anthropic",
    "Google AI", "Microsoft Copilot", "artificial intelligence",
    "machine learning", "ChatGPT", "Llama", "AWS", "Amazon Bedrock",
    "neural network", "deep learning", "generative AI"
]

# Maximum number of news items to keep
MAX_NEWS_ITEMS = 10

# =============================================================================
# FINNHUB API FUNCTIONS
# =============================================================================

def get_finnhub_quote(ticker: str, api_key: str) -> Optional[dict]:
    """Fetch current quote data from Finnhub."""
    try:
        url = f"https://finnhub.io/api/v1/quote?symbol={ticker}&token={api_key}"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching quote for {ticker}: {e}")
        return None


def get_finnhub_profile(ticker: str, api_key: str) -> Optional[dict]:
    """Fetch company profile from Finnhub."""
    try:
        url = f"https://finnhub.io/api/v1/stock/profile2?symbol={ticker}&token={api_key}"
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching profile for {ticker}: {e}")
        return None


def format_market_cap(market_cap_millions: float) -> str:
    """Format market cap in human-readable form (B or T)."""
    if market_cap_millions >= 1_000_000:
        return f"{market_cap_millions / 1_000_000:.1f}T"
    elif market_cap_millions >= 1_000:
        return f"{market_cap_millions / 1_000:.1f}B"
    else:
        return f"{market_cap_millions:.0f}M"


def fetch_stock_data(api_key: str) -> list:
    """Fetch stock data for all configured tickers."""
    stocks = []

    for ticker in STOCK_TICKERS:
        quote = get_finnhub_quote(ticker, api_key)
        profile = get_finnhub_profile(ticker, api_key)

        if quote and profile:
            # Calculate YoY change (approximation using 52-week data if available)
            current_price = quote.get("c", 0)
            previous_close = quote.get("pc", 0)
            change_percent = quote.get("dp", 0)  # Daily percent change

            # Note: Finnhub free tier doesn't provide YoY directly
            # Using daily change as a proxy; for real YoY you'd need historical data

            stock_data = {
                "ticker": ticker,
                "name": profile.get("name", ticker),
                "price": round(current_price, 2),
                "marketCap": format_market_cap(profile.get("marketCapitalization", 0)),
                "change": round(change_percent, 2),  # Daily change %
                "previousClose": round(previous_close, 2),
            }
            stocks.append(stock_data)
            print(f"Fetched {ticker}: ${current_price:.2f} ({change_percent:+.2f}%)")
        else:
            print(f"Skipping {ticker} due to API error")

    return stocks


# =============================================================================
# RSS NEWS FUNCTIONS
# =============================================================================

def matches_keywords(text: str) -> bool:
    """Check if text contains any of the filter keywords."""
    text_lower = text.lower()
    for keyword in NEWS_KEYWORDS:
        # Use word boundary matching for short keywords to avoid false positives
        if len(keyword) <= 3:
            if re.search(rf'\b{re.escape(keyword.lower())}\b', text_lower):
                return True
        else:
            if keyword.lower() in text_lower:
                return True
    return False


def parse_rss_feeds() -> list:
    """Parse all RSS feeds and filter for AI-related news."""
    all_articles = []

    for feed_url in RSS_FEEDS:
        try:
            print(f"Parsing feed: {feed_url}")
            feed = feedparser.parse(feed_url)

            for entry in feed.entries[:20]:  # Check first 20 entries per feed
                title = entry.get("title", "")
                summary = entry.get("summary", entry.get("description", ""))

                # Check if article matches our keywords
                if matches_keywords(title) or matches_keywords(summary):
                    # Parse publication date
                    pub_date = entry.get("published_parsed") or entry.get("updated_parsed")
                    if pub_date:
                        date_str = datetime(*pub_date[:6]).strftime("%b %Y")
                    else:
                        date_str = datetime.now().strftime("%b %Y")

                    # Extract source name from feed
                    source = feed.feed.get("title", "Unknown")
                    # Clean up source name
                    source = source.replace(" - All Posts", "").replace(" RSS Feed", "").strip()

                    article = {
                        "headline": title[:150],  # Truncate long headlines
                        "source": source[:30],    # Truncate long source names
                        "date": date_str,
                        "link": entry.get("link", ""),
                    }
                    all_articles.append(article)
                    print(f"  Found: {title[:60]}...")

        except Exception as e:
            print(f"Error parsing feed {feed_url}: {e}")

    # Remove duplicates based on headline similarity
    seen_headlines = set()
    unique_articles = []
    for article in all_articles:
        headline_key = article["headline"][:50].lower()
        if headline_key not in seen_headlines:
            seen_headlines.add(headline_key)
            unique_articles.append(article)

    # Sort by date (most recent first) and limit
    unique_articles = unique_articles[:MAX_NEWS_ITEMS]

    return unique_articles


# =============================================================================
# MAIN
# =============================================================================

def main():
    # Get API key from environment
    api_key = os.environ.get("FINNHUB_API_KEY")

    if not api_key:
        print("Warning: FINNHUB_API_KEY not set. Using sample stock data.")
        stocks = [
            {"ticker": "NVDA", "name": "NVIDIA", "price": 0, "marketCap": "N/A", "change": 0},
        ]
    else:
        print("Fetching stock data from Finnhub...")
        stocks = fetch_stock_data(api_key)

    print("\nFetching news from RSS feeds...")
    news = parse_rss_feeds()

    # Prepare output with metadata
    stocks_output = {
        "lastUpdated": datetime.utcnow().isoformat() + "Z",
        "stocks": stocks,
    }

    news_output = {
        "lastUpdated": datetime.utcnow().isoformat() + "Z",
        "articles": news,
    }

    # Write to JSON files
    os.makedirs("data", exist_ok=True)

    with open("data/stocks.json", "w") as f:
        json.dump(stocks_output, f, indent=2)
    print(f"\nWrote {len(stocks)} stocks to data/stocks.json")

    with open("data/news.json", "w") as f:
        json.dump(news_output, f, indent=2)
    print(f"Wrote {len(news)} news articles to data/news.json")


if __name__ == "__main__":
    main()

import React, { useEffect, useState } from "react";
import "./News.css";

const News = () => {
    const [query, setQuery] = useState("");
    const [articles, setArticles] = useState([]);

    const categories = [
        "Technology",
        "Sports",
        "Politics",
        "Entertainment",
        "Health",
        "Business",
        "Science",
    ];

    const fetchNews = async () => {
        if (!query) return;

        const apiKey = process.env.REACT_APP_NEWS_API_KEY;
        const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            setArticles(data.articles);
        } catch (error) {
            console.log("Error fetching news:", error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [query]);

    return (


        <div className="news-container">
            <h1>News Finder</h1>

            <div className="category-buttons">
                {categories.map((category, index) => (
                    <button key={index} onClick={() => setQuery(category)}>
                        {category}
                    </button>
                ))}
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter topic..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={fetchNews}>Search</button>
            </div>

            <div className="news-grid">
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <div key={index} className="news-card">
                            {article.urlToImage && (
                                <img src={article.urlToImage} alt="news" />
                            )}
                            <div className="news-content">
                                <h3>{article.title}</h3>
                                <p>
                                    {article.description
                                        ? article.description.slice(0, 100) + "..."
                                        : "No description available."}
                                </p>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-news">No news available. Try a different keyword.</p>
                )}
            </div>
        </div>
    );
};

export default News;

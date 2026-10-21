
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../components/BackendUrl";
import "./StockNews.css";

const StockNews = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchNews = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const page = Number(localStorage.getItem("marketauxNextPage") || 1);

            const response = await axios.get(`${BASE_URL}/api/stock-news`, {
                params: { page },
            });

            const newArticles = response.data.articles || [];

            if (newArticles.length === 0) {
                // Restart from page 1 if there are no more results.
                localStorage.setItem("marketauxNextPage", "1");
                setError("No more articles on this page. Try refreshing again.");
                return;
            }

            setArticles((previous) => {
                const seen = new Set(previous.map((article) => article.uuid || article.url));

                const uniqueArticles = newArticles.filter((article) => {
                    const id = article.uuid || article.url;

                    if (!id || seen.has(id)) return false;

                    seen.add(id);
                    return true;
                });

                return [...previous, ...uniqueArticles];
            });

            localStorage.setItem("marketauxNextPage", String(page + 1));
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load stock news.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]); 

    return (
        <section className="stock-news">
            <div className="stockNewsHeader">
                <h2>Latest Stock Market News</h2>
                {articles.length == 0 &&
                    <button onClick={fetchNews} disabled={loading} className="btn btn-primary">
                        {loading ? "Loading..." : "Refresh News"}
                    </button>}
            </div>
            {error && <p>{error}</p>}

            <div className="stockNewsGrid">
                {articles.map((article) => (
                    <article className="article" key={article.uuid || article.url}>

                        <h3>{article.title}</h3>
                        <p className="description">{article.description || "Read the full article for details."}</p>
                        {article.image_url && (<img className="image" src={article.image_url} alt="" />)}

                        <small className="source">
                            {article.source || "News"}{" "}
                            {article.published_at && `• ${new Date(article.published_at).toLocaleString()}`}
                        </small>

                        <a className="source-link" href={article.url} target="_blank" rel="noopener noreferrer">
                            Read Full News
                        </a>
                    </article>
                ))}
            </div>
            {articles.length > 0 &&
                <button onClick={fetchNews} className="btn btn-danger">
                    load more
                </button>
                }
        </section>
    );
};

export default StockNews;








// import { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../BackendUrl";
// import "./StockNews.css";

// export default function StockNews() {
//     const [news, setNews] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         axios
//             .get(`${BASE_URL}/api/stock-news`)
//             .then((response) => setNews(response.data))
//             .catch(() => setError("Unable to load stock news."))
//             .finally(() => setLoading(false));
//     }, []);

//     if (loading) return <p>Loading stock news...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <section className="stock-news">
//             <h2>Market News</h2>

//             {news.map((article) => (
//                 <article key={article.uuid} className="article">
//                     <h3>{article.title}</h3>

//                     <p className="description">
//                         {article.description || "Read the original article for details."}
//                     </p>

//                     <img src={article.image_url} className="image" />

//                     <small className="source">
//                         {article.source} ·{" "}
//                         {article.published_at ? new Date(article.published_at).toLocaleString() : "Publication time unavailable"}
//                     </small>

//                     <p className="source-link">
//                         <a href={article.url} target="_blank" rel="noopener noreferrer">Read full article ↗</a>
//                     </p>
//                 </article>
//             ))}
//         </section>
//     );
// }

import { useEffect, useState } from "react";
import { getNews } from "../lib/api";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getNews();
      setNews(data);
    }
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">
        Trending Financial News
      </h2>

      <div className="space-y-3">
        {news.map((item, i) => (
          <article key={i} className="bg-white rounded-xl shadow p-4">
            <h3 className="font-medium text-slate-800">{item.headline}</h3>
            <p className="text-xs text-slate-500">{item.source}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

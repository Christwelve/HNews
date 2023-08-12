import { useState } from 'react'
import axios from 'axios'
import './App.css'

function SearchArticles() {
	const [searchQuery, setSearchQuery] = useState('');
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		fetchArticles();
	};
	
	const fetchArticles = async () => {
		try {
			setLoading(true);
			setError('');
			const response = await axios.get(
				`http://hn.algolia.com/api/v1/search?query=:${searchQuery}`
			);
			const articles = response.data.hits.filter(article => article.url != null);
			if (articles.length === 0){
				setError('No matching articles');
				setArticles([]);
			} else {
				setArticles(articles);
			}
		} catch (error){
			setError('Fetching data failed');
			setArticles([]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<form onSubmit={handleSearchSubmit} 
				className="input-container">
			<input
				type="text"
				placeholder="Search articles..."
				value={searchQuery}
				onChange={handleSearchChange}
				required
			/>
			<button type="submit">Search</button>
			</form>
			{loading && <div className="loading-spinner"></div>}
			{error && <div className="error-message">{error}</div>}
			<ul>
				{(articles.length > 0) && articles.map((article) => (
					<li key={article.objectID}>
						<a href={article.url} target="_blank" rel="noopener noreferrer">
						{article.title}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}

export default SearchArticles;


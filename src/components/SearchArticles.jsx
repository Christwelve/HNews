import { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'

function SearchArticles() {
	const [searchQuery, setSearchQuery] = useState('');
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [page, setPage] = useState(1);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		setPage(1);
		fetchArticles();
	};

	const handlePrevButton = () => {
		if (page > 1)
			setPage(page - 1);
	}

	const handleNextButton = () => {
		setPage(page + 1);
	}
	
	useEffect(() => {
		fetchArticles();
	}, [page])

	const fetchArticles = async () => {
		try {
			setLoading(true);
			setError('');
			const response = await axios.get(
				// `http://hn.algolia.com/api/v1/search?query=:${searchQuery}`
				`https://hn.algolia.com/api/v1/search?query=${searchQuery}&page=${page}`
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
		<div className="search-container">
			<form onSubmit={handleSearchSubmit} className="input-container">
				<div className="input-wrapper">
					<input
						type="text"
						placeholder="Search articles..."
						value={searchQuery}
						onChange={handleSearchChange}
						required
						/>
					{loading && <div className="loading-spinner" aria-disabled={!loading}></div>}
				</div>
				<button type="submit">Search</button>
			</form>
			<button onClick={handlePrevButton}>Prev</button>
			<span>{page}</span>
			<button onClick={handleNextButton}>Next</button>	
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


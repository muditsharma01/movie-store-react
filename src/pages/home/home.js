import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [error, setError] = useState(null);
    const apiKey = "bb27e5f0"; // OMDB API key

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?s=popular&apikey=${apiKey}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (data.Response === "False") {
                    throw new Error(data.Error);
                }
                setPopularMovies(data.Search || []);
            })
            .catch(err => {
                console.error("Failed to fetch popular movies:", err);
                setError(err.message);
            });
    }, []);

    return (
        <>
            <div className="poster">
                {error ? (
                    <div className="error">{error}</div>
                ) : (
                    <Carousel
                        showThumbs={false}
                        autoPlay={true}
                        transitionTime={3}
                        infiniteLoop={true}
                        showStatus={false}
                    >
                        {popularMovies.map(movie => (
                            <Link
                                key={movie.imdbID}
                                style={{ textDecoration: "none", color: "white" }}
                                to={`/movie/${movie.imdbID}`}
                            >
                                <div className="posterImage">
                                    <img
                                        src={movie.Poster !== "N/A" ? movie.Poster : ""}
                                        alt={movie.Title}
                                    />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">
                                        {movie.Title}
                                    </div>
                                    <div className="posterImage__runtime">
                                        {movie.Year}
                                        <span className="posterImage__rating">
                                            {movie.imdbRating}
                                            <i className="fas fa-star" />
                                        </span>
                                    </div>
                                    <div className="posterImage__description">
                                        {movie.Plot}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Carousel>
                )}
                <MovieList />
            </div>
        </>
    );
};

export default Home;

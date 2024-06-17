import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const { type } = useParams();
    const apiKey = "bb27e5f0"; // OMDB API key

    useEffect(() => {
        getData();
    }, [type]);

    const getData = async () => {
        try {
            const query = type ? type : "popular"; // Default search term
            const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
            const data = await response.json();
            if (data.Search) {
                setMovieList(data.Search);
            } else {
                setMovieList([]); // Reset movie list if no results found
            }
        } catch (error) {
            console.error("Failed to fetch movies:", error);
        }
    };

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {movieList.map((movie) => (
                    <Cards key={movie.imdbID} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;

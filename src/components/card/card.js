import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="cards">
                    <SkeletonTheme color="#202020" highlightColor="#444">
                        <Skeleton height={300} duration={2} />
                    </SkeletonTheme>
                </div>
            ) : (
                <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: "none", color: "white" }}>
                    <div className="cards">
                        <img className="cards__img" src={movie.Poster !== "N/A" ? movie.Poster : "placeholder_image_url"} alt={movie.Title} />
                        <div className="cards__overlay">
                            <div className="card__title">{movie ? movie.Title : ""}</div>
                            <div className="card__runtime">
                                {movie ? movie.Released : ""}
                                <span className="card__rating">{movie ? movie.imdbRating : ""}<i className="fas fa-star" /></span>
                            </div>
                            <div className="card__description">{movie ? movie.Plot.slice(0, 118) + "..." : ""}</div>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default Cards;

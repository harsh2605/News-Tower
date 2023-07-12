//my api key:6bfe65cecd314c4c8a5b09117ea5c405
import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import './News.css'
const News = (props) => {
    const capatalise = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // document.title = `${capatalise(props.category)}-NewsTower`;
    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(0);
    useEffect(async() => {
        setloading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1aac5316758c4b80a798fabc81f42212&page=1&pagesize=${props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        setarticles(parseData.articles);
        settotalResults(parseData.totalResults);
        setloading(false);
    },[]);
    const prevclick = async () => {
        console.log("previous click");
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1aac5316758c4b80a798fabc81f42212&page=${page - 1}&pagesize=${props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        setpage(page - 1);
        setarticles(parseData.articles);
        setloading(false);
    }
    const nextclick = async () => {
        if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1aac5316758c4b80a798fabc81f42212&page=${page + 1}&pagesize=${props.pageSize}`;
            let data = await fetch(url);
            setloading(true);
            let parseData = await data.json();
            setpage(page + 1);
            setarticles(parseData.articles);
            setloading(false);
        }
    }
    return (
        <>
            <div className="container my-3">
                <h2 className="text-center mb-3">{`NewsTower - Top ${capatalise(props.category)} Headlines`}</h2>
                {loading && <Spinner />}
                <div className="row" >
                    {articles.map((element) => {
                        console.log(element.urlToImage);
                        return <div className="col md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 55) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} url={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={prevclick}>&#129044; Previous</button>
                    <button disabled={page >= Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={nextclick}>Next &#10141;</button>
                </div>
            </div>
        </>
    )
}

News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News

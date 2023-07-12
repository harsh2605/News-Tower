import React from 'react'
import './Newsitem.css'
const NewsItem=(props)=> {
        let { title, description, imageUrl, url, author, publishedAt, source } = props
        console.log(source);
        return (
            <div className="container my-4">
                <div className="card " style={{ width: "18rem" }}>
                    <img src={!imageUrl ? "https://media.istockphoto.com/id/1301983459/photo/media-concept-with-tv-screens.jpg?b=1&s=170667a&w=0&k=20&c=dCh0E9zon_lOwdM2fwxXwk3Lz7NFlzma5W0K0O1BWnM=" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                            {source}
                        </span></h5>
                        <p className="card-text">{!description ? "click on read more" : description}...</p>
                        <p className="card-text"><small className="made">By - {!author ? "Unknown" : author} on {new Date(publishedAt).toGMTString()}</small></p>

                        <a href={!url ? "https://www.bollywoodshaadis.com/articles/bharti-singh-announces-pregnancy-in-a-unique-way-29096" : url} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem

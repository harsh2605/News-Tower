import React, { Component } from 'react'
import './Newsitem.css'
export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, url, author, publishedAt,source} = this.props
        return (
            <div className="container my-4">
                <div className="card " style={{ width: "18rem" }}>
                    <img src={!imageUrl ? "https://images.gnwcdn.com/2021/articles/2021-12-11-10-27/-1639218454546.jpg/EG11/resize/1200x-1/-1639218454546.jpg" : imageUrl} className="card-img-top" alt="..." />
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
}

export default NewsItem

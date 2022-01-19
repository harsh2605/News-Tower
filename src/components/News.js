import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import './News.css'
export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capatalise(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capatalise(this.props.category)}-NewsTower`;
    }
    async componentDidMount() {
        this.setState({ loading: true });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6bfe65cecd314c4c8a5b09117ea5c405&page=1&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false });
    }
    prevclick = async () => {
        console.log("previous click");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6bfe65cecd314c4c8a5b09117ea5c405&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.setState({ loading: true });
        let parseData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        });
    }
    nextclick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6bfe65cecd314c4c8a5b09117ea5c405&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
            let data = await fetch(url);
            this.setState({ loading: true });
            let parseData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false
            });
        }
    }
    render() {
        return (
            <>
                <div className="container my-3">
                    <h2 className="text-center mb-3">{`NewsTower - Top ${this.capatalise(this.props.category)} Headlines`}</h2>
                    {this.state.loading && <Spinner />}
                    <div className="row" >
                        {this.state.articles.map((element) => {
                            return <div className="col md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 55) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} url={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.prevclick}>&#129044; Previous</button>
                        <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextclick}>Next &#10141;</button>
                    </div>
                </div>
            </>
        )
    }
}

export default News

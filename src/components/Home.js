import React, { Component } from 'react';
import Hero from './Hero';
import Loader from './Loader';
import Navigation from './Navigation';
 
export default class Home extends Component {
  state = {
    data: null,
    tagList: null,
  };
  numberOfArticles = 7;
  componentDidMount() {
    this.fetchData();
  }

  fetchData(pageNumber = 1) {
    fetch(`https://api.realworld.io/api/articles?limit=7&offset=${pageNumber}`)
      .then((res) => res.json())
      .then((data) => {
        let tagList = [];
        data.articles.forEach(article => {
          tagList = tagList.concat(article.tagList);          
        })
        tagList = Array.from(new Set(tagList));
        this.setState({ data, tagList });
      });
  }

  handlePagination(pageNumber) {
    this.fetchData(pageNumber);
  }
  render() {
    if (this.state.data) {
      let { articles, articlesCount } = this.state.data;
      let pages = Math.ceil(articlesCount/this.numberOfArticles);
            
      return (
        <>
          <Navigation />
          <Hero />
          <div className="tab-section">
          <span className="tab">Global Feed</span>
          <span className="special-tab">#implementation</span>
          </div>
          <div className="flex align-start">
          <main>
          {articles.map(article => {
            return (
              <div className="article" key={article.slug}>
              <div className="flex">
              <h3 className='author'>{article.author.username}</h3>
              <h3 className='createdAt'>{article.createdAt}</h3>
              </div>
              <h2 className='title'>{article.title}</h2>
              <p className='description'>{article.description}</p>
              <div className="flex">
              <div>💚 <span className="likes">0</span></div>
              <button className='readMore'>Read More</button>
              </div>
              </div>
            )
          })}
          </main>
          <aside className="tagList flex flex-wrap  justify-start">
            {this.state.tagList.map(tag => <div className='tag' key={tag}>{tag}</div>)}
          </aside>
          </div>
          <div className="pagination">        
            {
              Array.from({length: pages}, (v,i) => i + 1).map(page => <span className="page" key={page} onClick={() => this.handlePagination(page)}>{page}</span>)
            }
          </div>
        </>
      );
    }
    return (
      <>
        <Navigation />
        <Hero />
        <Loader />
      </>
    );
  }
}

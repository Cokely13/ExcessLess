import React from 'react'
import { connect } from 'react-redux'
import Graph from './Graph'
import Graph2 from './Graph2'

/**
 * COMPONENT
 */
export const Home1 = (props) => {
  const { username } = props

  return (
    <div>
      <header>
        <div className="logo">
          <a href="#">
            <img src="logo.png" alt="My Blog" />
          </a>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <h1>My Blog</h1>

      {/* <div className="graph"> */}
      <Graph/>
      {/* </div>
      <div className="graph"> */}
      <Graph2/>
      {/* </div> */}
      </section>
      <main>

        <section className="blog-list">

          <article className="blog-post">
            <img src="post1.jpg" alt="Blog Post Image" />
            <h2>
              <a href="#">Lorem ipsum dolor sit amet</a>
            </h2>
            <p className="blog-meta">Posted on May 1, 2023 by John Doe</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              semper interdum nisl. In hendrerit mi sit amet quam bibendum
              commodo. Fusce ut lacinia odio. Etiam molestie enim ut nisi
              sagittis, vel lacinia nulla laoreet.
            </p>
          </article>
          {/* Repeat the article element to add more blog posts */}
        </section>
      </main>

      <footer>
        <p>&copy; 2023 My Blog</p>
      </footer>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  }
}

export default connect(mapState)(Home1)

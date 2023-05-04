// import React from 'react'
// import {connect} from 'react-redux'
// import Graph from './Graph'

// /**
//  * COMPONENT
//  */
// export const Home = props => {
//   const {username} = props

//   return (


// <div class="jumbotron">
//   <h1 class="display-4">Welcome, {username}</h1>
//   <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
//   <hr class="my-4"/>
//   <Graph/>
//   <p class="lead">
//     <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
//   </p>
// </div>

//   )
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     username: state.auth.username
//   }
// }

// export default connect(mapState)(Home)

import React from 'react';
import { connect } from 'react-redux';
import Graph from './Graph';

const Home = props => {
  const { username } = props;

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <a href="#"><img src="logo.png" alt="Car Service" /></a>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="banner">
        <div className="banner-content">
          <h1>Welcome to Car Service</h1>
          <p>Get your car serviced by the best mechanics in town</p>
          <a href="#" className="btn btn-primary btn-lg">Book Now</a>
        </div>
      </section>

      <section className="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <img src="oil-change.jpg" alt="Oil Change" />
            <h3>Oil Change</h3>
            <p>Regular oil changes can help prolong the life of your engine.</p>
            <a href="#" className="btn btn-primary">Book Now</a>
          </div>
          {/* Repeat the service-card div to add more services */}
        </div>
      </section>

      <section className="reviews">
        <h2>Customer Reviews</h2>
        <div className="review-card">
          <div className="review-text">
            <p>Great service! The mechanics were very knowledgeable and efficient. I would definitely recommend Car Service to anyone.</p>
          </div>
          <div className="review-author">
            <p>- John Doe</p>
          </div>
        </div>
        {/* Repeat the review-card div to add more reviews */}
      </section>

      <section className="contact">
        <h2>Contact Us</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message"></textarea>

          <button type="submit" className="btn btn-primary">Send</button>
        </form>
      </section>

      <footer className="footer">
        <p>&copy; 2023 Car Service</p>
      </footer>
    </div>
  );
};

const mapState = state => {
  return {
    username: state.auth.username
  };
};

export default connect(mapState)(Home);

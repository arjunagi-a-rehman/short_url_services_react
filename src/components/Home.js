import React from 'react';

function Home() {
  return (
    <section id="Home" className="container text-dark Home-page">
      <div className="text-center">
        <h1>Short URL Services (SuS9)</h1>
      </div>
      <br/><br/>
      <p>
        Unleash the power of your URLs with SuS9! Ever had a lengthy URL that's a hassle to share? With SuS9, you can effortlessly shorten URLs, gaining full control over their lifespan. Set the expiration duration, manage accessibility, and even track the engagement. Wondering who's clicking? SuS9's analytics reveal the geographical origins of your audience. Best of all, it's a free service, entirely devoid of advertisements. Simplify, control, and analyze your URLs with SuS9 today!
      </p>
      <div className="text-center">
        <button type="button" className="btn btn-primary"><a className="text-white" href="/Generate">Generate</a></button>
      </div>
    </section>
  );
}

export default Home;

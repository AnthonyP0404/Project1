function Home() {
  return (
    <div id="pageComponent">
      <div id="homePage" data-testid="home">
        <h1 id="pageHeading">
          {" "}
          <b> Home Page </b>{" "}
        </h1>
        <p style={{ color: "white" }}>
          {" "}
          Please navigate to one of the pages by using the navigation bar above.{" "}
        </p>
      </div>
    </div>
  );
}

export default Home;

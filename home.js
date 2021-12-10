/* const displayMovies = (res) => {
  const movies = document.querySelector(".scifi");
  const picture = `
  ${data
    .map(
      (movie) => `
  <img src="${movie.imageUrl}" class="img-fluid section-img image" alt="" />
  `
    )
    .join("")}
  `;
  movies.innerHTML = picture;
}; */

const getMovies = async () => {
  const galleries = document.querySelector(".galleries");
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/movies",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyODk0ZGFhY2FhMjAwMTU1MmExNjMiLCJpYXQiOjE2Mzg5NzQwMzgsImV4cCI6MTY0MDE4MzYzOH0.US5LnaBA-naCQfgPfcQYfFn8yEoEbO9Y468H2YPq7kw",
        },
      }
    );
    if (response.ok) {
      const categories = await response.json();
      console.log(categories);
      const allMovies = await Promise.all(
        categories.map(async (genres) => {
          const result = await fetch(
            " https://striveschool-api.herokuapp.com/api/movies/" + genres,
            {
              method: "GET",
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyODk0ZGFhY2FhMjAwMTU1MmExNjMiLCJpYXQiOjE2Mzg5NzQwMzgsImV4cCI6MTY0MDE4MzYzOH0.US5LnaBA-naCQfgPfcQYfFn8yEoEbO9Y468H2YPq7kw",
              },
            }
          );
          if (result.ok) {
            const res = await result.json();
            console.log(res);
            return res;
          }
        })
      );
      console.log(allMovies);

      allMovies.map((m) => {
        const group = [];
        let i = 0;
        while (i < m.length) {
          group.push(m.slice(i, (i += 6)));
        }
        console.log("group", group);
        const gallery = `
          <div class=""movie-gallery m-2>
          <h5>${m[0].genres}</h5>
          <div class="carousel slide" data-bs-ride="carousel" id="${
            m[0].genres
          }">
            <div class="carousel-inner">
            ${group
              .map((g, i) => {
                `
            <div class="carousel-item ${i === 0 ? "active" : ""}">
            <div class="movie-row">
            <div class="row">
            ${g
              .map((movie) => {
                ` <div class="col-md-2">
                <img src=${movie.imageUrl} class="img-fluid section-img image" alt="" />
                </div>
                `;
                return movie;
              })
              .join("")};
            </div>
            </div>
            </div>
            `;
                return g;
              })
              .join("")}
           
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#${
              m[0].genres
            }" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#${
              m[0].genres
            }" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
          </div>
          </div>
          `;
        galleries.innerHTML = gallery;
        return m;
      });
    }
  } catch (err) {
    console.log(err);
  }
};
window.onload = () => {
  getMovies();
};

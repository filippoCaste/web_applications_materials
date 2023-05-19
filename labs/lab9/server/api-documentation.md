# API documentation
Starting from port `3000` on localhost.
## Films
- `/api/films`: retrieves all available films stored on db;
  - ```http
    GET /api/films
    Response: all films as json
    Error:
    ```
- `/api/films/:filterName`: filter films according to the filter id;
  - ```http
    GET /api/films/:filterName
    Response: filtered (locally) films list
    Error:
    ```
- `/api/films/filmId/:filmId`: retrieve a film, given its id;
  - ```http
    GET /api/films/filmId/:filmId
    Response: retrieve the requested film
    Error:
    ```
- `/api/create`: add new film to database (id is automatically assigned by db);
  - ```http
    POST /api/create
    Request: title, isFavorite, date, rating
    Error:
    ```
- `/api/update/:filmId`: update an existing film;
  - ```http
    PUT /api/update/:filmId
    Request: title, isFavorite, date, rating or any combination
    Error:
    ```
- `/api/update/:filmId/rate`: update rate field of a specific film;
  - ```http
    PUT /api/update/:filmId/rate
    Request: changed rate
    Error:
    ```
- `/api/update/:filmId/isFavorite`: set as favorite or not, a given film;
  - ```http
    PUT /api/update/:filmId/isFavorite
    Request: isFavorite
    Error:
    ```
- `/api/delete/:filmId`: removes from db a film.
  - ```http
    DELETE /api/delete/:filmId
    Error:
    ```


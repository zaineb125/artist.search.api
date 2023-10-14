# Artist.show API

## Overview

This project is an Express-based Node.js application developed using TypeScript. It leverages the Last.fm API's artist.search endpoint to search for music artists by name. The application allows users to search for artists by name, download artists data in CSV format, and generate a JSON file containing a list of random artist names.

## EndPoints

The application exposes the following APIs:

1. Search Artist API:

    **URL:** `/api/artist/search`
    <br />
    **Description:** Users can utilize this endpoint to search for a specific artist. The endpoint accepts an artist name, limit, and page as parameters, returning a list of artists. In case the Last.fm API response is empty, the endpoint retrieves random items from the `artistNames.json` file.

2. Generate JSON API:

    **URL:** `/api/artist/generateJson` 
    <br />
    **Description:** This endpoint generates a JSON file named `artistNames.json` containing random artists' names. The file is utilized as a backup data source when the Last.fm API returns an empty list in certain scenarios.

3. Download CSV API:

    **URL:** `/api/artist/csvDownload` 
    <br />
    **Description:** This endpoint behaves similarly to the /artist/search endpoint, enabling users to search for artists. In addition to the artist name, limit, and page parameters, this endpoint also accepts a file name. It returns a CSV file containing the list of artists under the provided file name and the file is automatically downloaded .

## Installation

1. Clone the repository using the following command:
```
   git clone <repository_url>
```
2. Navigate to the project directory and install dependencies:
```
   npm install
```
3. Set up your environment variables in a .env file based on the provided .env.example.

## Usage

  Run the application with the following command in the development environment: 
  ```
    npm run dev
 ```

## Testing

The project's test suite is built using the Jest testing framework. To run the tests, use the following command:
```
  npm run test
```

## Technologies Used

  * Node.js
  * Express
  * Axios
  * Jest (for testing)
  * Last.fm API

## Architecture
```
├── src
│ ├── api
│ │   ├── controllers
│ │   ├── middlewares         
│ │   ├── models      
│ │   ├── outputs
│ │   ├── repositories
│ │   ├── routes
│ │   ├── services      
│ ├── utils
│ │   ├── constants
│ │   ├── errors 
│ └── index.ts
├── tests

```
  
## Contributors
zeineb.kefi@insat.ucar.tn

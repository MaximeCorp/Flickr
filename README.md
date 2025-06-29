## How to Launch the Project

This guide provides instructions to set up and run the application in a local development environment.

### Prerequisites

You must have the following software installed on your machine:

- **Node.js** (version 18.13.0 or higher is recommended)
- **npm** (Node Package Manager, which comes with Node.js)
- **Angular CLI** (You can install it globally with `npm install -g @angular/cli`)

### Installation

1.  **Install all project dependencies**:
    This command reads the `package.json` file and installs all required packages.
    ```bash
    npm install
    ```

### Running the Development Server

1.  **Start the local development server**:
    Run the `serve` script, which uses the Angular CLI to serve the application.

    ```bash
    ng serve
    ```

2.  **Access the application**:
    Open your web browser and navigate to `http://localhost:4200`. The application will automatically reload if you change any of the source files.

**Note:** The application is configured to use local mock data and does **not** require a Flickr API key to run.

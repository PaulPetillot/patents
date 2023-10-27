## Getting Started

To kickstart your development process, follow the steps below:

1. **Install Dependencies**:
   Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

2. **Start Development Server**:
   Launch the development server using the command below:
   ```bash
   npm run dev
   ```

## Project Structure

Here's an overview of the file organization and notable pieces of the codebase:

- **Common Components** (`src/components`):
  Components shared across multiple pages or anticipated to be shared in the future are housed here.

- **Context Setup** (`src/context`):
  A context is set up to retain fetched patents and search queries throughout the app's lifecycle.

- **Layout Directory** (`Layout` folder):
  This folder hosts the webapp's layout components including metadata, footer, main section, and theme interactions.

- **Pages** (`src/pages`):
  All pages reside in this directory. Each page has a corresponding component folder for page-specific components and a file named after the page where the page structure is assembled.

- **Routing** (`src/router`):
  Utilizing `react-router-dom` for route management, all routes are defined in this folder.

- **Custom Hooks**:
  Two custom hooks are crafted for specific purposes:

  1. `useSearch`: This hook facilitates fetching patents based on provided search terms and dates. It incrementally loads patents using the `start` and `rows` parameters, ensuring only the necessary number of patents are fetched to avoid errors.
  2. `usePatent`: This hook provides a clean and easy way to interact with the `useSearch` hook residing in the context.

- **Interface**:
  ChakraUI is utilized for the interface, offering a variety of well-built and tested components.

## Challenge

One of the main challenges faced was managing the display of a massive amount of data that accumulates with each request for patents. Multiple solutions were considered, such as implementing pagination or rendering only the necessary patents. The chosen solution was the latter, employing `react-window` to render only the patents visible on the screen along with a few above and below, thus keeping the DOM lightweight and preserving performance. This choice necessitated some compromises, like setting a fixed height for each displayed patent, but it's deemed more practical than navigating through pages using next or previous buttons to view more patents.

## Interactions

The website facilitates various interactions:

1. **Search Functionality**:

   - Conduct a search using keywords and optionally specify date ranges to narrow down the results.
   - If there are no matches, '0 results' will be displayed.

2. **Patent Details**:

   - Click on a patent to view its full details on a separate page.
   - Large texts truncated with '...' can be expanded to reveal full content by clicking on them, and can be collapsed back by clicking again.

3. **Navigation**:

   - Navigate back to the search page using the back button on the patent details page, or head to the home page (which is the search page) by clicking on the app name in the navigation bar.

4. **Downloads**:

   - Download patent applications and archive data via buttons available on the results or patent page.

5. **Theme Toggle**:
   - If the white theme is straining to your eyes, switch to dark mode by clicking the button at the top right corner.

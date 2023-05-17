searchTextFilesInFolder("posts");





function searchTextFilesInFolder(folderPath) {
  // Create an empty array to store the text file paths
  const textFiles = [];

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Define the onload event handler
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Parse the response as HTML
      const responseDocument = new DOMParser().parseFromString(xhr.responseText, "text/html");

      // Find all the <a> elements in the response
      const links = responseDocument.getElementsByTagName("a");

      // Iterate over the links and check if they have a .txt extension
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const href = link.getAttribute("href");
        if (href.endsWith(".txt")) {
          // Construct the absolute file path
          const filePath = folderPath + "/" + href;
          textFiles.push(filePath);
        }
      }

      // Display the list of text file paths
      console.log(textFiles);
    } else {
      console.error("Error loading folder:", xhr.status);
    }
  };

  // Send a GET request to the folder URL
  xhr.open("GET", folderPath);
  xhr.send();
}











function searchMarkdownFilesInFolder(folderPath) {
  // Create an empty array to store the markdown file paths
  const markdownFiles = [];

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Define the onload event handler
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Parse the response as HTML
      const responseDocument = new DOMParser().parseFromString(xhr.responseText, "text/html");

      // Find all the <a> elements in the response
      const links = responseDocument.getElementsByTagName("a");

      // Iterate over the links and check if they have a .md or .markdown extension
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const href = link.getAttribute("href");
        if (href.endsWith(".md") || href.endsWith(".markdown")) {
          // Construct the absolute file path
          const filePath = folderPath + "/" + href;
          markdownFiles.push(filePath);
        }
      }

      // Display the list of markdown file paths
      console.log(markdownFiles);
    } else {
      console.error("Error loading folder:", xhr.status);
    }
  };

  // Send a GET request to the folder URL
  xhr.open("GET", folderPath);
  xhr.send();
}


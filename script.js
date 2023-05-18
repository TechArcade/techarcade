$("#app").load("/template/nav.html");

function getTextFilesFromFolder() {
  const folderPath = "posts/";
  const textFiles = [];

  $.ajax({
    url: folderPath,
    success: function (data) {
      $(data)
        .find("a")
        .each(function () {
          const href = $(this).attr("href");
          if (href.endsWith(".txt")) {
            const filePath = href;

            // Fetch the text file
            $.get(filePath, function (text) {
              textFiles.push(text);
            });
          }
        });
    },
    error: function (error) {
      console.error("Error loading folder:", error);
    },
  });

  return textFiles;
}

function loadPosts() {
  $("#posts").html(markdown(ein.value));
}

getTextFilesFromFolder();

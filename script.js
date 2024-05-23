var postList = posts;

function extractHTMLInfo() {
  console.log(postList);

     postList = sextractHTMLInfo(postList);

Featured(postList[0]);
Highlight(postList[1]);
Highlight(postList[2]);
loadPosts(postList);
}

extractHTMLInfo();
function sextractHTMLInfo(htmlList) {
  const infoList = [];

  for (let i = 0; i < htmlList.length; i++) {
    
    const html = markdown(htmlList[i]);
    const doc = new DOMParser().parseFromString(html, "text/html");
    const img = doc.querySelector("img");
    console.log(img);
    const h1 = doc.querySelector("h1");
    const p = doc.querySelector("p:nth-of-type(3)");

    const small = doc.querySelector("h6");

    const id = i;
    const title = h1 ? h1.textContent : "";
    const imgSrc = img ? img.getAttribute("src") : "";
    const resume = p ? p.textContent : "";
    const category = small ? small.textContent : "";
    const content = html;

    const info = { id, title, img: imgSrc, resume, category, content };
    infoList.push(info);
  }

  return infoList;
}


function loadPosts(list) {
  for (let i = 3; i < list.length; i++) {
    const e = list[i];
    $("#posts").append(Post(e));
  }
}

function Post(e) {
  const post =
    '<div class="col-md-4 "><div class="card mb-4 box-shadow"><img  class="card-img-top" src="' +
    e.img +
    '" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block" src=""    data-holder-rendered="true"/><div class="card-body"><h5 class="card-title">' +
    e.title +
    '</h5><p class="card-text resume">' +
    e.resume +
    '</p><div class="d-flex justify-content-between align-items-center"><div  class="text-white font-weight-bold">Continue reading...</div> <small class="text-muted">' +
    e.category +
    '</small></div></div><div onclick="toggleElements(event, ' +
    e.id +
    ')"  class="post-link"></div></div></div>';
  return post;
}
function Featured(e) {
  const template =
    '<div class="jumbotron p-3 p-md-5 text-white rounded bg-dark" style="background-image: url(' +
    e.img +
    '); background-repeat: no-repeat;    background-size: cover;background-position: center;">  <div class="col-md-6 px-0 featured" onclick="toggleElements(event, ' +
    e.id +
    ')">    <h1 class="display-4 font-italic">' +
    e.title +
    '</h1>    <p class="lead my-3 resume">' +
    e.resume +
    '</p>    <p class="lead mb-0">      <a  class="text-white font-weight-bold">Continue reading...</a>   <small class="text-muted">' +
    e.category +
    "</small> </p>  </div></div>";
  $("#featured").append(template);
}
function Highlight(e) {
  const template =
    '<div class="col-md-6 ">  <div class="card flex-md-row mb-4 box-shadow h-md-250 ">    <div class="card-body d-flex flex-column align-items-start">      <strong class="d-inline-block mb-2 text-primary">' +
    e.category +
    '</strong>      <h5 class="mb-0">        <a class="text-dark" href="#">' +
    e.title +
    '</a>      </h5>      <div class="mb-1 text-muted">Nov 12</div>      <p class="card-text mb-auto resume">' +
    e.resume +
    '</p>      <a >Continue reading</a>    </div>    <img      class="card-img-right flex-auto d-none d-md-block"      data-src="holder.js/200x250?theme=thumb"      alt="Thumbnail [200x250]"      style="width: 200px; height: 250px"      src="' +
    e.img +
    '"      data-holder-rendered="true"    /><div onclick="toggleElements(event, ' +
    e.id +
    ')"  class="post-link"></div>  </div></div>';
  $("#highlight").append(template);
}


function loadCategory(category) {
  $("#category-posts").html("");
  for (let i = 0; i < postList.length; i++) {
    const e = postList[i];
    if (category == e.category) {
      $("#category-posts").append(Post(e));
    }
  }
}

function toggleElements(event, id) {
  event.preventDefault(); // Prevent any default behavior of the event

  const homeElement = document.getElementById("home");

  const category = document.getElementById("category");
  const categoryPosts = document.getElementById("category-posts");

  const pageElement = document.getElementById("page");
  const pageContent = document.getElementById("content");

  if (id === -1) {
    close();
    homeElement.style.display = "block"; // Show the home element
  } else if (id === -2) {
    close();
    loadCategory("Ideas");
    category.style.display = "block"; // Hide the page element
  } else if (id === -3) {
    close();
    loadCategory("Games");
    category.style.display = "block"; // Hide the page element
  } else if (id === -4) {
    close();
    loadCategory("Tech");
    category.style.display = "block"; // Hide the page element
  } else {
    console.log(id);
    pageContent.innerHTML = postList[id].content;
    close();
    pageElement.style.display = "block"; // Show the page element
  }

  function close() {
    homeElement.style.display = "none";
    category.style.display = "none";
    pageElement.style.display = "none";
  }
}



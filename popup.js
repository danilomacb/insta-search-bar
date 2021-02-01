const searchBar = document.getElementById("searchBar");
const showUsers = document.getElementById("showUsers");
const showHashtags = document.getElementById("showHashtags");
const showPlaces = document.getElementById("showPlaces");
const contents = document.getElementById("contents");
const up = document.getElementById("up");

searchBar.addEventListener("keyup", handleSubmit);

async function handleSubmit(e) {
  if (e.key === "Enter") {
    let res;
    try {
      res = await fetch(
        `https://www.instagram.com/web/search/topsearch/?context=blended&query=${e.target.value}&rank_token=0.30655680868367186&include_reel=true`
      );
    } catch (err) {
      console.error(err);
      return;
    }

    const jsonRes = await res.json();

    let contentDisplayed = "";

    if (jsonRes.users && showUsers.checked) {
      jsonRes.users.map(
        (user) =>
          (contentDisplayed += `
            <a href="https://www.instagram.com/${user.user.username}" class="content" target="_blank">
              <div class="contentTitle">
                ${user.user.full_name}
              </div>
              <img src="${user.user.profile_pic_url}" />
              <div class="username">
                @${user.user.username}
                ${user.user.is_verified ? `<img src="./images/icons/verified.svg" class="verified"/>` : ""}
              </div>
            </a>
          `)
      );
    }

    if (jsonRes.hashtags && showHashtags.checked) {
      jsonRes.hashtags.map(
        (hashtag) =>
          (contentDisplayed += `
            <a href="https://www.instagram.com/explore/tags/${hashtag.hashtag.name}" class="content" target="_blank">
              <div class="contentTitle">#${hashtag.hashtag.name}</div>
              <img src="./images/icons/hashtag.png" />
              <div>${hashtag.hashtag.search_result_subtitle}</div>
            </a>
          `)
      );
    }

    if (jsonRes.places && showPlaces.checked) {
      jsonRes.places.map((place) => {
        contentDisplayed += `
          <a href="https://www.instagram.com/explore/locations/${place.place.location.pk}/${place.place.slug}" class="content" target="_blank"">
            <div class="contentTitle">${place.place.title}</div>
            <img src="./images/icons/place.png" />
          </a>
        `;
      });
    }

    contents.innerHTML = contentDisplayed;

    if (contents.innerHTML) {
      up.style.display = "block";
    } else {
      up.style.display = "none";
    }
  }
}

up.addEventListener("click", () =>
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
);

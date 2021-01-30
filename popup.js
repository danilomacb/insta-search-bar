const searchBarInput = document.getElementById("searchBar");
const contents = document.getElementById("contents");

searchBarInput.addEventListener("keyup", handleSubmit);

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

    if (jsonRes.users) {
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

    if (jsonRes.hashtags) {
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

    if (jsonRes.places) {
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
  }
}

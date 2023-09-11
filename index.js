window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  let emojis = [];
  const getRandomEmojiFromKey = (emojiKeyList) => emojis[emojiKeyList[getRandomInt(0, emojiKeyList.length)]];

  function onHover(e) {
    let target = e.target.innerText.trim().replace(/[.,-]/g,'');
    const keywords = target.split(" ");
    keywords.forEach((word, index) => {
      if (!word) return;
      word = word.toLowerCase();
      const found = Object.keys(emojis).filter(key => {return key.startsWith(word) || key.includes(word)});

      if (found.length > 0) e.target.innerText = getRandomEmojiFromKey(found)
    });
  }
  

  function displayPoem(p) {
    if (!p) return;
    const content = document.getElementById("content");
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    title.innerHTML = p.title;
    author.innerHTML = p.author;
    p.poem.split("\n").forEach((line) => {
      line.split(" ").forEach((word) => {
        const text = document.createElement("span");
        text.innerHTML += (word + `&nbsp;`);
        text.addEventListener("mouseover", onHover);
        content.appendChild(text);
      }) 
    })
  }

  // data from poetry foundation dataset found on kaggle -- https://www.kaggle.com/datasets/tgdivy/poetry-foundation-poems
  fetch("https://annaylin.com/100-days/ghosts/ghosts.json").then((r) => r.json()).then((result) => {
    displayPoem(result[getRandomInt(0, result.length)]);
  });
  fetch("emojis.json").then((r) => r.json()).then((result) => emojis = result);
});
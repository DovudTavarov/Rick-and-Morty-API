const nameBtn = document.querySelector(".btn-cont");
const profList = document.querySelector(".prof-cont");

const url = "https://rickandmortyapi.com/api/character";
fetch(url)
  .then((rep) => rep.json())
  .then((data) => data.results)
  .then((results) => {
    function getCharNames() {
      let newArray = ["All Characters"];
      for (let char of results) {
        if (!newArray.includes(char.name)) {
          newArray.push(char.name);
        }
      }
      return newArray;
    }

    const allCharName = getCharNames();

    function createNameBtn() {
      for (let name of allCharName) {
        const btn = document.createElement("button");
        btn.addEventListener("click", () => nameBtnClickFn(name));
        btn.innerHTML = name;
        nameBtn.appendChild(btn);
      }
    }

    function nameBtnClickFn(charName) {
      const filteredName = [];
      for (let char of results) {
        if (char.name === charName) {
          filteredName.push(char);
        }
      }
      if (charName === "All Characters") {
        filteredCharName = results;
        createProfList(results);
      } else {
        filteredCharName = filteredName;
        createProfList(filteredName);
      }
    }

    createNameBtn();

    let filteredCharName = results;

    createProfList(filteredCharName);

    function createProfList(filteredCharName) {
      profList.innerHTML = "";
      for (let char of filteredCharName) {
        const charTag = `<img
          class="prof-img"
          src="${char.image}"
          alt=""
        />
        <h1>Name: ${char.name}</h1>
        <h3>Status: ${char.status}</h3>
        <h3>Species: ${char.species}</h3>
        <h3>Gender: ${char.gender}</h3>`;
        profList.innerHTML += charTag;
      }
    }
  });

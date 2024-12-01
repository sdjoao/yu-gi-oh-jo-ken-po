
const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites:{
        avatar: document.getElementById("card-img"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    playerSides: {
        player1: "player-cards",
        player1BOX: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBOX: document.querySelector("#computer-cards"),
    },
    actions: {
        button: document.getElementById("next-duel"),
    },
    curiosities: {
        1: "Curiosidade sobre Yu-Gi-Oh: O criador de Yu-Gi-Oh! é Kazuki Takahashi.",
        2: "Curiosidade sobre Yu-Gi-Oh: O anime começou como um mangá publicado em 1996.",
        3: "Curiosidade sobre Yu-Gi-Oh: Blue-Eyes White Dragon é uma das cartas mais icônicas.",
        4: "Curiosidade sobre Yu-Gi-Oh: O jogo de cartas real foi lançado em 1999.",
        5: "Curiosidade sobre Yu-Gi-Oh: O primeiro anime é chamado Yu-Gi-Oh! Duel Monsters.",
        6: "Curiosidade sobre Yu-Gi-Oh: Exodia é uma das primeiras cartas a vencer instantaneamente.",
        7: "Curiosidade sobre Yu-Gi-Oh: Yu-Gi-Oh! significa 'Rei dos Jogos' em japonês.",
        8: "Curiosidade sobre Yu-Gi-Oh: Dark Magician é a carta assinatura de Yugi.",
        9: "Curiosidade sobre Yu-Gi-Oh: Seto Kaiba foi baseado em jogadores competitivos reais.",
        10: "Curiosidade sobre Yu-Gi-Oh: Pegasus criou o jogo no enredo da série.",
        11: "Curiosidade sobre Yu-Gi-Oh: As cartas no mangá tinham designs diferentes das reais.",
        12: "Curiosidade sobre Yu-Gi-Oh: A série original tinha tons muito mais sombrios.",
        13: "Curiosidade sobre Yu-Gi-Oh: Yu-Gi-Oh! GX é a primeira série spin-off.",
        14: "Curiosidade sobre Yu-Gi-Oh: Elemental Heroes são populares em Yu-Gi-Oh! GX.",
        15: "Curiosidade sobre Yu-Gi-Oh: Kaiba construiu uma arena de duelo na série.",
        16: "Curiosidade sobre Yu-Gi-Oh: Os discos de duelo foram criados pela KaibaCorp.",
        17: "Curiosidade sobre Yu-Gi-Oh: A carta mais rara já vendida foi o Tyler the Great Warrior.",
        18: "Curiosidade sobre Yu-Gi-Oh: Yugi nunca perde um duelo importante no anime.",
        19: "Curiosidade sobre Yu-Gi-Oh: Existem mais de 11 mil cartas diferentes no jogo.",
        20: "Curiosidade sobre Yu-Gi-Oh: O mangá foi inspirado em jogos de tabuleiro e RPGs.",
    },
};

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
}

const pathImages = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf:[1],
        LoseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf:[2],
        LoseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf:[0],
        LoseOf: [1],
    },
]

async function startCuriosities(){
    let curiosities = document.getElementById("curiosities");
    const randomIndex = Math.floor(Math.random() * 20) + 1;
    const randomCuriosity = state.curiosities[randomIndex];
    curiosities.innerText = randomCuriosity;
}

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function creatCardImage(IdCard, fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", `${pathImages}card-back.png`);
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");



    if(fieldSide === playerSides.player1){
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(IdCard);
        });

        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
    }

    

    return cardImage;
}

async function removeAllCardsImages(){
     let { computerBOX, player1BOX } = state.playerSides;
     let imgElements = computerBOX.querySelectorAll("img");
     imgElements.forEach((img) => img.remove());

     cards = state.playerSides.player1BOX;
     imgElements = player1BOX.querySelectorAll("img");
     imgElements.forEach((img) => img.remove());
}

async function checkDuelResults(playerCardId, computerCardId){
    let duelResults = "Draw"
    let playerCard = cardData[playerCardId];


    if(playerCard.WinOf.includes(computerCardId)){
        duelResults = "Win";
        state.score.playerScore++;
    }

    if(playerCard.LoseOf.includes(computerCardId)){
        duelResults = "Lose";
        state.score.computerScore++;
    }

    await playAudio(duelResults)
    return duelResults;
}

async function drawButton(text){
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
}

async function updateScore(){
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function setCardsField(cardId){

    await removeAllCardsImages();

    let computerCardId =  await getRandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}

async function drawSelectCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute : " + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide){
    for(let i = 0; i <cardNumbers; i++){
        const randomIdCard = await getRandomCardId(); 
        const cardImage = await creatCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function hiddenCardDetails(){
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
}

async function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
    await hiddenCardDetails();
    startCuriosities();
}

async function playAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    try{
        audio.play();
    }catch{
        
    }
}

function init(){

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    drawCards(5, playerSides.player1)
    drawCards(5, playerSides.computer)

    const bgm = document.getElementById("bgm")
    bgm.volume = 0.1;
    bgm.play();
}

init();


import MarkovChain from 'npm:@hideokamoto/markov-chain-kuromoji'

const text = Deno.readTextFileSync("./Takuya.txt", { encoding: "utf-8" }).toString();
const line = text.replace(/[0-9]{1,2}:[0-9]{2}/g, "_KUGIRI_").split("_KUGIRI_");
console.log(line.length);

let vocabulary = [];

for (let i = 0; i < line.length; i++) {
    vocabulary.push(line[i].split("\t"))[2];
    if (i % 1000 == 0) {
        console.log(Math.floor(i / line.length * 100) + "%");
    }
}

console.log("Done!");

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

const chain = 75;

const index = randomInt(vocabulary.length);
const endex = randomInt(vocabulary.length) + chain;

const vocas = []

for (let i = index; i < endex; i++) {
    vocas.push(vocabulary[i]);
}

vocabulary = null; // free memory

console.log("Gen now...")

const markov = new MarkovChain()
markov.start(8, vocas.join(" ").replaceAll(",", ""))
    .then(data => {
        console.log("Passing");
        console.log("-- Result --");
        console.log(`「 ${data} 」`);
    })

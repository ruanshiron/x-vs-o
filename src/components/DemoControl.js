import React, { useState } from 'react'
import { Card, Button, Space } from 'antd'
import { firestore, functions } from '../firebase'
import { UserModel } from '../model'

function initExampleUser(n) {
  let r = []

  for (let index = 0; index < n; index++) {
    const fn = Math.floor(Math.random() * 120)
    const lnp = Math.floor(Math.random() * 121)
    const lns = Math.floor(Math.random() * 106)
    const displayName = `${nameData.firstName[fn]} ${nameData.lastNamePrefix[lnp]}${nameData.lastNameSuffix[lns]}`

    const points = lnp - lns > 0 ? lnp - lns : 0
    r.push({
      ...UserModel,
      email: `user${index}@example.com`,
      displayName: displayName,
      points: points,
      rank: 0,
      wins: lns,
      losses: lnp,
      matches: lns+lnp,
    })
  }

  return r.sort((a, b) => b.points - a.points)
}

function range(start, stop, step) {
  if (typeof stop == 'undefined') {
    // one param defined
    stop = start;
    start = 0;
  }

  if (typeof step == 'undefined') {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

export default function DemoControl() {
  const [createPending, setCreatePending] = useState(false)
  const [deletePending, setDeletePending] = useState(false)
  const [rankingPending, setRankingPending] = useState(false)

  const createUsers = () => {
    setCreatePending(true)
    Promise.all(
      initExampleUser(100).map((u, i) => {
        return firestore.collection('users').doc(`example${i}`).set({ ...u, rank: i + 1 })
      })
    )
      .then(() => {
        setCreatePending(false)
      })
  }

  const deleteUsers = () => {
    setDeletePending(true)
    Promise.all(
      range(100).map(i => {
        return firestore.collection('users').doc(`example${i}`).delete()
      })
    )
      .then(() => {
        setDeletePending(false)
      })
  }

  const rankingUsers = () => {
    setRankingPending(true)
    var orderRanks = functions.httpsCallable('orderRanks');
    orderRanks().then(function (result) {
      console.log(result)
      setRankingPending(false)
    });
  }

  return (
    <Card style={{ width: '100%' }}>
      <Space>
        <Button loading={createPending} type='primary' onClick={createUsers} >Create 100 example user</Button>
        <Button loading={deletePending} type='primary' onClick={deleteUsers} danger>Deleta all example user</Button>
        <Button loading={rankingPending} type='primary' onClick={rankingUsers} >Ranking all Users</Button>
      </Space>
    </Card>
  )
}

const nameData = {
  "firstName": [
    "nar",
    "An",
    "Alfr",
    "Alvi",
    "Ari",
    "Arinbjorn",
    "Arngeir",
    "Arngrim",
    "Arnfinn",
    "Asgeirr",
    "Askell",
    "Asvald",
    "Bard",
    "Baror",
    "Bersi",
    "Borkr",
    "Bjarni",
    "Bjorn",
    "Brand",
    "Brandr",
    "Cairn",
    "Canute",
    "Dar",
    "Einarr",
    "Eirik",
    "Egill",
    "Engli",
    "Eyvindr",
    "Erik",
    "Eyvind",
    "Finnr",
    "Floki",
    "Fromund",
    "Geirmundr",
    "Geirr",
    "Geri",
    "Gisli",
    "Gizzur",
    "Gjafvaldr",
    "Glumr",
    "Gorm",
    "Grmir",
    "Gunnarr",
    "Guomundr",
    "Hak",
    "Halbjorn",
    "Halfdan",
    "Hallvard",
    "Hamal",
    "Hamundr",
    "Harald",
    "Harek",
    "Hedinn",
    "Helgi",
    "Henrik",
    "Herbjorn",
    "Herjolfr",
    "Hildir",
    "Hogni",
    "Hrani",
    "Ivarr",
    "Hrolf",
    "Jimmy",
    "Jon",
    "Jorund",
    "Kalf",
    "Ketil",
    "Kheldar",
    "Klaengr",
    "Knut",
    "Kolbeinn",
    "Kolli",
    "Kollr",
    "Lambi",
    "Magnus",
    "Moldof",
    "Mursi",
    "Njall",
    "Oddr",
    "Olaf",
    "Orlyg",
    "Ormr",
    "Ornolf",
    "Osvald",
    "Ozurr",
    "Poror",
    "Prondir",
    "Ragi",
    "Ragnvald",
    "Refr",
    "Runolf",
    "Saemund",
    "Siegfried",
    "Sigmundr",
    "Sigurd",
    "Sigvat",
    "Skeggi",
    "Skomlr",
    "Slode",
    "Snorri",
    "Sokkolf",
    "Solvi",
    "Surt",
    "Sven",
    "Thangbrand",
    "Thjodoft",
    "Thorod",
    "Thorgest",
    "Thorvald",
    "Thrain",
    "Throst",
    "Torfi",
    "Torix",
    "Tryfing",
    "Ulf",
    "Valgaror",
    "Vali",
    "Vifil",
    "Vigfus",
    "Vika",
    "Waltheof"
  ],
  "lastNamePrefix": [
    "Aesir",
    "Axe",
    "Battle",
    "Bear",
    "Berg",
    "Biscuit",
    "Black",
    "Blade",
    "Blood",
    "Blue",
    "Boar",
    "Board",
    "Bone",
    "Cage",
    "Cave",
    "Chain",
    "Cloud",
    "Coffee",
    "Code",
    "Death",
    "Dragon",
    "Dwarf",
    "Eel",
    "Egg",
    "Elk",
    "Fire",
    "Fjord",
    "Flame",
    "Flour",
    "Forge",
    "Fork",
    "Fox",
    "Frost",
    "Furnace",
    "Cheese",
    "Giant",
    "Glacier",
    "Goat",
    "God",
    "Gold",
    "Granite",
    "Griffon",
    "Grim",
    "Haggis",
    "Hall",
    "Hamarr",
    "Helm",
    "Horn",
    "Horse",
    "House",
    "Huskarl",
    "Ice",
    "Iceberg",
    "Icicle",
    "Iron",
    "Jarl",
    "Kelp",
    "Kettle",
    "Kraken",
    "Lake",
    "Light",
    "Long",
    "Mace",
    "Mead",
    "Maelstrom",
    "Mail",
    "Mammoth",
    "Man",
    "Many",
    "Mountain",
    "Mutton",
    "Noun",
    "Oath",
    "One",
    "Owl",
    "Pain",
    "Peak",
    "Pine",
    "Pot",
    "Rabbit",
    "Rat",
    "Raven",
    "Red",
    "Refreshingbeverage",
    "Ring",
    "Rime",
    "Rock",
    "Root",
    "Rune",
    "Salmon",
    "Sap",
    "Sea",
    "Seven",
    "Shield",
    "Ship",
    "Silver",
    "Sky",
    "Slush",
    "Smoke",
    "Snow",
    "Spear",
    "Squid",
    "Steam",
    "Stone",
    "Storm",
    "Swine",
    "Sword",
    "Three",
    "Tongue",
    "Torch",
    "Troll",
    "Two",
    "Ulfsark",
    "Umlaut",
    "Unsightly",
    "Valkyrie",
    "Wave",
    "White",
    "Wolf",
    "Woman",
    "Worm",
    "Wyvern"
  ],
  "lastNameSuffix": [
    "admirer",
    "arm",
    "axe",
    "back",
    "bane",
    "baker",
    "basher",
    "beard",
    "bearer",
    "bender",
    "blade",
    "bleeder",
    "blender",
    "blood",
    "boiler",
    "bone",
    "boot",
    "borer",
    "born",
    "bow",
    "breaker",
    "breeder",
    "bringer",
    "brow",
    "builder",
    "chaser",
    "chiller",
    "collar",
    "counter",
    "curser",
    "dancer",
    "deck",
    "dottir",
    "doubter",
    "dreamer",
    "drinker",
    "drowner",
    "ear",
    "eater",
    "face",
    "fearer",
    "friend",
    "foot",
    "fury",
    "gorer",
    "grim",
    "grinder",
    "grower",
    "growth",
    "hacker",
    "hall",
    "hammer",
    "hand",
    "hands",
    "head",
    "hilt",
    "hugger",
    "hunter",
    "killer",
    "leg",
    "licker",
    "liker",
    "lost",
    "lover",
    "maker",
    "mender",
    "minder",
    "miner",
    "mocker",
    "monger",
    "neck",
    "puncher",
    "rage",
    "rhyme",
    "rider",
    "ringer",
    "roarer",
    "roller",
    "sailor",
    "screamer",
    "sequel",
    "server",
    "shield",
    "shoe",
    "singer",
    "skinner",
    "slinger",
    "slugger",
    "sniffer",
    "son",
    "smasher",
    "speaker",
    "stinker",
    "sucker",
    "sword",
    "tail",
    "tamer",
    "taster",
    "thigh",
    "tongue",
    "tosser",
    "tracker",
    "washer",
    "wielder",
    "wing",
    "wisher",
    "wrath"
  ]
}
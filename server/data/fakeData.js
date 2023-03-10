const mongoose = require("mongoose");

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

exports.users = [
  {
    _id: userIds[0],
    username: "Michael1",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    email: "aaaaaaa@gmail.com",
    bio: "Software Engineer",
    profilePic: "p1.jpeg",
    friends: [],
  },
  {
    _id: userIds[1],
    username: "Steve Wilson",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    email: "thataaa@gmail.com",
    bio: "Soccer Player",
    profilePic: "p2.jpeg",
    friends: [],
  },
  {
    _id: userIds[2],
    username: "Moe Alaskan",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    email: "someguy@gmail.com",
    bio: "Jokester",
    profilePic: "p3.jpeg",
    friends: [],
  },
  {
    _id: userIds[3],
    username: "Granny7",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    email: "whatchadoing@gmail.com",
    bio: "Best Grandmother",
    profilePic: "p4.jpeg",
    friends: [],
  },
  {
    _id: userIds[4],
    username: "Jane Doe",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    email: "janedoe@gmail.com",
    bio: "Hacker",
    profilePic: "p5.jpeg",
    friends: [],
  },
  {
    _id: userIds[5],
    username: "HarleyQuinn:)",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    email: "harleyquinn:)@gmail.com",
    bio: "Psycho",
    profilePic: "p6.jpeg",
    friends: [],
  },
  {
    _id: userIds[6],
    username: "Carly Vowel",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    email: "carlyvowel@gmail.com",
    bio: "Nurse",
    profilePic: "p7.jpeg",
    friends: [],
  },
  {
    _id: userIds[7],
    username: "Faker",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    email: "sktt1faker@gmail.com",
    bio: "Pro Gamer",
    profilePic: "p8.jpeg",
    friends: [],
  },
];

exports.posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    username: "Steve Wilson",
    userProfilePic: "p2.jpeg",
    postPic: "post2.jpeg",
    description: "Some really long random description",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
    comments: [
      "random comment - Granny7",
      "another random comment - Jane Doe",
      "yet another random comment - HarleyQuinn:)",
    ],
    timestamp: Date.now(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    username: "Granny7",
    userProfilePic: "p4.jpeg",
    postPic: "post2.jpeg",
    description:
      "Another really long random description. This one is longer than the previous one.",
    likes: new Map([
      [userIds[7], true],
      [userIds[4], true],
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: [
      "one more random comment - HarleyQuinn:)",
      "and another random comment - Faker",
      "no more random comments - Steve Wilson",
      "I lied, one more random comment - Granny7",
    ],
    timestamp: Date.now(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    username: "Jane Doe",
    userProfilePic: "p5.jpeg",
    postPic: "post3.jpeg",
    description:
      "This is the last really long random description. This one is longer than the previous one.",
    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
      [userIds[5], true],
    ]),
    comments: [
      "one more random comment - Steve Wilson",
      "I lied, one more random comment - Faker",
      "I lied again, one more random comment - Carly Vowel",
      "Why am I doing this? = Jane Doe",
      "I'm bored - Jane Doe",
    ],
    timestamp: Date.now(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    username: "HarleyQuinn:)",
    userProfilePic: "p6.jpeg",
    postPic: "post4.jpeg",
    description:
      "This is the last really long random description. This one is longer than the previous one. Man I'm bored. I'm going to keep typing until I run out of things to say.",
    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
    ]),
    comments: [
      "I lied again, one more random comment - Carly Vowel",
      "Why am I doing this? - Steve Wilson",
      "I'm bored - Faker",
      "I'm still bored - Faker",
      "All I want to do is play video games - Faker",
      "I'm going to play video games - Faker",
    ],
    timestamp: Date.now(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    username: "Carly Vowel",
    userProfilePic: "p7.jpeg",
    postPic: "post5.jpeg",
    description:
      "Just a short description. I'm tired of typing. I'm going to play video games now.",
    likes: new Map([
      [userIds[1], true],
      [userIds[3], true],
      [userIds[5], true],
      [userIds[7], true],
    ]),
    comments: [
      "I lied again, one more random comment - Granny7",
      "Why am I doing this? - Faker",
      "Man I'm bored - Jane Doe",
      "What should I do? - Carly Vowel",
      "I'm going to play video games - Steve Wilson",
    ],
    timestamp: Date.now(),
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[7],
    username: "Faker",
    userProfilePic: "p8.jpeg",
    postPic: "post6.jpeg",
    description:
      "For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: [
      "Can I play video games now? - Faker",
      "No let's actually study - HarleyQuinn:)",
      "Never mind, I'm going to play video games - Faker",
      "Stop it. - Jane Doe",
      "Michael, stop it. - Steve Wilson",
    ],
    timestamp: Date.now(),
  },
];

const PUZZLES = [
    // =============================================
    // WARM UP (Levels 1-15) - Easy
    // =============================================
    {
        id: 1,
        type: "multiple",
        category: "Riddle",
        question: "What has keys but no locks?",
        options: ["A piano", "A house", "A computer", "A safe"],
        answer: 0,
        hint: "Think about music...",
        explanation: "A piano has keys (black and white) but no locks."
    },
    {
        id: 2,
        type: "visual",
        visualType: "odd_one_out",
        category: "Visual Puzzle",
        question: "Find the odd one out!",
        grid: ["🐱","🐱","🐱","🐱","🐱","🐱","🐱","🐶","🐱","🐱","🐱","🐱","🐱","🐱","🐱","🐱"],
        cols: 4,
        answer: 7,
        hint: "One of these is not like the others...",
        explanation: "The dog 🐶 is the odd one among all the cats."
    },
    {
        id: 3,
        type: "multiple",
        category: "Trick Question",
        question: "How many months have 28 days?",
        options: ["1", "2", "6", "12"],
        answer: 3,
        hint: "Every month has at least 28 days...",
        explanation: "All 12 months have at least 28 days!"
    },
    {
        id: 4,
        type: "visual",
        visualType: "count_objects",
        category: "Visual Puzzle",
        question: "How many 🍎 apples are in this image?",
        grid: ["🍎","🍊","🍎","🍌","🍎","🍇","🍎","🍊","🍎","🍌","🍎","🍊","🍎","🍎","🍇","🍎","🍊","🍎","🍌","🍎"],
        cols: 5,
        answer: 9,
        hint: "Count carefully, skip the other fruits...",
        explanation: "There are 9 apples hidden among the other fruits."
    },
    {
        id: 5,
        type: "multiple",
        category: "Pattern",
        question: "What comes next: 2, 4, 6, 8, ?",
        options: ["9", "10", "11", "12"],
        answer: 1,
        hint: "Even numbers...",
        explanation: "The pattern is even numbers: 2, 4, 6, 8, 10."
    },
    {
        id: 6,
        type: "visual",
        visualType: "odd_one_out",
        category: "Visual Puzzle",
        question: "Which one is different?",
        grid: ["😀","😀","😀","😀","😀","😀","😀","😀","😀","😁","😀","😀","😀","😀","😀","😀","😀","😀"],
        cols: 6,
        answer: 9,
        hint: "Look at the mouths closely...",
        explanation: "One emoji has a toothy grin 😁 while all others are regular smiles."
    },
    {
        id: 7,
        type: "multiple",
        category: "Trick Question",
        question: "If you have a bowl with six apples and you take away four, how many do YOU have?",
        options: ["2", "4", "6", "0"],
        answer: 1,
        hint: "How many did YOU take?",
        explanation: "You took 4 apples, so YOU have 4."
    },
    {
        id: 8,
        type: "visual",
        visualType: "count_objects",
        category: "Visual Puzzle",
        question: "Count the stars: ⭐🌟✨ how many ✨ (sparkles) are there?",
        grid: ["⭐","🌟","✨","⭐","🌟","✨","✨","⭐","🌟","✨","⭐","✨","🌟","✨","⭐","🌟","✨","⭐","🌟","✨","✨","⭐","🌟","✨","⭐"],
        cols: 5,
        answer: 9,
        hint: "Only count the sparkle emoji ✨...",
        explanation: "There are 9 sparkle emojis in the grid."
    },
    {
        id: 9,
        type: "multiple",
        category: "Math Trick",
        question: "How many times can you subtract 5 from 25?",
        options: ["5 times", "4 times", "1 time", "Infinite"],
        answer: 2,
        hint: "After the first subtraction, it's no longer 25...",
        explanation: "You can only subtract 5 from 25 once. After that, it's 20."
    },
    {
        id: 10,
        type: "visual",
        visualType: "visual_pattern",
        category: "Visual Puzzle",
        question: "What comes next in the pattern?",
        pattern: ["🔴","🔵","🔴","🔵","🔴","🔵","🔴","?"],
        options: ["🔴","🔵","🟢","🟡"],
        answer: 1,
        hint: "Alternating colors...",
        explanation: "The pattern alternates red, blue. Next is blue 🔵."
    },
    {
        id: 11,
        type: "multiple",
        category: "Riddle",
        question: "What can travel around the world while staying in a corner?",
        options: ["A stamp", "An airplane", "The internet", "A satellite"],
        answer: 0,
        hint: "You put it on an envelope...",
        explanation: "A stamp travels around the world on a letter while staying in the corner of the envelope."
    },
    {
        id: 12,
        type: "visual",
        visualType: "visual_pattern",
        category: "Visual Puzzle",
        question: "What comes next?",
        pattern: ["🐱","🐶","🐱","🐶","🐱","🐶","?"],
        options: ["🐱","🐶","🐭","🐰"],
        answer: 1,
        hint: "Cat, dog, cat, dog...",
        explanation: "Alternating cat and dog. Next is dog 🐶."
    },
    {
        id: 13,
        type: "multiple",
        category: "Riddle",
        question: "What has a head and a tail but no body?",
        options: ["A snake", "A coin", "A ghost", "A arrow"],
        answer: 1,
        hint: "You flip it...",
        explanation: "A coin has a head and a tail side but no body."
    },
    {
        id: 14,
        type: "visual",
        visualType: "count_objects",
        category: "Visual Puzzle",
        question: "How many 🐱 cats can you find?",
        grid: ["🐶","🐱","🐶","🐱","🐶","🐱","🐶","🐱","🐶","🐱"],
        cols: 5,
        answer: 5,
        hint: "Count the cats among the dogs...",
        explanation: "There are 5 cats alternating with 5 dogs."
    },
    {
        id: 15,
        type: "multiple",
        category: "Trick Question",
        question: "If there are 3 apples and you take away 2, how many apples do you have?",
        options: ["1", "2", "3", "0"],
        answer: 1,
        hint: "You took 2, so how many do YOU have?",
        explanation: "You have the 2 apples you took away."
    },

    // =============================================
    // GETTING TRICKY (Levels 16-30) - Easy-Medium
    // =============================================
    {
        id: 16,
        type: "visual",
        visualType: "stroop_test",
        category: "Stroop Test",
        question: "What COLOR is the text below? (not what the word says)",
        stroopWord: "BLUE",
        stroopColor: "#e74c3c",
        options: ["Blue","Red","Green","Yellow"],
        answer: 1,
        hint: "Ignore the word, look at the actual ink color!",
        explanation: "The word says 'BLUE' but it's written in RED ink."
    },
    {
        id: 17,
        type: "multiple",
        category: "Logic",
        question: "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?",
        options: ["Yes", "No", "Not enough info", "Sometimes"],
        answer: 0,
        hint: "If A=B and B=C, then A=C...",
        explanation: "Yes. If Bloops ⊆ Razzies ⊆ Lazzies, then Bloops ⊆ Lazzies."
    },
    {
        id: 18,
        type: "visual",
        visualType: "emoji_rebus",
        category: "Emoji Riddle",
        question: "What word do these emojis spell?",
        reEmojis: ["📚","🐛"],
        options: ["Book bug","Bookworm","Read crawl","Page insect"],
        answer: 1,
        hint: "A person who reads a lot...",
        explanation: "📚 (book) + 🐛 (worm) = Bookworm!"
    },
    {
        id: 19,
        type: "multiple",
        category: "Riddle",
        question: "The more you take, the more you leave behind. What am I?",
        options: ["Memories", "Footsteps", "Photographs", "Breaths"],
        answer: 1,
        hint: "Think about walking on sand...",
        explanation: "Footsteps - the more steps you take, the more footprints you leave behind."
    },
    {
        id: 20,
        type: "visual",
        visualType: "find_hidden",
        category: "Visual Puzzle",
        question: "Find the hidden 🌟 star among the ⭐ stars!",
        grid: ["⭐","⭐","⭐","⭐","⭐","⭐","⭐","⭐","⭐","⭐","⭐","⭐","🌟","⭐","⭐","⭐","⭐","⭐","⭐","⭐","⭐","⭐","⭐","⭐"],
        cols: 6,
        answer: 12,
        hint: "It's slightly brighter than the rest...",
        explanation: "The shooting star 🌟 is at position 13 (index 12)!"
    },
    {
        id: 21,
        type: "multiple",
        category: "Pattern",
        question: "What comes next: 1, 1, 2, 3, 5, 8, ?",
        options: ["11", "13", "12", "15"],
        answer: 1,
        hint: "Each number is the sum of the two before it...",
        explanation: "This is the Fibonacci sequence. 5 + 8 = 13."
    },
    {
        id: 22,
        type: "visual",
        visualType: "odd_one_out",
        category: "Visual Puzzle",
        question: "Find the odd letter!",
        grid: ["Q","Q","Q","Q","Q","Q","O","Q","Q","Q","Q","Q"],
        cols: 4,
        answer: 6,
        hint: "They all look round, but one is different...",
        explanation: "The letter O is round with no tail, while Q has a small tail."
    },
    {
        id: 23,
        type: "visual",
        visualType: "emoji_rebus",
        category: "Emoji Riddle",
        question: "What word do these emojis spell?",
        reEmojis: ["🎸","⭐"],
        options: ["Guitar star","Rockstar","Music star","String light"],
        answer: 1,
        hint: "A famous musician...",
        explanation: "🎸 (rock/guitar) + ⭐ (star) = Rockstar!"
    },
    {
        id: 24,
        type: "multiple",
        category: "Logic",
        question: "A bat and a ball cost $1.10 in total. The bat costs $1 more than the ball. How much does the ball cost?",
        options: ["10 cents", "5 cents", "15 cents", "1 cent"],
        answer: 1,
        hint: "The bat is $1 MORE than the ball, not $1...",
        explanation: "If the ball costs 5 cents, the bat costs $1.05. Total = $1.10."
    },
    {
        id: 25,
        type: "visual",
        visualType: "visual_pattern",
        category: "Visual Puzzle",
        question: "What comes next in the pattern?",
        pattern: ["🟢","🟢","🟡","🟢","🟢","🟡","🟢","🟢","?"],
        options: ["🟢","🟡","🔴","🔵"],
        answer: 1,
        hint: "Two greens, then one yellow...",
        explanation: "Pattern: 🟢🟢🟡 repeating. After two greens comes yellow 🟡."
    },
    {
        id: 26,
        type: "multiple",
        category: "Riddle",
        question: "What disappears as soon as you say its name?",
        options: ["A secret", "Silence", "Time", "A ghost"],
        answer: 1,
        hint: "The moment you speak, this is gone...",
        explanation: "Silence disappears the moment you break it by speaking."
    },
    {
        id: 27,
        type: "visual",
        visualType: "count_objects",
        category: "Visual Puzzle",
        question: "Count all the hearts: ❤️ how many ❤️ red hearts?",
        grid: ["❤️","💙","❤️","💚","❤️","💙","❤️","💛","❤️","💙","💚","❤️","💙","❤️","💛","❤️"],
        cols: 4,
        answer: 8,
        hint: "Only count the red ones ❤️...",
        explanation: "There are 8 red hearts mixed with other colored hearts."
    },
    {
        id: 28,
        type: "multiple",
        category: "Wordplay",
        question: "What 5-letter word becomes shorter when you add two letters to it?",
        options: ["Small", "Short", "Tiny", "Brief"],
        answer: 1,
        hint: "The word itself is the answer...",
        explanation: "SHORT becomes SHORTER when you add ER."
    },
    {
        id: 29,
        type: "visual",
        visualType: "find_hidden",
        category: "Visual Puzzle",
        question: "Find the 🐸 frog hiding among the 🐸 frogs! (one is facing a different direction)",
        grid: ["🐸","🐸","🐸","🐸","🐸","🐸","🐸","🐸","🐸","🐸","🐸","🐸","🐸","🐸"],
        cols: 7,
        answer: 9,
        hint: "Look at which way they're facing...",
        explanation: "One frog is flipped horizontally at position 10!"
    },
    {
        id: 30,
        type: "multiple",
        category: "Lateral Thinking",
        question: "A woman shoots her husband, then holds him underwater for 5 minutes, and finally hangs him. But 5 minutes later, they go out and enjoy dinner together. How?",
        options: ["He survived", "It was a game", "She's a photographer", "It was a dream"],
        answer: 2,
        hint: "What kind of shooting doesn't kill?",
        explanation: "She's a photographer. She shot a photo, developed it in water, and hung it up to dry."
    },

    // =============================================
    // BRAIN STRETCH (Levels 31-50) - Medium
    // =============================================
    {
        id: 31,
        type: "visual",
        visualType: "stroop_test",
        category: "Stroop Test",
        question: "What COLOR is this text? (ignore the word)",
        stroopWord: "GREEN",
        stroopColor: "#8e44ad",
        options: ["Green","Purple","Red","Blue"],
        answer: 1,
        hint: "Forget what the word says, look at the ink color...",
        explanation: "The word 'GREEN' is written in PURPLE ink."
    },
    {
        id: 32,
        type: "multiple",
        category: "Math Trick",
        question: "What is the sum of all numbers from 1 to 100?",
        options: ["5000", "5050", "5100", "4950"],
        answer: 1,
        hint: "Pair them up: 1+100, 2+99, 3+98...",
        explanation: "Sum = n(n+1)/2 = 100(101)/2 = 5050."
    },
    {
        id: 33,
        type: "visual",
        visualType: "emoji_rebus",
        category: "Emoji Riddle",
        question: "What word do these emojis spell?",
        reEmojis: ["🌊","🐚"],
        options: ["Ocean shell","Seashell","Wave shell","Beach stone"],
        answer: 1,
        hint: "Found on the beach...",
        explanation: "🌊 (sea) + 🐚 (shell) = Seashell!"
    },
    {
        id: 34,
        type: "multiple",
        category: "Lateral Thinking",
        question: "A man is found dead in a room with 53 bicycles. How did he die?",
        options: ["He was crushed", "He was stabbed", "It was a gambling game", "He fell off one"],
        answer: 2,
        hint: "Bicycles aren't just for riding... Bicycle is a brand name...",
        explanation: "The 53 'bicycles' are actually playing cards (Bicycle is a brand). He was cheating at cards and was killed."
    },
    {
        id: 35,
        type: "visual",
        visualType: "visual_pattern",
        category: "Visual Puzzle",
        question: "What comes next?",
        pattern: ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","?"],
        options: ["7️⃣","8️⃣","9️⃣","🔟"],
        answer: 0,
        hint: "Counting up...",
        explanation: "The numbers go 1, 2, 3, 4, 5, 6, next is 7️⃣."
    },
    {
        id: 36,
        type: "visual",
        visualType: "odd_one_out",
        category: "Visual Puzzle",
        question: "Find the odd number!",
        grid: ["3","3","3","3","3","8","3","3","3","3","3","3","3","3","3","3"],
        cols: 4,
        answer: 5,
        hint: "They all look similar but one number is different...",
        explanation: "The number 8 is among all 3s."
    },
    {
        id: 37,
        type: "multiple",
        category: "Logic",
        question: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
        options: ["100 minutes", "5 minutes", "20 minutes", "1 minute"],
        answer: 1,
        hint: "Each machine makes 1 widget in 5 minutes...",
        explanation: "5 machines make 5 widgets in 5 minutes = 1 machine makes 1 widget in 5 minutes. So 100 machines make 100 widgets in 5 minutes."
    },
    {
        id: 38,
        type: "visual",
        visualType: "find_hidden",
        category: "Visual Puzzle",
        question: "Find the 🔺 triangle among the ◆ diamonds!",
        grid: ["◆","◆","◆","◆","◆","◆","◆","◆","◆","◆","◆","◆","◆","◆","◆","🔺","◆","◆","◆","◆","◆","◆","◆","◆"],
        cols: 6,
        answer: 15,
        hint: "It's pointy in a different way...",
        explanation: "The triangle 🔺 is hiding at position 16!"
    },
    {
        id: 39,
        type: "multiple",
        category: "Riddle",
        question: "What can fill a room but takes up no space?",
        options: ["Air", "Light", "Odor", "Echo"],
        answer: 1,
        hint: "Close your eyes - it's still there if you open the curtains...",
        explanation: "Light fills a room completely but has no physical mass or space."
    },
    {
        id: 40,
        type: "visual",
        visualType: "emoji_rebus",
        category: "Emoji Riddle",
        question: "What word do these emojis spell?",
        reEmojis: ["🐝","🍯"],
        options: ["Bee honey","Honeybee","Sweet sting","Beehive"],
        answer: 1,
        hint: "A busy insect that makes something sweet...",
        explanation: "🍯 (honey) + 🐝 (bee) = Honeybee!"
    },
    {
        id: 41,
        type: "visual",
        visualType: "count_objects",
        category: "Visual Puzzle",
        question: "Count the letters: how many 🅰️ (letter A) symbols?",
        grid: ["🅰️","🅱️","🅰️","🅱️","🅰️","🅱️","🅰️","🅱️","🅰️","🅱️","🅰️","🅱️","🅰️","🅱️","🅰️","🅱️","🅰️","🅱️","🅰️","🅱️"],
        cols: 5,
        answer: 10,
        hint: "Count only the A's...",
        explanation: "There are exactly 10 A symbols alternating with B symbols."
    },
    {
        id: 42,
        type: "multiple",
        category: "Pattern",
        question: "What comes next: O, T, T, F, F, S, S, E, N, ?",
        options: ["T", "E", "N", "T (for Ten)"],
        answer: 0,
        hint: "O = One, T = Two, T = Three...",
        explanation: "First letters of numbers: One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten. Answer is T."
    },
    {
        id: 43,
        type: "visual",
        visualType: "stroop_test",
        category: "Stroop Test",
        question: "What COLOR is this text?",
        stroopWord: "ORANGE",
        stroopColor: "#2ecc71",
        options: ["Orange","Green","Blue","Red"],
        answer: 1,
        hint: "Don't let the word fool you...",
        explanation: "The word 'ORANGE' is written in GREEN ink."
    },
    {
        id: 44,
        type: "multiple",
        category: "Logic",
        question: "You're in a room with 3 light switches. Each controls one of 3 light bulbs in the next room. You can flip switches however you want, but can only enter the next room ONCE. How do you figure out which switch controls which bulb?",
        options: [
            "Can't be done",
            "Turn on switch 1 for 10 min, turn it off, turn on switch 2, enter room",
            "Turn on all switches, enter room",
            "Flip each switch and enter after each"
        ],
        answer: 1,
        hint: "One bulb will be warm even when off...",
        explanation: "Turn on switch 1 for 10 min (bulb gets warm), turn it off. Turn on switch 2. Enter: lit bulb = switch 2, warm but off = switch 1, cold and off = switch 3."
    },
    {
        id: 45,
        type: "visual",
        visualType: "visual_pattern",
        category: "Visual Puzzle",
        question: "What comes next?",
        pattern: ["🌹","🌻","🌷","🌹","🌻","🌷","🌹","🌻","?"],
        options: ["🌹","🌻","🌷","🌸"],
        answer: 2,
        hint: "Three different flowers repeating...",
        explanation: "Pattern: 🌹🌻🌷 repeating. After 🌻 comes 🌷."
    },
    {
        id: 46,
        type: "visual",
        visualType: "emoji_rebus",
        category: "Emoji Riddle",
        question: "What word do these emojis spell?",
        reEmojis: ["🐱","🐟"],
        options: ["Pet fish","Catfish","Fish cat","Aqua cat"],
        answer: 1,
        hint: "Combine the two animal names...",
        explanation: "🐱 (cat) + 🐟 (fish) = Catfish!"
    },
    {
        id: 47,
        type: "multiple",
        category: "Math Trick",
        question: "What is 999 x 7 + 21?",
        options: ["7000", "7014", "6999", "7021"],
        answer: 1,
        hint: "999 = 1000 - 1...",
        explanation: "999 × 7 = (1000-1) × 7 = 7000 - 7 = 6993. Then 6993 + 21 = 7014."
    },
    {
        id: 48,
        type: "multiple",
        category: "Lateral Thinking",
        question: "A truck driver is going the wrong way on a one-way street. A cop sees him but doesn't stop him. Why?",
        options: ["The cop is lazy", "The driver is walking", "It's a police truck", "The cop's car is broken"],
        answer: 1,
        hint: "Is he actually driving?",
        explanation: "The truck driver is walking (on the street), not driving. A truck driver is just his profession."
    },
    {
        id: 49,
        type: "visual",
        visualType: "find_hidden",
        category: "Visual Puzzle",
        question: "Find the 🐼 panda hiding among the 🐻 bears!",
        grid: ["🐻","🐻","🐼","🐻","🐻","🐻","🐻","🐻","🐻","🐼","🐻","🐻","🐻","🐻","🐼","🐻","🐻","🐻"],
        cols: 6,
        answer: 2,
        hint: "Black and white among brown...",
        explanation: "The first panda is at position 3! There are also pandas at positions 10 and 15."
    },
    {
        id: 50,
        type: "multiple",
        category: "Trick Question",
        question: "A plane crashes exactly on the US-Canada border. Where do you bury the survivors?",
        options: ["USA", "Canada", "Both", "You don't bury survivors"],
        answer: 3,
        hint: "Do you bury people who are alive?",
        explanation: "You don't bury survivors! They're alive."
    },

    // =============================================
    // MIND BEND (Levels 51-70) - Medium-Hard
    // =============================================
    {
        id: 51,
        type: "visual",
        visualType: "emoji_rebus",
        category: "Emoji Riddle",
        question: "What phrase do these emojis represent?",
        reEmojis: ["🔥","🏠"],
        options: ["Hot house","Fire home","Firehouse","Burning building"],
        answer: 2,
        hint: "A place where firefighters work...",
        explanation: "🔥 (fire) + 🏠 (house) = Firehouse!"
    },
    {
        id: 52,
        type: "multiple",
        category: "Riddle",
        question: "I am always hungry, I must always be fed. The finger I touch will soon turn red. What am I?",
        options: ["A baby", "Fire", "A piranha", "Acid"],
        answer: 1,
        hint: "It needs fuel and burns you...",
        explanation: "Fire always needs to be fed (fuel) and burns whatever it touches."
    },
    {
        id: 53,
        type: "visual",
        visualType: "stroop_test",
        category: "Stroop Test",
        question: "Quick! What COLOR is the text?",
        stroopWord: "RED",
        stroopColor: "#e67e22",
        options: ["Red","Orange","Yellow","Blue"],
        answer: 1,
        hint: "Ignore what the word says...",
        explanation: "The word 'RED' is written in ORANGE ink."
    },
    {
        id: 54,
        type: "multiple",
        category: "Lateral Thinking",
        question: "A man is found dead in a locked room. There's a puddle of water and shattered glass around him. How did he die?",
        options: ["Poisoned glass", "He slipped on the water", "He was standing on ice that melted", "The window broke and killed him"],
        answer: 2,
        hint: "What was he standing on that could melt?",
        explanation: "He was standing on a block of ice. It melted, he fell, and the glass shattered."
    },
    {
        id: 55,
        type: "visual",
        visualType: "visual_pattern",
        category: "Visual Puzzle",
        question: "Which emoji completes the pattern?",
        pattern: ["🟥","🟧","🟨","🟩","🟦","🟪","?"],
        options: ["⬜","⬛","🟫","🟥"],
        answer: 0,
        hint: "Rainbow order of colors...",
        explanation: "The rainbow color sequence: red, orange, yellow, green, blue, purple, then white ⬜."
    },
    {
        id: 56,
        type: "multiple",
        category: "Wordplay",
        question: "What 10-letter word starts with 'gas'?",
        options: ["Automobile", "Galvanize", "Gasometer", "Astigmat"],
        answer: 3,
        hint: "The answer is also a type of eye condition...",
        explanation: "Astigmat starts with 'gas' - the trick is seeing 'gas' hidden inside the word."
    },
    {
        id: 57,
        type: "visual",
        visualType: "find_hidden",
        category: "Visual Puzzle",
        question: "Find the 🐱 cat among these 🐱 cats! (one is upside down!)",
        grid: ["🐱","🐱","🐱","🐱","🐱","🐱","🐱","🐱","🐱","🐱","🐱","🐱","🐱","🐱","🐱","🐱","🐱","🐈‍⬛","🐱","🐱"],
        cols: 5,
        answer: 17,
        hint: "Look carefully at the orientation...",
        explanation: "Position 18 has a black cat 🐈‍⬛ among the regular cats!"
    },
    {
        id: 58,
        type: "multiple",
        category: "Lateral Thinking",
        question: "A man pushes his car to a hotel and tells the owner he's bankrupt. Why?",
        options: ["The hotel is too expensive", "He lost a bet", "It's Monopoly", "He wrecked his car"],
        answer: 2,
        hint: "It's a board game...",
        explanation: "He's playing Monopoly. Landing on a hotel means paying rent, which can bankrupt you."
    },
    {
        id: 59,
        type: "visual",
        visualType: "emoji_rebus",
        category: "Emoji Riddle",
        question: "What phrase do these emojis represent?",
        reEmojis: ["⭐","🐟"],
        options: ["Star fish","Starfish","Space fish","Shining fish"],
        answer: 1,
        hint: "It's a sea creature...",
        explanation: "⭐ (star) + 🐟 (fish) = Starfish!"
    },
    {
        id: 60,
        type: "multiple",
        category: "Logic",
        question: "You have 8 identical-looking balls. One is heavier. Using a balance scale, what is the MINIMUM number of weighings needed to find the heavy ball?",
        options: ["2", "3", "4", "8"],
        answer: 1,
        hint: "Divide into groups of 3, 3, and 2...",
        explanation: "Split into 3 groups. Weigh 3 vs 3. If equal, weigh the remaining 2. If unequal, weigh 1 vs 1. Minimum guaranteed = 3."
    },
    {
        id: 61,
        type: "visual",
        visualType: "count_objects",
        category: "Visual Puzzle",
        question: "How many 👁️ eyes can you count?",
        grid: ["👁️","👁️","👃","👁️","👁️","👃","👁️","👁️","👃","👁️","👁️","👃","👁️","👁️","👃","👁️","👁️"],
        cols: 6,
        answer: 12,
        hint: "Count only the eyes, not the noses...",
        explanation: "There are 12 eyes 👁️ mixed with noses 👃."
    },
    {
        id: 62,
        type: "multiple",
        category: "Lateral Thinking",
        question: "Two fathers and two sons sit down for dinner. They each eat one egg, yet only three eggs are consumed. How?",
        options: ["One didn't eat", "It's a grandfather, father, and son", "Two eggs were shared", "One was a hen"],
        answer: 1,
        hint: "One person can be both a father AND a son...",
        explanation: "There are only 3 people: a grandfather, his son (who is also a father), and his grandson."
    },
    {
        id: 63,
        type: "visual",
        visualType: "stroop_test",
        category: "Stroop Test",
        question: "What COLOR is this text?",
        stroopWord: "PINK",
        stroopColor: "#1abc9c",
        options: ["Pink","Teal","Green","Purple"],
        answer: 1,
        hint: "The ink is definitely not pink...",
        explanation: "The word 'PINK' is written in TEAL ink."
    },
    {
        id: 64,
        type: "multiple",
        category: "Math Trick",
        question: "What 4-digit number, when multiplied by 4, gives the same digits in reverse order?",
        options: ["1234","2178","1000","4321"],
        answer: 1,
        hint: "Think about 4-digit numbers where the last digit × 4 doesn't carry over much...",
        explanation: "2178 × 4 = 8712. The digits are perfectly reversed!"
    },
    {
        id: 65,
        type: "visual",
        visualType: "visual_pattern",
        category: "Visual Puzzle",
        question: "Which emoji doesn't belong?",
        pattern: ["🎸","🎸","🎹","🎸","🎸","🎹","🎸","🎸","🎹","🎸","🎹"],
        options: ["🎸","🎹","🥁","🎺"],
        answer: 1,
        hint: "Which one appears less often?",
        explanation: "The piano 🎹 appears every 3rd spot while guitar 🎸 fills the rest."
    },
    {
        id: 66,
        type: "multiple",
        category: "Logic",
        question: "In a room of 23 people, what's the approximate probability that at least two share a birthday?",
        options: ["About 10%", "About 25%", "About 50%", "About 75%"],
        answer: 2,
        hint: "It's much higher than most people think...",
        explanation: "This is the Birthday Paradox. With just 23 people, there's about a 50.7% chance."
    },
    {
        id: 67,
        type: "visual",
        visualType: "emoji_rebus",
        category: "Emoji Riddle",
        question: "What word do these emojis spell?",
        reEmojis: ["🧊","🏔️"],
        options: ["Ice mountain","Iceberg","Frozen peak","Cold rock"],
        answer: 1,
        hint: "A huge chunk of ice in the ocean...",
        explanation: "🧊 (ice) + 🏔️ (berg/mountain) = Iceberg!"
    },
    {
        id: 68,
        type: "multiple",
        category: "Math Trick",
        question: "What is 111,111,111 × 111,111,111?",
        options: ["12345678987654321","123456789987654321","111111111111111111","987654321123456789"],
        answer: 0,
        hint: "Think about: 11×11=121, 111×111=12321...",
        explanation: "111,111,111² = 12,345,678,987,654,321 - a beautiful palindrome."
    },
    {
        id: 69,
        type: "visual",
        visualType: "find_hidden",
        category: "Visual Puzzle",
        question: "Find the 🌙 moon hiding among the ☀️ suns!",
        grid: ["☀️","☀️","☀️","☀️","☀️","☀️","☀️","☀️","☀️","☀️","🌙","☀️","☀️","☀️","☀️","☀️","☀️","☀️","☀️","☀️","☀️","☀️","☀️","☀️"],
        cols: 6,
        answer: 10,
        hint: "It's darker than the others...",
        explanation: "The moon 🌙 is at position 11!"
    },
    {
        id: 70,
        type: "multiple",
        category: "Trick Question",
        question: "How many times can you subtract 2 from 16?",
        options: ["8", "7", "1", "Infinite"],
        answer: 2,
        hint: "After the first subtraction...",
        explanation: "You can only subtract 2 from 16 once. After that, it's 14."
    },

    // =============================================
    // BRAIN MELTER (Levels 71-90) - Hard
    // =============================================
    {
        id: 71,
        type: "multiple",
        category: "Logic",
        question: "You meet two people: one always lies, one always tells the truth. You can ask ONE question to find the door to freedom. What do you ask?",
        options: ["Which door is the exit?","What would the other person say is the exit?","Are you the liar?","Is the sky blue?"],
        answer: 1,
        hint: "Ask one person what the OTHER would say...",
        explanation: "Ask either person: 'What would the other person say is the exit?' Both will point to the wrong door, so choose the opposite."
    },
    {
        id: 72,
        type: "visual",
        visualType: "stroop_test",
        category: "Stroop Test",
        question: "What COLOR is this text? Be careful!",
        stroopWord: "BLACK",
        stroopColor: "#e74c3c",
        options: ["Black","Red","Blue","White"],
        answer: 1,
        hint: "Red alert! Don't read the word...",
        explanation: "The word 'BLACK' is written in RED ink."
    },
    {
        id: 73,
        type: "visual",
        visualType: "emoji_rebus",
        category: "Emoji Riddle",
        question: "What phrase do these emojis represent?",
        reEmojis: ["🧠","🌊"],
        options: ["Smart wave","Brain ocean","Brainstorm","Mind flood"],
        answer: 2,
        hint: "Brain + storm (water/wave) = ...",
        explanation: "🧠 (brain) + 🌊 (storm/wave) = Brainstorm!"
    },
    {
        id: 74,
        type: "multiple",
        category: "Lateral Thinking",
        question: "A man walks into a bar and asks for a glass of water. The bartender pulls out a gun and points it at him. The man says 'thank you' and leaves. Why?",
        options: ["He wanted to die","He had hiccups and the shock cured them","It was a joke","The bartender recognized him"],
        answer: 1,
        hint: "What ailment can be cured by a sudden shock?",
        explanation: "The man had hiccups. The bartender's shock cured them."
    },
    {
        id: 75,
        type: "visual",
        visualType: "visual_pattern",
        category: "Visual Puzzle",
        question: "What comes next in this sequence?",
        pattern: ["🪨","📄","✂️","🪨","📄","✂️","🪨","📄","?"],
        options: ["🪨","📄","✂️","🖐️"],
        answer: 2,
        hint: "Rock, paper, scissors...",
        explanation: "The classic rock-paper-scissors cycle. After paper 📄 comes scissors ✂️."
    },
    {
        id: 76,
        type: "multiple",
        category: "Wordplay",
        question: "There's a word where the first two letters signify a male, the first three signify a female, the first four a great man, and the whole word a great woman. What is it?",
        options: ["Heroine","Heroics","Heroic","Hero"],
        answer: 0,
        hint: "HE, HER, HERO...",
        explanation: "HEROINE: HE (male), HER (female), HERO (great man), HEROINE (great woman)."
    },
    {
        id: 77,
        type: "visual",
        visualType: "odd_one_out",
        category: "Visual Puzzle",
        question: "Which emoji is different?",
        grid: ["🔥","🔥","🔥","🔥","🔥","🔥","🔥","💧","🔥","🔥","🔥","🔥","🔥","🔥","🔥","🔥"],
        cols: 4,
        answer: 7,
        hint: "One of these will put out the others...",
        explanation: "The water 💧 is the odd one among all the fires."
    },
    {
        id: 78,
        type: "multiple",
        category: "Riddle",
        question: "What is seen in the middle of March and April but not at the beginning or end of either month?",
        options: ["The letter R","Spring","A full moon","Rain"],
        answer: 0,
        hint: "Look at the words themselves...",
        explanation: "The letter R appears in maRch and apRil but not at the beginning or end."
    },
    {
        id: 79,
        type: "visual",
        visualType: "count_objects",
        category: "Visual Puzzle",
        question: "Count the legs! How many 🦵 legs total?",
        grid: ["🦵","🦿","🦵","🦿","🦵","🦿","🦵","🦿","🦵"],
        cols: 3,
        answer: 5,
        hint: "Count only the regular legs, not prosthetics...",
        explanation: "There are 5 legs 🦵 and 4 prosthetic legs 🦿."
    },
    {
        id: 80,
        type: "multiple",
        category: "Math Trick",
        question: "How many squares of any size are on a standard 8×8 chessboard?",
        options: ["64","128","204","256"],
        answer: 2,
        hint: "Sum of squares: 1² + 2² + 3² + ... + 8²",
        explanation: "1+4+9+16+25+36+49+64 = 204 squares."
    },
    {
        id: 81,
        type: "visual",
        visualType: "emoji_rebus",
        category: "Emoji Riddle",
        question: "What phrase do these emojis represent?",
        reEmojis: ["⏰","⏱️"],
        options: ["Time watch","Clock watch","Time's up","Watch time"],
        answer: 2,
        hint: "A clock and a timer running out...",
        explanation: "⏰ (clock/time) + ⏱️ (timer stopping) = Time's up!"
    },
    {
        id: 82,
        type: "multiple",
        category: "Logic",
        question: "You have two ropes. Each burns in exactly 60 minutes, but at non-uniform rates. How do you measure exactly 45 minutes?",
        options: ["Light rope A at both ends and rope B at one end","Light both ropes at one end","Cut rope A in half","Light both ropes at both ends"],
        answer: 0,
        hint: "Burning from both ends = half the time...",
        explanation: "Light A from both ends and B from one end simultaneously. A finishes in 30 min. Then light B's other end. B finishes in 15 more min. Total: 45 min."
    },
    {
        id: 83,
        type: "visual",
        visualType: "find_hidden",
        category: "Visual Puzzle",
        question: "Find the 💎 diamond hiding among the ⬜ squares!",
        grid: ["⬜","⬜","⬜","⬜","⬜","⬜","⬜","⬜","⬜","⬜","⬜","💎","⬜","⬜","⬜","⬜","⬜","⬜","⬜","⬜","⬜","⬜","⬜","⬜","⬜","⬜"],
        cols: 6,
        answer: 11,
        hint: "It sparkles differently...",
        explanation: "The diamond 💎 is at position 12!"
    },
    {
        id: 84,
        type: "multiple",
        category: "Riddle",
        question: "What question can you never answer 'yes' to?",
        options: ["Are you dead?","Are you lying?","Are you asleep?","Are you alive?"],
        answer: 2,
        hint: "If you could answer, it would prove the answer wrong...",
        explanation: "If you're truly asleep, you can't answer. If you answer 'yes', you're not asleep."
    },
    {
        id: 85,
        type: "visual",
        visualType: "stroop_test",
        category: "Stroop Test",
        question: "What COLOR is this text? Think fast!",
        stroopWord: "WHITE",
        stroopColor: "#2980b9",
        options: ["White","Blue","Black","Gray"],
        answer: 1,
        hint: "It's a cool color...",
        explanation: "The word 'WHITE' is written in BLUE ink."
    },
    {
        id: 86,
        type: "multiple",
        category: "Wordplay",
        question: "What is the longest English word typed using only the top keyboard row (QWERTYUIOP)?",
        options: ["Typewriter","Repertoire","Tupperware","Proprietor"],
        answer: 1,
        hint: "Top row letters: Q W E R T Y U I O P",
        explanation: "Repertoire: R-E-P-E-R-T-O-I-R-E - all top-row letters, 11 letters long."
    },
    {
        id: 87,
        type: "visual",
        visualType: "visual_pattern",
        category: "Visual Puzzle",
        question: "Which emoji doesn't belong in this pattern?",
        pattern: ["👶","👦","👨","👴","👶","👦","👨","👴","👶","👦","👨","👨"],
        options: ["👶","👦","👨","👴"],
        answer: 3,
        hint: "One appears an extra time...",
        explanation: "👴 (old man) appears only twice while others appear 3 times. Actually 👴 appears at pos 4 and 8, but 👨 appears at 3, 7, AND 12."
    },
    {
        id: 88,
        type: "multiple",
        category: "Logic",
        question: "A bat and a ball cost $1.10. The bat costs $1 more than the ball. How much does the ball cost?",
        options: ["10 cents","5 cents","15 cents","1 cent"],
        answer: 1,
        hint: "It's NOT 10 cents...",
        explanation: "If ball = 5 cents, bat = $1.05. Total = $1.10. The common wrong answer is 10 cents."
    },
    {
        id: 89,
        type: "visual",
        visualType: "emoji_rebus",
        category: "Emoji Riddle",
        question: "What word do these emojis spell?",
        reEmojis: ["☀️","🌻"],
        options: ["Day bloom","Sunflower","Daylight","Bright flower"],
        answer: 1,
        hint: "A big yellow flower...",
        explanation: "☀️ (sun) + 🌻 (flower) = Sunflower!"
    },
    {
        id: 90,
        type: "multiple",
        category: "Lateral Thinking",
        question: "You see a boat filled with people. It has not sunk, but when you look again, you don't see a single person on the boat. Why?",
        options: ["They all jumped off","The boat sank","They were all married","You're looking at the back"],
        answer: 2,
        hint: "Not a SINGLE person...",
        explanation: "Not a single person = not one unmarried person. They were all married."
    },

    // =============================================
    // FINAL BOSS (Levels 91-100) - Very Hard
    // =============================================
    {
        id: 91,
        type: "visual",
        visualType: "stroop_test",
        category: "Stroop Test",
        question: "What COLOR is the text? Final boss speed round!",
        stroopWord: "BROWN",
        stroopColor: "#9b59b6",
        options: ["Brown","Purple","Maroon","Pink"],
        answer: 1,
        hint: "Royalty's favorite color...",
        explanation: "The word 'BROWN' is written in PURPLE ink."
    },
    {
        id: 92,
        type: "multiple",
        category: "Logic",
        question: "Three gods are named True, False, and Random. True always speaks truth, False always lies, Random is random. You can ask three yes/no questions. How do you identify all three?",
        options: ["Impossible to solve","Ask each god if they are Random","Use double-negative questions targeting one god first","Ask them their names directly"],
        answer: 2,
        hint: "First, figure out which god is NOT Random...",
        explanation: "This is the Hardest Logic Puzzle Ever. Use indirect questions to find a non-Random god first, then deduce the rest."
    },
    {
        id: 93,
        type: "visual",
        visualType: "find_hidden",
        category: "Visual Puzzle",
        question: "Find the 🧊 ice cube among these 💎 gems! (one gem is actually an ice cube)",
        grid: ["💎","💎","💎","💎","💎","💎","💎","💎","💎","💎","💎","💎","💎","💎","💎","💎","💎","💎","💎","💎","💎","💎","💎","🧊","💎","💎","💎","💎","💎","💎"],
        cols: 6,
        answer: 23,
        hint: "It's cold, not shiny...",
        explanation: "The ice cube 🧊 is hidden at position 24!"
    },
    {
        id: 94,
        type: "multiple",
        category: "Riddle",
        question: "I can be cracked, made, told, and played. What am I?",
        options: ["A joke","A code","A game","A promise"],
        answer: 0,
        hint: "You've probably heard one today...",
        explanation: "A joke can be cracked, made, told, and played."
    },
    {
        id: 95,
        type: "visual",
        visualType: "emoji_rebus",
        category: "Emoji Riddle",
        question: "What phrase do these emojis represent?",
        reEmojis: ["🌙","⭐","⭐"],
        options: ["Night stars","Moonlight","Evening glow","Star night"],
        answer: 1,
        hint: "Moon + light (stars = light)...",
        explanation: "🌙 (moon) + ⭐⭐ (light) = Moonlight!"
    },
    {
        id: 96,
        type: "multiple",
        category: "Lateral Thinking",
        question: "A woman murders her husband and dries him in a dryer. Her son comes home and says 'Mom, I smell smoke.' Why does he know she's lying?",
        options: ["He saw blood","The lint filter would catch remains","He heard a scream","The door was locked"],
        answer: 1,
        hint: "What happens in a dryer's filter...",
        explanation: "The lint filter would contain human remains, proving his mother's story false."
    },
    {
        id: 97,
        type: "visual",
        visualType: "visual_pattern",
        category: "Visual Puzzle",
        question: "Which emoji breaks the pattern?",
        pattern: ["🔴","🔵","🔴","🔵","🔴","🔵","🔴","🔴","🔵","🔴","🔵","🔴","🔵","🔴"],
        options: ["🔴","🔵","🟢","🟡"],
        answer: 0,
        hint: "One color appears one too many times...",
        explanation: "🔴 appears an extra time at position 8, breaking the alternating pattern."
    },
    {
        id: 98,
        type: "multiple",
        category: "Logic",
        question: "A chessboard with two opposite corners cut off has 62 squares. Can you cover it with 31 dominoes (each covering 2 squares)?",
        options: ["Yes, easily","No, it's impossible","Only with special placement","Depends on which corners"],
        answer: 1,
        hint: "Each domino covers 1 black + 1 white square...",
        explanation: "Opposite corners are the same color, leaving 30 of one color and 32 of another. Impossible."
    },
    {
        id: 99,
        type: "multiple",
        category: "Riddle",
        question: "I am a word of 5 letters. People eat me. Remove my first letter = form of energy. Remove my first two letters = needed to live. What am I?",
        options: ["Wheat","Fruit","Plant","Bread"],
        answer: 0,
        hint: "W___ → heat → eat...",
        explanation: "WHEAT: remove W → HEAT, remove WH → EAT. People eat wheat!"
    },
    {
        id: 100,
        type: "visual",
        visualType: "find_hidden",
        category: "Final Puzzle",
        question: "Find the 🏆 trophy hidden among all these 🎖️ medals! You're almost there!",
        grid: ["🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🏆","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️","🎖️"],
        cols: 7,
        answer: 18,
        hint: "The ultimate prize is hidden near the end...",
        explanation: "The 🏆 trophy is at position 19! You found it - you are the SMARTEST!"
    }
];

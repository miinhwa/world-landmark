// World landmarks data
const landmarks = [
    // Monuments
    {
        name: "Eiffel Tower",
        location: "Paris, France",
        coordinates: [48.8584, 2.2945],
        category: "monuments",
        description: "Iron tower 330 meters high, symbol of Paris and France. Built in 1889 by Gustave Eiffel for the World's Fair."
    },
    {
        name: "Statue of Liberty",
        location: "New York, USA",
        coordinates: [40.6892, -74.0445],
        category: "monuments",
        description: "Neoclassical sculpture on Liberty Island in New York Harbor. A gift from France to the United States in 1886."
    },
    {
        name: "Colosseum",
        location: "Rome, Italy",
        coordinates: [41.8902, 12.4922],
        category: "monuments",
        description: "Flavian Amphitheater built in 80 AD. The largest ancient structure of its type, seating up to 80,000 spectators."
    },
    {
        name: "Taj Mahal",
        location: "Agra, India",
        coordinates: [27.1751, 78.0421],
        category: "monuments",
        description: "White marble mausoleum-mosque built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal in 1653."
    },
    {
        name: "Great Wall of China",
        location: "China",
        coordinates: [40.4319, 116.5704],
        category: "monuments",
        description: "Series of fortifications made of stone, brick, tamped earth, and other materials, built along the historical northern borders of China."
    },
    {
        name: "Pyramids of Giza",
        location: "Giza, Egypt",
        coordinates: [29.9792, 31.1342],
        category: "monuments",
        description: "Complex of ancient monuments on the Giza Plateau, including the Great Pyramid of Khufu, one of the Seven Wonders of the Ancient World."
    },
    {
        name: "Christ the Redeemer",
        location: "Rio de Janeiro, Brazil",
        coordinates: [-22.9519, -43.2105],
        category: "monuments",
        description: "Art Deco statue of Jesus Christ in Rio de Janeiro, created by French sculptor Paul Landowski and unveiled in 1931."
    },
    {
        name: "Machu Picchu",
        location: "Peru",
        coordinates: [-13.1631, -72.5450],
        category: "monuments",
        description: "15th-century Inca citadel located on a mountain ridge 2,430 meters above sea level."
    },

    // Natural landmarks
    {
        name: "Great Barrier Reef",
        location: "Australia",
        coordinates: [-18.2871, 147.6992],
        category: "natural",
        description: "The world's largest coral reef system, consisting of more than 2,900 individual reefs and 900 islands."
    },
    {
        name: "Grand Canyon",
        location: "Arizona, USA",
        coordinates: [36.1069, -112.1129],
        category: "natural",
        description: "Canyon carved by the Colorado River in Arizona, USA. One of the seven natural wonders of the world."
    },
    {
        name: "Niagara Falls",
        location: "Canada/USA",
        coordinates: [43.0962, -79.0377],
        category: "natural",
        description: "Group of three waterfalls on the border between the Canadian province of Ontario and the US state of New York."
    },
    {
        name: "Northern Lights",
        location: "Tromsø, Norway",
        coordinates: [69.6492, 18.9553],
        category: "natural",
        description: "Natural light phenomenon in the sky, observed in high-latitude regions (Arctic and Antarctic)."
    },
    {
        name: "Victoria Falls",
        location: "Zambia/Zimbabwe",
        coordinates: [-17.9243, 25.8572],
        category: "natural",
        description: "Waterfall on the Zambezi River on the border between Zambia and Zimbabwe. One of the largest waterfalls in the world."
    },
    {
        name: "Mount Everest",
        location: "Nepal/China",
        coordinates: [27.9881, 86.9250],
        category: "natural",
        description: "Earth's highest peak at 8,848 meters above sea level, located in the Himalayas."
    },

    // Religious landmarks
    {
        name: "St. Peter's Basilica",
        location: "Vatican City",
        coordinates: [41.9022, 12.4539],
        category: "religious",
        description: "Catholic church in Vatican City, built in the 16th-17th centuries. The largest Christian church in the world."
    },
    {
        name: "Mecca",
        location: "Saudi Arabia",
        coordinates: [21.3891, 39.8579],
        category: "religious",
        description: "Sacred city of Islam, birthplace of the Prophet Muhammad and direction of prayer for Muslims worldwide."
    },
    {
        name: "Hagia Sophia",
        location: "Istanbul, Turkey",
        coordinates: [41.0086, 28.9802],
        category: "religious",
        description: "Former Orthodox patriarchal cathedral, later a mosque, and now a museum in Istanbul. Built in 537 AD."
    },
    {
        name: "Golden Temple",
        location: "Amritsar, India",
        coordinates: [31.6200, 74.8765],
        category: "religious",
        description: "Main shrine of Sikhism, built in the 16th century. The building is covered with gold and surrounded by a sacred pool."
    },
    {
        name: "Temple of Heaven",
        location: "Beijing, China",
        coordinates: [39.8823, 116.4066],
        category: "religious",
        description: "Imperial complex of religious buildings in Beijing, built in the 15th century for worship of Heaven."
    },

    // Cultural landmarks
    {
        name: "Louvre Museum",
        location: "Paris, France",
        coordinates: [48.8606, 2.3376],
        category: "cultural",
        description: "The world's largest art museum, located in a former royal palace. Home to the Mona Lisa."
    },
    {
        name: "Hermitage Museum",
        location: "St. Petersburg, Russia",
        coordinates: [59.9398, 30.3146],
        category: "cultural",
        description: "One of the largest and oldest museums in the world, founded in 1764 by Catherine the Great."
    },
    {
        name: "Metropolitan Museum of Art",
        location: "New York, USA",
        coordinates: [40.7794, -73.9632],
        category: "cultural",
        description: "The largest art museum in the United States, founded in 1870. Contains more than 2 million works of art."
    },
    {
        name: "British Museum",
        location: "London, United Kingdom",
        coordinates: [51.5194, -0.1270],
        category: "cultural",
        description: "Museum of human history and culture in London. Its permanent collection numbers around 8 million objects."
    },
    {
        name: "Sydney Opera House",
        location: "Sydney, Australia",
        coordinates: [-33.8568, 151.2153],
        category: "cultural",
        description: "Multi-venue performing arts center in Sydney, one of the most famous buildings of the 20th century."
    },

    // Modern landmarks
    {
        name: "Burj Khalifa",
        location: "Dubai, UAE",
        coordinates: [25.1972, 55.2744],
        category: "modern",
        description: "Skyscraper 828 meters tall, the tallest artificial structure in the world. Opened in 2010."
    },
    {
        name: "Empire State Building",
        location: "New York, USA",
        coordinates: [40.7484, -73.9857],
        category: "modern",
        description: "102-story skyscraper in New York City, 381 meters tall. Built in 1931 in Art Deco style."
    },
    {
        name: "CN Tower",
        location: "Toronto, Canada",
        coordinates: [43.6426, -79.3871],
        category: "modern",
        description: "553-meter tall communications tower in Toronto, formerly the world's tallest free-standing structure until 2007."
    },
    {
        name: "Tokyo Tower",
        location: "Tokyo, Japan",
        coordinates: [35.6586, 139.7454],
        category: "modern",
        description: "333-meter tall communications tower in Minato, Tokyo, inspired by the Eiffel Tower."
    },
    {
        name: "Moscow Kremlin",
        location: "Moscow, Russia",
        coordinates: [55.7520, 37.6175],
        category: "modern",
        description: "Fortress in the center of Moscow, the historical center of the city and residence of the President of Russia."
    },
    {
        name: "Big Ben",
        location: "London, United Kingdom",
        coordinates: [51.4994, -0.1245],
        category: "modern",
        description: "Clock tower of the Palace of Westminster in London. Official name is Elizabeth Tower."
    },
    {
        name: "Golden Gate Bridge",
        location: "San Francisco, USA",
        coordinates: [37.8199, -122.4783],
        category: "modern",
        description: "Suspension bridge spanning the Golden Gate strait, connecting San Francisco to Marin County."
    },
    {
        name: "Parthenon",
        location: "Athens, Greece",
        coordinates: [37.9715, 23.7267],
        category: "cultural",
        description: "Ancient Greek temple dedicated to the goddess Athena, built in the 5th century BC on the Athenian Acropolis."
    },
    {
        name: "Angel of Independence",
        location: "Mexico City, Mexico",
        coordinates: [19.4267, -99.1674],
        category: "monuments",
        description: "Victory column in Mexico City, built in 1910 to commemorate the centenary of Mexico's independence."
    },
    {
        name: "Vienna State Opera",
        location: "Vienna, Austria",
        coordinates: [48.2038, 16.3694],
        category: "cultural",
        description: "Vienna State Opera, one of the most famous opera houses in the world, opened in 1869."
    }
];

// Landmark categories
const categories = {
    monuments: {
        name: "Monuments",
        icon: "🏛️",
        color: "#ff6b6b"
    },
    natural: {
        name: "Natural",
        icon: "🌿",
        color: "#00b894"
    },
    religious: {
        name: "Religious",
        icon: "⛪",
        color: "#fdcb6e"
    },
    cultural: {
        name: "Cultural",
        icon: "🎭",
        color: "#6c5ce7"
    },
    modern: {
        name: "Modern",
        icon: "🏢",
        color: "#74b9ff"
    }
};


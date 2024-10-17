

const carsData = [
    {
        "id": 1,
        "exterior_id": 1,
        "roof_id": 1,
        "wheels_id": 1,
        "interior_id": 1,
        "convertible": false
    },
    {
        "id": 2,
        "exterior_id": 2,
        "roof_id": 2,
        "wheels_id": 2,
        "interior_id": 2,
        "convertible": false
    },
    {
        "id": 3,
        "exterior_id": 3,
        "roof_id": 3,
        "wheels_id": 3,
        "interior_id": 3,
        "convertible": false
    },
    {
        "id": 4,
        "exterior_id": 4,
        "roof_id": 4,
        "wheels_id": 4,
        "interior_id": 4,
        "convertible": true
    },
    {
        "id": 5,
        "exterior_id": 5,
        "roof_id": 5,
        "wheels_id": 5,
        "interior_id": 5,
        "convertible": true
    },
    {
        "id": 6,
        "exterior_id": 6,
        "roof_id": 6,
        "wheels_id": 6,
        "interior_id": 6,
        "convertible": true
    },
    {
        "id": 7,
        "exterior_id": 1,
        "roof_id": 2,
        "wheels_id": 7,
        "interior_id": 7,
        "convertible": false
    },
    {
        "id": 8,
        "exterior_id": 2,
        "roof_id": 3,
        "wheels_id": 8,
        "interior_id": 8,
        "convertible": false
    },
    {
        "id": 9,
        "exterior_id": 3,
        "roof_id": 4,
        "wheels_id": 1,
        "interior_id": 9,
        "convertible": true
    },
    {
        "id": 10,
        "exterior_id": 4,
        "roof_id": 5,
        "wheels_id": 2,
        "interior_id": 10,
        "convertible": true
    },
    {
        "id": 11,
        "exterior_id": 5,
        "roof_id": 6,
        "wheels_id": 3,
        "interior_id": 1,
        "convertible": true
    },
    {
        "id": 12,
        "exterior_id": 6,
        "roof_id": 1,
        "wheels_id": 4,
        "interior_id": 2,
        "convertible": false
    },
    {
        "id": 13,
        "exterior_id": 1,
        "roof_id": 2,
        "wheels_id": 5,
        "interior_id": 3,
        "convertible": false
    },
    {
        "id": 14,
        "exterior_id": 2,
        "roof_id": 3,
        "wheels_id": 6,
        "interior_id": 4,
        "convertible": false
    },
    {
        "id": 15,
        "exterior_id": 3,
        "roof_id": 4,
        "wheels_id": 7,
        "interior_id": 5,
        "convertible": true
    }
];

const carNames = [
    "Speedster", "Thunderbolt", "Lightning", "Storm", "Blaze", 
    "Rocket", "Comet", "Meteor", "Flash", "Vortex", 
    "Cyclone", "Hurricane", "Tornado", "Typhoon", "Whirlwind"
];

carsData.forEach((car, index) => {
    car.name = carNames[index];
});

export default carsData;
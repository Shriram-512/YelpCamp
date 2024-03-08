const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch(err => {
    console.log("connection error:")
    console.log(err)
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log("Database connected")
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const price = Math.floor(Math.random() * 20) + 10;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '65e1a1ce54d46c5bfb2adc72',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ut facilis porro dolorem sit perspiciatis quia optio  quam sapiente debitis? Voluptatem voluptatum odio temporibus animi, non commodi nesciunt deleniti iure.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dhlbek2fb/image/upload/v1709479617/YelpCamp/yuherekkge6sznjgiicz.jpg',
                    filename: 'YelpCamp/yuherekkge6sznjgiicz'
                },
                {
                    url: 'https://res.cloudinary.com/dhlbek2fb/image/upload/v1709479619/YelpCamp/skv5fds6toclfomvkta3.jpg',
                    filename: 'YelpCamp/skv5fds6toclfomvkta3'
                },
                {
                    url: 'https://res.cloudinary.com/dhlbek2fb/image/upload/v1709723034/YelpCamp/xcscx1poazvgazi9y6zc.jpg',
                    filename: 'YelpCamp/jhrr8guanto7uttaopm3'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
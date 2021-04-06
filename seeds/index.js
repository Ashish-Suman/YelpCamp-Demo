const mongoose = require("mongoose");
const cities = require("./cities");
const Campground = require("../models/campground");
const {places, descriptors} = require('./seedHelper');

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connetcted");
});
const sample = (array) => array[Math.floor(Math.random()*array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++){
        const baseUrl = "https://res.cloudinary.com/dv7tj0hmo/image/upload/v1617438212/YelpCamp/";
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*30) + 10;
        let random5 = 1 + Math.floor(Math.random()*5);
        let random1 = Math.floor(Math.random()*5);
        const filenames = ["campground_1_tubrkf", "campground_5_ppbfbd", "campground_2_r01py7", "campground_4_i5qxyl", "campground_3_pwoszx"];
        const images = [];
        while(random5){
            images.push({url: `${baseUrl}${filenames[random1]}.jpg`,
                filename: filenames[random1]});
            random1 = (random1 + 1)%5;
            random5 = random5-1;
        }
        console.log(images);
        const camp = new Campground({
            //default USER_ID
            author: "6066ab1338c45611e6597f2a",
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry:{
                type: 'Point',
                coordinates:[cities[random1000].longitude, cities[random1000].latitude]
            },
            images: images,
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic corrupti suscipit illum consectetur qui deserunt, architecto laboriosam optio fugit excepturi accusamus iusto placeat, blanditiis vitae, facilis non. Magni, voluptates cupiditate?",
            price
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close;
    console.log("Data Seed done!");
    console.log("Database closed");
});
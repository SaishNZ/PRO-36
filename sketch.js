var dog,sadDog,happyDog, DB;
var foodS,foodStock;
var addFood, feedFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happydog.png");
}

function setup() {
  DB = firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock = DB.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage("sad",sadDog);
  dog.addImage("happy",happyDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedFood = createButton("Feed Food");
  feedFood.position(715, 95);
  feedFood.mousePressed(substractFoods);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  lastFed = hour()
  console.log(lastFed);
  
  //write code to display text lastFed time here
  if(lastFed>=12){
    textSize(25);
    stroke(0, 0, 0);
    strokeWeight(3)
    fill(256, 256, 256);
    text("Last Fed - " + lastFed % 12 + " pm", 150, 30);

    }
    else if (lastFed===0){
      text("last feed : 12AM",350,30)
      
    }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  //dog.addImage("happy",happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <=0){
   foodObj.updateFoodStock(food_stock_val*0)
  }
  else{
   foodObj.updateFoodStock(food_stock_val-1)
   foodObj.getHours()
  }
}

//function to add food in stock
function addFoods(){
  if(foodS<50) {
  foodS++;
  DB.ref('/').update({
    Food:foodS
  })
}
}

//function to substract food in stock
function substractFoods() {
  if(foodS>0){
    dog.changeImage("happy",happyDog);
  foodS--;
  DB.ref('/').update({
    Food:foodS
  })
}
}

// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs =  require('express-handlebars')// require handlebars in the project
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set ('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// 讀取列表資料 
app.get('/', (req, res) => {

    // past the movie data into 'index' partial template
    res.render('index', { restaurants: restaurantList.results })
  })

// movies內容
app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
    res.render('show', { restaurant: restaurant })
  })

// 搜尋
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurants = restaurantList.results.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { restaurants: restaurants, keyword: keyword })
  })

// start and listen on the Express server
app.listen(port, () =>{
    console.log(`Express is listening on http://localhost:${port}`)
})
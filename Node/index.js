var express = require("express");
var mysql = require("mysql2");
var app = express();
var connection = require('./database');

app.get('/', function(req, res){
    return "Welcome to our db Project"
});

app.get("/create-tables", (req, res) => {
    const queries = [
  
      // User Table
      `CREATE TABLE IF NOT EXISTS user (
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        contact VARCHAR(20),
        role VARCHAR(50)
      );`,
  
      // Sponsor Table
      `CREATE TABLE IF NOT EXISTS sponsor (
        sponsor_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        contact_id VARCHAR(100),
        contact_person VARCHAR(100),
        FOREIGN KEY (user_id) REFERENCES user(user_id)
      );`,
  
      // Sponsorship Packages
      `CREATE TABLE IF NOT EXISTS sponsorship_package (
        package_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100),
        perks TEXT,
        price DECIMAL(10,2)
      );`,
  
      // Sponsorship
      `CREATE TABLE IF NOT EXISTS sponsorship (
        id INT PRIMARY KEY AUTO_INCREMENT,
        sponsor_id INT,
        package_id INT,
        payment_status BOOLEAN,
        FOREIGN KEY (sponsor_id) REFERENCES sponsor(sponsor_id),
        FOREIGN KEY (package_id) REFERENCES sponsorship_package(package_id)
      );`,
  
      // Venue
      `CREATE TABLE IF NOT EXISTS venue (
        venue_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100),
        location VARCHAR(255),
        type VARCHAR(50),
        capacity INT
      );`,
  
      // Event
      `CREATE TABLE IF NOT EXISTS event (
        event_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100),
        description TEXT,
        max_participants INT,
        registration_fee DECIMAL(10,2),
        category VARCHAR(50),
        rules TEXT,
        team_allowed BOOLEAN,
        max_team_participants_limit INT,
        organizer_id INT,
        accepted BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (organizer_id) REFERENCES user(user_id)
      );`,
  
      // Event Round
      `CREATE TABLE IF NOT EXISTS event_round (
        event_round_id INT PRIMARY KEY AUTO_INCREMENT,
        event_id INT,
        roundType VARCHAR(100),
        date_time DATETIME,
        venue_id INT,
        FOREIGN KEY (event_id) REFERENCES event(event_id),
        FOREIGN KEY (venue_id) REFERENCES venue(venue_id)
      );`,
  
      // Participants
      `CREATE TABLE IF NOT EXISTS participant (
        participant_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        event_id INT,
        payment_status BOOLEAN DEFAULT FALSE,
        team_id VARCHAR(100),
        FOREIGN KEY (user_id) REFERENCES user(user_id),
        FOREIGN KEY (event_id) REFERENCES event(event_id)
      );`,
  
      // Accommodation
      `CREATE TABLE IF NOT EXISTS accommodation (
        accommodation_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        room_type VARCHAR(50),
        cost DECIMAL(10,2),
        assigned BOOLEAN DEFAULT FALSE,
        payment_status BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (user_id) REFERENCES user(user_id)
      );`,
  
      // Payment
      `CREATE TABLE IF NOT EXISTS payment (
        payment_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        payment_type VARCHAR(50),
        verified_status BOOLEAN DEFAULT FALSE,
        date DATETIME,
        sponsorship_id INT,
        accommodation_id INT,
        team_id VARCHAR(100),
        FOREIGN KEY (user_id) REFERENCES user(user_id),
        FOREIGN KEY (sponsorship_id) REFERENCES sponsorship(id),
        FOREIGN KEY (accommodation_id) REFERENCES accommodation(accommodation_id)
      );`,
  
      // Judge
      `CREATE TABLE IF NOT EXISTS judge (
        judge_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        event_round_id INT,
        FOREIGN KEY (user_id) REFERENCES user(user_id),
        FOREIGN KEY (event_round_id) REFERENCES event_round(event_round_id)
      );`,
  
      // Score
      `CREATE TABLE IF NOT EXISTS score (
        score_id INT PRIMARY KEY AUTO_INCREMENT,
        team_id VARCHAR(100),
        event_round_id INT,
        score DECIMAL(5,2),
        FOREIGN KEY (event_round_id) REFERENCES event_round(event_round_id)
      );`
    ];
  
    // Execute all queries one by one
    let successCount = 0;
    queries.forEach((query, index) => {
      connection.query(query, (err, result) => {
        if (err) {
          console.error(`❌ Error in query ${index + 1}:`, err.message);
          return res.status(500).send(`Failed at query ${index + 1}: ${err.message}`);
        }
        successCount++;
        if (successCount === queries.length) {
          res.send("✅ All tables created successfully!");
        }
      });
    });
  });

  








  
app.listen(3000, function(){
    console.log('App listening on port 3000');
    connection.connect(function(err){
        if(err) throw err;
        console.log('Database connected Yayyyyy!');
});});
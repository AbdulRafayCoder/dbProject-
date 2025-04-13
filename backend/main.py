from flask import Flask , jsonify
from flask_mysqldb import MySQL
          
app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'Nascon'
 
mysql = MySQL(app)






#------------------------------------------------------------------------------------------------Initial Apis --------------------------------------------------------------------------#

@app.route('/')
def home():
    return "Hello This is our DBMS Final Project"

@app.route('/testConnection')
def testConnection():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS students (
                student_id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                age INT,
                enrolled_date DATE
            );
        ''')
        mysql.connection.commit()
        return jsonify({"status": "success", "message": "Table 'students' created successfully."})
    
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
    
    finally:
        cursor.close()
        
@app.route('/create-all-tables')
def create_all_tables():
    try:
        cursor = mysql.connection.cursor()

        # User Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user (
                user_id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                contact VARCHAR(15),
                role VARCHAR(50)
            );
        ''')

        # Sponsor Table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS sponsor (
                sponsor_id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT,
                contact_id VARCHAR(100),
                contact_person VARCHAR(100),
                FOREIGN KEY (user_id) REFERENCES user(user_id)
            );
        ''')

        # Sponsorship Packages
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS sponsorship_package (
                package_id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                perks TEXT,
                price DECIMAL(10,2) NOT NULL
            );
        ''')

        # Sponsorship
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS sponsorship (
                id INT PRIMARY KEY AUTO_INCREMENT,
                sponsor_id INT,
                package_id INT,
                payment_status BOOLEAN DEFAULT FALSE,
                FOREIGN KEY (sponsor_id) REFERENCES sponsor(sponsor_id),
                FOREIGN KEY (package_id) REFERENCES sponsorship_package(package_id)
            );
        ''')

        # Venue
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS venue (
                venue_id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                location VARCHAR(255),
                type VARCHAR(50),
                capacity INT
            );
        ''')

        # Event
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS event (
                event_id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                max_participants INT,
                registration_fee DECIMAL(10,2),
                category VARCHAR(100),
                rules TEXT,
                team_allowed BOOLEAN DEFAULT FALSE,
                max_team_participants_limit INT
            );
        ''')

        # Event Round
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS event_round (
                event_round_id INT PRIMARY KEY AUTO_INCREMENT,
                event_id INT,
                roundType VARCHAR(100),
                date_time DATETIME,
                venue_id INT,
                FOREIGN KEY (event_id) REFERENCES event(event_id),
                FOREIGN KEY (venue_id) REFERENCES venue(venue_id)
            );
        ''')

        # Participant
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS participant (
                participant_id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT,
                event_id INT,
                payment_status BOOLEAN DEFAULT FALSE,
                team_id VARCHAR(100),
                FOREIGN KEY (user_id) REFERENCES user(user_id),
                FOREIGN KEY (event_id) REFERENCES event(event_id)
            );
        ''')

        # Accommodation
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS accommodation (
                accommodation_id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT,
                room_type VARCHAR(50),
                cost DECIMAL(10,2),
                assigned BOOLEAN DEFAULT FALSE,
                payment_status BOOLEAN DEFAULT FALSE,
                FOREIGN KEY (user_id) REFERENCES user(user_id)
            );
        ''')

        # Payment
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS payment (
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
            );
        ''')

        # Judge
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS judge (
                judge_id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT,
                event_round_id INT,
                FOREIGN KEY (user_id) REFERENCES user(user_id),
                FOREIGN KEY (event_round_id) REFERENCES event_round(event_round_id)
            );
        ''')

        # Score
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS score (
                score_id INT PRIMARY KEY AUTO_INCREMENT,
                team_id VARCHAR(100),
                judge_id INT,
                event_round_id INT,
                score DECIMAL(5,2),
                FOREIGN KEY (event_round_id) REFERENCES event_round(event_round_id),
                FOREIGN KEY (judge_id) REFERENCES judge(judge_id)
            );
        ''')

        mysql.connection.commit()
        return {
            "status": "success",
            "message": "All tables created successfully!"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

    finally:
        cursor.close()

#------------------------------------------------------------------------------------------------End Document--------------------------------------------------------------------------#
if __name__ == '__main__':
    app.run(debug=True)

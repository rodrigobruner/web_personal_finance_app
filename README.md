# Personal Finance

### 1. Prerequisites

Make sure you have the following tools installed on your machine:

- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) (version 11 or higher)
- Node.js](https://nodejs.org/) (version 14 or higher)
- Maven](https://maven.apache.org/) (to manage back-end project dependencies)
- [Git](https://git-scm.com/) (to clone the repository)

### 2. Clone the Repository

Clone the project repository to your local machine:

```sh
git clone https://github.com/rodrigobruner/web_personal_finance_app.git
cd your-repository 
```
### 3. Setting up the database

1. Create the database:
    * Create a database in your preferred DBMS (e.g. MySQL, PostgreSQL).

2. Configure the database in application.properties:
    * Open the src/main/resources/application.properties file and configure the database properties:

```sh
spring.datasource.url=jdbc:mysql://localhost:3306/seu_banco_de_dados
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 4. Running the Back-End Project

1. Install Dependencies:
    * Navigate to the back-end project directory and install the dependencies using Maven:

```sh
cd backend
mvn clean install
```

2. Run the application:
    * Run the Spring Boot application:

```sh
mvn spring-boot:run
```

The back-end application will be running on http://localhost:8080.


### 5. Running the Front-End Project

1. Install Dependencies:
    * Navigate to the front-end project directory and install the dependencies using npm or yarn:

```sh
cd frontend
npm install
# or
yarn install
```
2. Run the application:
    * Run the React application:

```sh
npm start
# or
yarn start
```
The front-end application will be running on http://localhost:3000.

<hr>
<p align="center">
<img src="screen_recording.gif" alt="Recording the screen." style="width:85%;"/>
</p>

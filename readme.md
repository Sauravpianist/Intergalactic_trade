
## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **MongoDB**: Set up MongoDB locally or use a cloud provider like MongoDB Atlas.
- **Kafka**: Install and run Apache Kafka and Zookeeper.
- **Redis**: Install and run Redis for caching.
- **Git**: Version control with Git.
- **Docker** (optional): For containerization.

### Setup Instructions

1. **Clone the Repository**:
    ```bash
    https://github.com/Sauravpianist/Intergalactic_trade.git
    cd intergalactic-trade-backend
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

4. **Set Up Kafka**:
    - Start Zookeeper:
      ```bash
      bin/zookeeper-server-start.sh config/zookeeper.properties
      ```
    - Start Kafka:
      ```bash
      bin/kafka-server-start.sh config/server.properties
      ```
    - Create Kafka topics as needed:
      ```bash
      bin/kafka-topics.sh --create --topic your_topic_name --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
      ```

5. **Set Up MongoDB**:
    - Ensure MongoDB is running on `mongodb://localhost:27017`.
    - Alternatively, use MongoDB Atlas and update the `MONGO_URI` accordingly.

6. **Set Up Redis**:
    - Start Redis server on default port `6379` or update the configuration if needed.
    Run command on WSL on window.
    ``` bash
    redis-cli
    ```

7. **Run Services (via Docker Compose):**
    ```bash 
    docker-compose up -d
    ```

## Usage

### Running the Application

1. **Start the Application**:
    ```bash
    npm start
    ```
    This will start the Express server on the configured port (default: 3000), connect to MongoDB, and initialize the Kafka consumer.

2. **Verify the Services**:
    - Check that the server is running: `http://localhost:3000`.
    - Ensure that Kafka, Zookeeper, MongoDB, and Redis are running.

### Testing

- **API Testing**: Use Postman or cURL to test the API endpoints.
- **Unit Tests**: Run unit tests if implemented.
    ```bash
    npm test
    ```

## Documentation

### Design Decisions

- **MongoDB** was chosen for its scalability and flexible schema, ideal for handling diverse data types like trades, cargo, and inventory.
- **Kafka** was selected as the message broker for its high throughput and real-time event processing capabilities.
- **Redis** was used for caching to enhance performance in high-frequency read operations.
- **Node.js with Express** provides a robust and scalable backend framework.

### Setup and Deployment

Follow the [Installation](#installation) and [Deployment](#deployment) sections to set up and deploy the project.

### API Testing

Provide a Postman collection or cURL commands:

- **Postman**: Import the collection from the repository (provide link or include it in the repo).
- **cURL Examples**:
    ```bash
    # Create a new trade
    curl -X POST http://localhost:3000/trades \
    -H 'Content-Type: application/json' \
    -d '{"buyer_id":"123", "seller_id":"456", "cargo_id":"789"}'

    # Get a trade
    curl http://localhost:3000/trades/trade_Id

    # Create a new cargo
    curl -X POST http://localhost:3000/cargo \
    -H 'Content-Type: application/json' \
    -d '{"origin":"earth", "destination":"mars", "weight":"1000"}'

    # Get inventory
    curl http://localhost:3000/inventory/mars
    ```

### Limitations and Improvements

- **Limitations**:
    - No real-time analytics service implemented yet.
    - Limited authentication and authorization mechanisms.
    - No comprehensive testing suite.


## Scalability and Performance

### Scaling Strategies

- **Horizontal Scaling**: Add more instances of the Trade, Cargo, and Inventory services based on demand.
- **Data Partitioning**: Implement sharding in MongoDB to distribute data across multiple nodes.
- **Caching**: Use Redis to cache frequently accessed data, reducing database load and improving response times.

### Optimization

- **Indexing**: Ensure proper indexing on MongoDB collections to speed up queries.

- **Efficient Event Processing**: Optimize Kafka consumers to handle high throughput without lag.


## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## Licence
    Saurav Pun Magar
    B.Tech CSE
    21SCSE1011071
    Galgotias University
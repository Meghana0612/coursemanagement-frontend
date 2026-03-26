# ---------- BUILD STAGE ----------
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy full project
COPY . .

# Build the project (skip tests for speed)
RUN mvn clean package -DskipTests


# ---------- RUN STAGE ----------
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Run application
ENTRYPOINT ["java","-jar","app.jar"]

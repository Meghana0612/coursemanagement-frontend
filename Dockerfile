# Build stage
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# 👇 copy ONLY backend folder
COPY course-management-backend /app

# 👇 run maven inside correct folder
RUN mvn -f /app/pom.xml clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jdk

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]

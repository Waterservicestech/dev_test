
FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/devtest-0.0.1.jar /app/devtest-0.0.1.jar

EXPOSE 3000

CMD ["java", "-jar", "/app/devtest-0.0.1.jar"]
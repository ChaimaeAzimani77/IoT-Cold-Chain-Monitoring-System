#include <DHT.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// --- Configuration du capteur DHT11 ---
#define DHTPIN D2       // Pin où est branché le DHT11
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

// --- Configuration WiFi ---
const char* ssid = "--------";           // Nom du réseau WiFi
const char* password = "*********";     // Mot de passe WiFi

// --- Configuration MQTT ---
const char* mqtt_server = "192.000.0.000"; // IP du broker MQTT
const int mqtt_port = 1883;
const char* mqtt_topic = "capteur/dht11";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(9600);
  dht.begin();

  // Connexion au WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connexion au WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connecté !");

  // Configuration serveur MQTT
  client.setServer(mqtt_server, mqtt_port);
}

void reconnect() {
  // Boucle tant qu'on n'est pas connecté au broker MQTT
  while (!client.connected()) {
    Serial.print("Connexion au MQTT...");
    
    // Création d'un ID client unique
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);

    if (client.connect(clientId.c_str())) {
      Serial.println("Connecté au MQTT !");
    } else {
      Serial.print("Échec, rc=");
      Serial.print(client.state());
      Serial.println(" (nouvelle tentative dans 5 secondes)");
      delay(5000);
    }
  }
}

void loop() {
  // S'assurer que la connexion MQTT est active
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // Lecture des valeurs du DHT11
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Échec de lecture du DHT !");
    return;
  }

  // Création du JSON
  DynamicJsonDocument doc(200);
  doc["temperature"] = t;
  doc["humidity"] = h;

  char buffer[256];
  serializeJson(doc, buffer);

  // Publication MQTT
  if (client.publish(mqtt_topic, buffer)) {
    Serial.print("Envoyé MQTT : ");
    Serial.println(buffer);
  } else {
    Serial.println("Erreur d'envoi MQTT");
  }

  // Attente 10 secondes avant la prochaine lecture
  delay(10000);
}

# ❄️ IoT Cold Chain Monitoring System

## 📝 Description
Ce projet consiste à concevoir un système IoT intelligent de surveillance de la chaîne du froid destiné aux laboratoires d’analyses médicales.

Il permet de surveiller en temps réel la température et l’humidité afin de garantir la conservation optimale des échantillons biologiques et chimiques (2°C à 8°C).

---

## 👩‍💻 Réalisé par
- El Azimani Chaimae  
- Bouras Jihane  

---

## 📌 Problématique
Dans les domaines médical, pharmaceutique et alimentaire, une rupture de la chaîne du froid peut entraîner des pertes importantes et des risques critiques.

Il est donc nécessaire de mettre en place un système de surveillance continue avec alertes automatiques.

---

## 🎯 Objectifs
- Mesurer la température et l’humidité en temps réel  
- Transmettre les données via IoT  
- Stocker les données dans une base de données  
- Visualiser les données via une interface web  
- Générer des graphiques dynamiques  
- Envoyer des alertes en cas de dépassement de seuil  
- Assurer la traçabilité des mesures  

---

# ⚙️ Fonctionnement global
- Capteur DHT11 mesure température et humidité  
- ESP8266 / ESP32 envoie les données  
- Communication via MQTT / HTTP  
- Backend Django traite les données  
- Stockage dans base de données  
- Dashboard web pour visualisation  
- Alertes Email + Telegram en temps réel  

---

# 🔌 Partie Hardware

## 🧩 Composants utilisés
- ESP8266 / ESP32  
- DHT11 (capteur température & humidité)  
- Câbles de connexion  
- Alimentation électrique  

---

# 💻 Partie Software

## 🧾 Technologies utilisées

### Backend
- Python (Django)
- API REST

### Base de données
- SQLite / MySQL

### Frontend
- HTML / CSS / JavaScript
- Chart.js (graphiques)

### IoT & Communication
- MQTT
- HTTP
- Arduino IDE (ESP programming)

### Notifications
- Telegram API
- SMTP Gmail

---

# 🧠 Architecture du système
- ESP (capteurs) → collecte données  
- MQTT / HTTP → transmission  
- Django API → traitement  
- Database → stockage  
- Web Dashboard → visualisation  
- Alert System → alertes temps réel  

---

# 📐 Conception SysML

## 📌 Diagramme d’exigences
![SysML Requirements](Images/Giagramme_SysML.png)

## 📌 Diagramme de cas d’utilisation
![Use Case](Images/SysML.png)

---

# 📊 Interface Web

## 🔐 Connexion
![Login](Images/connexion.png)

## 📊 Dashboard
![Dashboard](Images/dashboard (2).png)

## 🌡️ Température
![Temperature](Images/temperature.png)

## 💧 Humidité
![Humidity](Images/humidite.png)

---

# 🚨 Gestion des incidents
![Incidents](Images/incidents.png)
![Details](Images/details.png)

---

# 📡 MQTT
![MQTT](Images/mqtt.png)

---

# 🚨 Système d’alerte
- Surveillance continue des capteurs  
- Détection de dépassement de seuil  
- Notifications automatiques :

📩 Email (SMTP Gmail)  
📱 Telegram  

![Telegram](Images/telegram.png)
![Gmail](Images/gmail.png)

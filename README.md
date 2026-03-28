# ❄️ IoT Cold Chain Monitoring System

## 📝 Description :
Ce projet consiste à concevoir un **système IoT intelligent et automatisé** pour la surveillance stricte de la chaîne du froid, conçu spécifiquement pour les **laboratoires d’analyses médicales**. Il permet le suivi en temps réel de la température et de l’humidité afin d'assurer la conservation optimale des produits hautement sensibles (échantillons biologiques et chimiques).
La plage de conservation de ces échantillons est strictement définie **entre 2°C et 8°C**.

## 👩‍💻 Réalisé par :
- El Azimani Chaimae
- Bouras Jihane

## 📌 Problématique :
Dans les domaines médical, alimentaire et logistique, une rupture de la chaîne du froid peut entraîner des pertes importantes. Il est donc essentiel de surveiller en continu les conditions environnementales et d’alerter rapidement en cas d’anomalie.

## 🎯 Objectifs et Fonctionnalités
* [cite_start]**Surveillance continue (Temps Réel)** : Mesure de la température et de l’humidité[cite: 6, 7].
* [cite_start]**Détection automatique des anomalies** : Déclenchement d'un incident si la température sort de la plage (T < 2°C ou T > 8°C)[cite: 10].
* [cite_start]**Gestion des seuils** : Possibilité pour l'administrateur de modifier les seuils critiques depuis l'interface[cite: 12].
* [cite_start]**Accès Sécurisé** : Interface multi-utilisateurs gérant des rôles distincts (opérateurs et administrateur)[cite: 3, 6].
* [cite_start]**Historisation et Traçabilité** : Archivage des mesures et détails des incidents[cite: 15, 16].
* [cite_start]**Notifications** : Envoi d'alertes immédiates (Email, Telegram)[cite: 15].
  
## 🎯 Objectifs :
- Mesurer la température et l’humidité en temps réel
- Visualiser les données via une interface web
- Stocker les données dans une base de données
- Envoyer des alertes en cas de dépassement de seuil
- Assurer la traçabilité des mesures

## ⚙️ Fonctionnement :

- Le capteur DHT11 mesure la température et l’humidité
- L’ESP envoie les données via MQTT / HTTP
- Le backend Django traite et stocke les données
- Les données sont affichées dans une interface web dynamique
- Des graphiques permettent de visualiser l’évolution
- 🚨 Des alertes sont envoyées via Email et Telegram en cas de dépassement

## 🛠️ Partie Matérielle (Hardware) :

## 🔌 Composants utilisés :

- **ESP8266 / ESP32**
- **Capteur DHT11**
- **Câbles de connexion**
- **Alimentation**

---

## 💻 Partie Logicielle (Software) :

## 🧾 Technologies utilisées :

| Technologie | Utilisation |
|---|---|
| **Python (Django)** | Backend & API |
| **SQLite / MySQL** | Base de données |
| **HTML / CSS / JavaScript** | Interface utilisateur |
| **Chart.js** | Graphiques dynamiques |
| **MQTT / HTTP** | Communication IoT |
| **Arduino IDE** | Programmation ESP |
| **Telegram API** | Notifications |
| **SMTP (Gmail)** | Envoi d’emails |

---

## 🧠 Architecture du projet :

- **ESP** → Envoi des données
- **API Django** → Réception & traitement
- **Base de données** → Stockage
- **Dashboard Web** → Visualisation
- **Système d’alerte** → Notification en temps réel

---

## 📊 Interface Web :

### 📈 Dashboard :
<p align="center">
  <img src="static/images/dashboard.png" width="500"/>
</p>

### 🌡️ Graphique Température :
<p align="center">
  <img src="static/images/temp.png" width="400"/>
</p>

### 💧 Graphique Humidité :
<p align="center">
  <img src="static/images/hum.png" width="400"/>
</p>

---

## 🚨 Système d’alerte :

- Surveillance continue des données
- Détection de dépassement de seuil
- Envoi automatique de notifications :
  - 📩 Email
  - 📱 Telegram

👉 Exemple :
"⚠️ Alerte : Température critique détectée !"

---

## 🗂️ Structure du projet :

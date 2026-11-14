#define BLYNK_TEMPLATE_ID "TMPL2tBsw_Xge"
#define BLYNK_TEMPLATE_NAME "New Template"
#define BLYNK_AUTH_TOKEN "CLZgdBPqsq3VwCZf2_XW44VldSbG9bkg"

#include <WiFi.h>
#include <BlynkSimpleEsp32.h>
#include <BluetoothSerial.h>
#include <DHT.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

char ssid[] = "A35 de Angel";
char pass[] = "1234567890";

BluetoothSerial SerialBT;

// Pines
const int PIN_TRIG = 5;
const int PIN_ECHO = 18;
const int PIN_DHT = 4;

const int LED_AMARILLO = 25;
const int LED_VERDE = 26;
const int LED_ROJO = 27;
const int PIN_BUZZER = 23;

// Distancia del sensor a la superficie del agua
const float DISTANCIA_VACIO_CM = 20.0;
const float DISTANCIA_LLENO_CM = 3.0;

#define DHTTYPE DHT11
DHT dht(PIN_DHT, DHTTYPE);

#define ANCHO_PANTALLA 128
#define ALTO_PANTALLA 64
Adafruit_SSD1306 pantalla(ANCHO_PANTALLA, ALTO_PANTALLA, &Wire, -1);

BlynkTimer timer;

bool pantallaLista = false;
bool nivelValido = false;
bool temperaturaValida = false;
bool humedadValida = false;

float distanciaCM = -1;
float nivelPorcentaje = 0;
float temperaturaC = 0;
float humedad = 0;

// Imprime la MAC del dispositivo que se conecta por Bluetooth
void eventoBluetooth(esp_spp_cb_event_t evento, esp_spp_cb_param_t *param) {
  if (evento == ESP_SPP_SRV_OPEN_EVT &&
      param->srv_open.status == ESP_SPP_SUCCESS) {
    Serial.printf(
      "Bluetooth conectado. MAC: %02X:%02X:%02X:%02X:%02X:%02X\n",
      param->srv_open.rem_bda[0],
      param->srv_open.rem_bda[1],
      param->srv_open.rem_bda[2],
      param->srv_open.rem_bda[3],
      param->srv_open.rem_bda[4],
      param->srv_open.rem_bda[5]
    );
  }

  if (evento == ESP_SPP_CLOSE_EVT) {
    Serial.println("Evento Bluetooth: dispositivo desconectado");
  }
}

float medirDistanciaCM() {
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(3);

  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);

  unsigned long duracion = pulseIn(PIN_ECHO, HIGH, 30000);

  if (duracion == 0) {
    return -1;
  }

  return duracion * 0.0343 / 2.0;
}

void actualizarNivel() {
  distanciaCM = medirDistanciaCM();

  if (distanciaCM < 0 ||
      DISTANCIA_VACIO_CM <= DISTANCIA_LLENO_CM) {
    nivelValido = false;

    digitalWrite(LED_AMARILLO, LOW);
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_ROJO, LOW);
    noTone(PIN_BUZZER);

    return;
  }

  nivelValido = true;

  nivelPorcentaje =
      (DISTANCIA_VACIO_CM - distanciaCM) /
      (DISTANCIA_VACIO_CM - DISTANCIA_LLENO_CM) * 100.0;

  nivelPorcentaje = constrain(nivelPorcentaje, 0, 100);

  // 0%: todos apagados
  // Más de 0% hasta 40%: amarillo
  // Más de 40% hasta 80%: verde
  // Más de 80%: rojo
  digitalWrite(LED_AMARILLO,
               nivelPorcentaje > 0 && nivelPorcentaje <= 40);
  digitalWrite(LED_VERDE,
               nivelPorcentaje > 40 && nivelPorcentaje <= 80);
  digitalWrite(LED_ROJO, nivelPorcentaje > 80);

  // El buzzer suena al superar el 90%
  if (nivelPorcentaje > 90) {
    tone(PIN_BUZZER, 2000);
  } else {
    noTone(PIN_BUZZER);
  }
}

void actualizarDHT() {
  float lecturaTemperatura = dht.readTemperature();
  float lecturaHumedad = dht.readHumidity();

  temperaturaValida = !isnan(lecturaTemperatura);
  humedadValida = !isnan(lecturaHumedad);

  if (temperaturaValida) {
    temperaturaC = lecturaTemperatura;
  }

  if (humedadValida) {
    humedad = lecturaHumedad;
  }
}

void actualizarPantallaYMonitorSerie() {
  actualizarNivel();
  actualizarDHT();

  // Envía solo la distancia numérica por Bluetooth, una línea cada 2 s
  if (SerialBT.hasClient()) {
    if (distanciaCM >= 0) {
      SerialBT.println(distanciaCM, 1);
    } else {
      SerialBT.println("ERROR");
    }
  }

  if (pantallaLista) {
    pantalla.clearDisplay();
    pantalla.setTextColor(SSD1306_WHITE);
    pantalla.setTextSize(1);

    // Título en la zona amarilla
    pantalla.setCursor(0, 0);
    pantalla.println("Monitor de tanque");

    // Datos en la zona azul
    pantalla.setCursor(0, 18);
    if (nivelValido) {
      pantalla.print("Nivel: ");
      pantalla.print((int)nivelPorcentaje);
      pantalla.println("%");
    } else {
      pantalla.println("Nivel: sin lectura");
    }

    pantalla.setCursor(0, 31);
    if (temperaturaValida) {
      pantalla.print("Temperatura: ");
      pantalla.print(temperaturaC, 1);
      pantalla.println(" C");
    } else {
      pantalla.println("Temp.: sin lectura");
    }

    pantalla.setCursor(0, 44);
    if (humedadValida) {
      pantalla.print("Humedad: ");
      pantalla.print(humedad, 0);
      pantalla.println("%");
    } else {
      pantalla.println("Humedad: sin lectura");
    }

    pantalla.setCursor(0, 57);
    if (nivelValido && nivelPorcentaje > 90) {
      pantalla.println("ALERTA: casi lleno");
    }

    pantalla.display();
  }

  Serial.print("Distancia: ");
  if (distanciaCM >= 0) {
    Serial.print(distanciaCM, 1);
    Serial.print(" cm");
  } else {
    Serial.print("sin lectura");
  }

  Serial.print(" | Nivel: ");
  if (nivelValido) {
    Serial.print(nivelPorcentaje, 0);
    Serial.print("%");
  } else {
    Serial.print("sin lectura");
  }

  Serial.print(" | Temperatura: ");
  if (temperaturaValida) {
    Serial.print(temperaturaC, 1);
    Serial.print(" C");
  } else {
    Serial.print("sin lectura");
  }

  Serial.print(" | Humedad: ");
  if (humedadValida) {
    Serial.print(humedad, 0);
    Serial.println("%");
  } else {
    Serial.println("sin lectura");
  }
}

void enviarDatosABlynk() {
  if (!Blynk.connected()) {
    return;
  }

  // V0: nivel porcentual
  // V1: temperatura
  // V2: humedad
  if (nivelValido) {
    Blynk.virtualWrite(V0, (int)nivelPorcentaje);
  }

  if (temperaturaValida) {
    Blynk.virtualWrite(V1, temperaturaC);
  }

  if (humedadValida) {
    Blynk.virtualWrite(V2, humedad);
  }
}

void intentarConexion() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Intentando conectar al Wi-Fi...");
    WiFi.reconnect();
    return;
  }

  if (!Blynk.connected()) {
    Serial.println("Wi-Fi conectado; intentando conectar a Blynk...");
    Blynk.connect(1000);
  }
}

void setup() {
  Serial.begin(115200);

  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);

  pinMode(LED_AMARILLO, OUTPUT);
  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_ROJO, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);

  digitalWrite(PIN_TRIG, LOW);
  digitalWrite(LED_AMARILLO, LOW);
  digitalWrite(LED_VERDE, LOW);
  digitalWrite(LED_ROJO, LOW);
  noTone(PIN_BUZZER);

  dht.begin();

  // Iniciar Bluetooth clásico y registrar eventos
  SerialBT.register_callback(eventoBluetooth);
  bool bluetoothIniciado = SerialBT.begin("TanqueESP32");

  if (bluetoothIniciado) {
    Serial.println("Bluetooth activo: TanqueESP32");
  } else {
    Serial.println("ERROR: no se pudo iniciar Bluetooth");
  }

  // OLED: SDA = GPIO 21, SCL = GPIO 22
  Wire.begin(21, 22);
  pantallaLista = pantalla.begin(SSD1306_SWITCHCAPVCC, 0x3C);

  if (pantallaLista) {
    pantalla.clearDisplay();
    pantalla.setTextColor(SSD1306_WHITE);
    pantalla.setTextSize(1);
    pantalla.setCursor(0, 0);
    pantalla.println("Iniciando...");
    pantalla.display();
  } else {
    Serial.println("No se detecto la OLED en 0x3C");
  }

  WiFi.mode(WIFI_STA);
  WiFi.setAutoReconnect(true);
  WiFi.begin(ssid, pass);

  Blynk.config(BLYNK_AUTH_TOKEN);

  timer.setInterval(2000L, actualizarPantallaYMonitorSerie);
  timer.setInterval(5000L, enviarDatosABlynk);
  timer.setInterval(10000L, intentarConexion);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    Blynk.run();
  }

  timer.run();

  // Informa cuando cambia el estado de la conexión Bluetooth
  static bool conectadoAntes = false;
  bool conectadoAhora = SerialBT.hasClient();

  if (conectadoAhora != conectadoAntes) {
    if (conectadoAhora) {
      Serial.println("Hay un dispositivo conectado por Bluetooth");
    } else {
      Serial.println("No hay dispositivo conectado por Bluetooth");
    }

    conectadoAntes = conectadoAhora;
  }
}
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Animated,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router"; // Importa Link

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const { width } = useWindowDimensions();

  const images = [
    require("../../assets/images/perross.png"),
    require("../../assets/images/carrusel2.png"),
    require("../../assets/images/carrusel3.png"),
    require("../../assets/images/perrogato.png"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        flatListRef.current.scrollToIndex({ index: nextIndex });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <View style={styles.carousel}>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Image source={item} style={[styles.carouselImage, { width }]} />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onScroll={(e) => {
          const index = Math.floor(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
    </View>
  );
};

const IconSection = () => {
  const iconData = [
    {
      icon: "🐶",
      description: "Mascotas",
      text: "Descubre una gran variedad de mascotas, listas para ser adoptadas y llevar alegría a tu hogar.",
    },
    {
      icon: "🐱",
      description: "Gatos",
      text: "Encuentra gatos de diferentes razas y tamaños, ideales para tu compañía.",
    },
    {
      icon: "🐰",
      description: "Conejos",
      text: "Conejitos tiernos y cariñosos, perfectos para cualquier hogar.",
    },
    {
      icon: "🐦",
      description: "Aves",
      text: "Aves exóticas y coloridas que llenarán tu casa de vida y alegría.",
    },
    {
      icon: "🐠",
      description: "Peces",
      text: "Peces de agua dulce y salada, con opciones ideales para acuarios de todos los tamaños.",
    },
    {
      icon: "🐹",
      description: "Roedores",
      text: "Roedores fascinantes para aquellos que buscan una mascota fuera de lo común.",
    },
  ];

  return (
    <View style={styles.iconSection}>
      {iconData.map((item, index) => (
        <View key={index} style={styles.iconBox}>
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={styles.iconDescription}>{item.description}</Text>
          <Text style={styles.iconDescriptionText}>{item.text}</Text>
        </View>
      ))}
    </View>
  );
};

const CategoryCard = ({ title, description, image }) => (
  <View style={styles.card}>
    <Image source={image} style={styles.cardImage} />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </View>
);

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    animate();
  }, [scaleAnim]);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logopetmatch.png")}
          style={styles.logo}
        />
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <FontAwesome name="bars" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <Carousel />

      {/* Sub Menu */}
      <View style={styles.subMenu}>
        <TouchableOpacity style={styles.subMenuItem}>
          <Image
            source={require("../../assets/images/icon1.png")}
            style={styles.icon}
          />
          <Text style={styles.subMenuText}>Variedad De Mascotas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subMenuItem}>
          <Image
            source={require("../../assets/images/icon2.png")}
            style={styles.icon}
          />
          <Text style={styles.subMenuText}>Reseñas</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Animated.Text
          style={[styles.title, { transform: [{ scale: scaleAnim }] }]}
        >
          ¡Encuentra a tu Nuevo Mejor Amigo en Petmatch!
        </Animated.Text>
        <View style={styles.decorativeCircleTop} />
        <View style={styles.decorativeCircleBottom} />
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Bienvenido a PetMatch, tu tienda especializada en la venta de mascotas.
        Ofrecemos una amplia selección de animales de compañía, desde perros y
        gatos hasta aves y pequeños mamíferos. En PetMatch, nos aseguramos de
        que cada mascota esté saludable y lista para convertirse en un querido
        miembro de tu familia.
      </Text>

      {/* Icon Section */}
      <IconSection />

      {/* Footer */}
      <View style={styles.footerContainer}>
        {/* Sección 1 */}
        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>
            🐾 ¡Estamos aquí para ayudarte! 🐾
          </Text>
          <Text style={styles.footerText}>
            📅 <Text style={styles.bold}>Lunes a Viernes:</Text> 9:00 AM - 7:00
            PM{"\n"}
            🕒 <Text style={styles.bold}>Sábados:</Text> 10:00 AM - 2:00 PM
            {"\n"}
            🚪 <Text style={styles.bold}>Domingos y festivos:</Text> Cerrado,
            ¡nos vemos el lunes!
          </Text>
          <Text style={styles.petQuote}>
            "Porque un hogar no está completo sin una pata que lo haga feliz."
          </Text>
        </View>

        {/* Sección 2 */}
        <View style={styles.footerSection}>
          <Image
            source={require("../../assets/images/logopetmatch.png")}
            style={styles.logo}
          />
          <View style={styles.socialIcons}>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/faceb.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/whats.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/insta.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sección 3 */}
        <View style={styles.footerSection}>
          <Text style={styles.footerTitle}>
            ¿🐾 Buscas un nuevo amigo peludo? 🐾
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>
              ¡Conoce nuestras mascotas disponibles!
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer Bottom */}
        <View style={styles.footerBottom}>
          <Text style={styles.footerBottomText}>
            🐾 "La felicidad se mide en colitas que se mueven". © 2024 PetMatch
            🐾
          </Text>
          <Text style={styles.footerBottomText}>
            Con amor y dedicación |{" "}
            <Text style={styles.linkText}>Política de Privacidad</Text> |{" "}
            <Text style={styles.linkText}>Términos y Condiciones</Text>
          </Text>
        </View>
      </View>
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)} // Permite cerrar el menú con el botón de atrás en Android
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)} // Cierra el menú al tocar fuera de él
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Mascotas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Reseñas</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#2196F3",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  headerButtons: {
    flexDirection: "row",
  },
  registerButton: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  registerButtonText: {
    color: "#f08",
  },
  menuButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 50,
    borderRadius: 10,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  registerButton: {
    backgroundColor: "#64b5f6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginRight: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  carousel: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    overflow: "hidden", // Asegura que las imágenes no sobresalgan del contenedor
  },
  carouselImage: {
    height: "100%",
    resizeMode: "cover",
  },
  subMenu: {
    backgroundColor: "#f9f9f9", // Color de fondo más claro
    paddingVertical: 10, // Reducido padding vertical
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1.5, // Reducido tamaño del borde
    borderColor: "#d1d1d1", // Color de borde más suave
    borderRadius: 8, // Reducido borde redondeado
    marginBottom: 15, // Reducido margen inferior
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 }, // Reducido desplazamiento de sombra
    shadowOpacity: 0.1,
    shadowRadius: 6, // Reducido radio de sombra
    elevation: 3, // Reducido tamaño de sombra en Android
  },
  subMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // Reducido espacio entre icono y texto
    paddingVertical: 6, // Reducido padding vertical
    paddingHorizontal: 12, // Reducido padding horizontal
    borderRadius: 16, // Reducido borde redondeado
  },
  subMenuText: {
    fontSize: 16, // Reducido tamaño de fuente
    color: "#1b7ff1", // Azul intermedio
  },
  icon: {
    width: 20, // Reducido tamaño del icono
    height: 20, // Reducido tamaño del icono
  },
  titleContainer: {
    position: "relative",
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24, // Reducido a tamaño más pequeño
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#a2c2e3",
    borderRadius: 8, // Reducido tamaño del borde redondeado
    paddingVertical: 8, // Reducido padding vertical
    paddingHorizontal: 16, // Reducido padding horizontal
    textAlign: "center",
    overflow: "hidden",
    elevation: 3, // Reducido tamaño de sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 3 }, // Reducido desplazamiento de sombra
    shadowOpacity: 0.2,
    shadowRadius: 6, // Reducido radio de sombra
  },

  description: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    color: "#555",
  },

  iconSection: {
    flexDirection: "row",
    flexWrap: "wrap", // Permite que los íconos se envuelvan en varias filas
    justifyContent: "space-between", // Espacio uniforme entre íconos
    padding: 20,
    backgroundColor: "#fffbe9", // Fondo amarillo pálido
    borderRadius: 20, // Bordes redondeados
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // Sombra pronunciada
  },
  iconBox: {
    backgroundColor: "#ffffff", // Fondo blanco
    padding: 10,
    borderRadius: 15, // Bordes redondeados
    borderWidth: 2,
    borderColor: "#ffcc00", // Borde amarillo brillante
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3, // Para sombra en Android
    marginBottom: 20,
    width: "48%", // Ajusta para dos íconos por fila
    alignItems: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#4a90e2", // Color azul vibrante
    borderRadius: 40, // Hace el ícono circular
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    // En React Native, el efecto de hover no está disponible, así que no incluimos transformaciones aquí.
  },
  iconText: {
    fontSize: 40,
    color: "#ffffff", // Color del ícono blanco
  },
  iconDescription: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a90e2", // Color de texto azul que combina con el ícono
    marginBottom: 10,
  },
  iconText: {
    fontSize: 16,
    color: "#333", // Color de texto oscuro para descripciones
    lineHeight: 1.5, // Espaciado entre líneas para mejor legibilidad
  },
  footerContainer: {
    backgroundColor: "#5da5e1",
    padding: 2, // Reducido padding
    justifyContent: "center",
    alignItems: "center",
  },
  footerSection: {
    alignItems: "center",
    marginVertical: 2, // Reducido margen vertical
  },
  footerTitle: {
    fontSize: 12, // Reducido tamaño de fuente
    color: "#f0f0f0",
    marginBottom: 4, // Reducido margen inferior
    textAlign: "center",
  },
  footerText: {
    fontSize: 11, // Reducido tamaño de fuente
    color: "#fff",
    textAlign: "center",
    lineHeight: 14, // Reducido line height
  },
  bold: {
    fontWeight: "bold",
  },
  petQuote: {
    fontStyle: "italic",
    fontSize: 12, // Reducido tamaño de fuente
    color: "#ffe4b5",
    marginTop: 2, // Reducido margen superior
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -5, // Ajustado margen superior
  },
  icon: {
    width: 18, // Reducido tamaño del ícono
    height: 18, // Reducido tamaño del ícono
    marginHorizontal: 6, // Reducido margen horizontal
  },
  contactButton: {
    backgroundColor: "#ffcc66",
    paddingVertical: 6, // Reducido padding vertical
    paddingHorizontal: 12, // Reducido padding horizontal
    borderRadius: 10, // Ajustado borde redondeado
    marginTop: 2, // Reducido margen superior
  },
  contactButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 12, // Ajustado tamaño de fuente
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: "#fff",
    paddingTop: 2, // Reducido padding superior
    alignItems: "center",
    width: "100%",
  },
  footerBottomText: {
    fontSize: 8, // Reducido tamaño de fuente
    color: "#fff",
    textAlign: "center",
    marginVertical: 1, // Reducido margen vertical
  },
  linkText: {
    textDecorationLine: "underline",
  },
});

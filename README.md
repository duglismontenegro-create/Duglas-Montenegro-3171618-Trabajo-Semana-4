# 🚚 Mudanzas Duglas S.A. - Gestión de Estado Global con Zustand

Este proyecto corresponde a la entrega de la **Semana 04**, donde se integra **Zustand** como solución de estado global en una aplicación móvil desarrollada con **React Native**, **TypeScript** y **Expo (SDK 51)**. La aplicación simula una plataforma para la exploración y cotización de servicios de mudanzas y acarreos.

## 🎯 Objetivos y Requisitos Cumplidos

- **Estado Global con Zustand:** Implementación de un store centralizado (`useSavedStore`) utilizando el método de inicialización fuertemente tipado `create<Interface>()` sin recurrir a tipos dinámicos o `any`.
- **Acciones del Store:** El almacén global expone 3 métodos clave de manipulación de estado:
  - `addItem`: Agrega un servicio evitando duplicados.
  - `removeItem`: Elimina un servicio específico mediante su identificador.
  - `clearStore`: Vacía por completo la lista de cotizaciones con un solo toque.
- **Selectores de Zustand Eficientes:** Consumo de datos optimizado en pantallas mediante selectores específicos (ej. `state.savedItems`), evitando renderizados innecesarios en la interfaz.
- **Contador en Tiempo Real (Badge):** La pestaña de cotizaciones muestra dinámicamente el número de servicios guardados mediante la propiedad `tabBarBadge`, actualizándose de forma inmediata sin necesidad de *prop drilling*.
- **Interfaz de Detalle Reactiva:** El botón de acción en `DetailScreen` cambia de forma automática entre "Guardar Cotización" (Color Primario) y "Quitar de Cotizaciones" (Color Rojo) leyendo en tiempo real el estado del store.

## 🗂️ Estructura del Proyecto

```text
starter/
├── App.tsx                         # Contenedor raíz y NavigationContainer
├── app.json                        # Configuración nativa del proyecto Expo
├── package.json                    # Dependencias del proyecto (incluye Zustand)
├── tsconfig.json                   # Reglas estrictas de compilación TypeScript
└── src/
    ├── navigation/
    │   ├── RootNavigator.tsx       # Navegación Tab + Stack con Badge reactivo
    │   └── types.ts                # Tipado estricto de rutas y parámetros
    ├── stores/
    │   └── savedStore.ts           # Store global de Zustand (Interface SavedState)
    ├── screens/
    │   ├── HomeScreen.tsx          # Lista con buscador y alternador de marcadores
    │   ├── DetailScreen.tsx        # Detalle del servicio conectado al store global
    │   └── SavedScreen.tsx         # Listado de servicios agregados a cotización
    ├── data/
    │   └── mockData.ts             # Datos estructurados en perfecto español (10 servicios)
    ├── types/
    │   └── index.ts                # Interfaz del modelo de datos MovingService
    └── theme/
        └── index.ts                # Constantes de diseño (Design System)
🛠️ Tecnologías Utilizadas
Framework: React Native + Expo (SDK 51)

Gestión de Estado: Zustand (^4.5.2)

Navegación: React Navigation 7 (Tab + Stack anidado)

Lenguaje: TypeScript (Modo estricto activado)

⚙️ Instalación y Ejecución
Clonación del proyecto:

Bash
git clone [URL-DE-TU-REPOSITORIO]
cd starter
Instalación de paquetes de node:

Bash
npm install --legacy-peer-deps
Arranque inicial limpiando la caché del entorno:

Bash
npx expo start --clear
📋 Checklist de Criterios de Evaluación
[x] Arquitectura de Zustand implementada mediante create<Interface>().

[x] Consumo del estado global mediante selectores de rendimiento específicos.

[x] Mínimo 2 acciones operativas en el store (Implementadas: 3 acciones).

[x] Badge reactivo incorporado en el Tab Bar que cuenta ítems en tiempo real.

[x] Botón dinámico interactivo (Guardar / Quitar) configurado en la pantalla de detalles.

[x] Código fuente completamente tipado en TypeScript sin presencia de tipados débiles (any).

Desarrollado por: Duglas Montenegro

Programa: Análisis y Desarrollo de Software

Institución: SENA - 2026

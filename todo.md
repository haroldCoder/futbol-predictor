# FutbolPredictor - TODO

## Setup & Configuración
- [x] Generar logo de la app (verde/azul/negro, balón de fútbol)
- [x] Configurar tema de colores (verde, azul oscuro, negro)
- [x] Actualizar app.config.ts con nombre y logo
- [x] Configurar tailwind.config.js con paleta de colores

## Navegación
- [x] Configurar 4 tabs: Inicio, Partidos, Ligas, Stats
- [x] Agregar iconos a icon-symbol.tsx
- [x] Configurar tab bar con estilo oscuro

## Datos y Lógica
- [x] Crear tipos TypeScript para partidos, equipos, ligas, predicciones
- [x] Crear datos mock de ligas (Champions, Premier, LaLiga, Serie A, etc.)
- [x] Crear datos mock de equipos con escudos (emojis/colores)
- [x] Crear datos mock de partidos próximos
- [x] Implementar lógica de predicción (algoritmo basado en estadísticas)
- [x] Crear hook useFootball para gestionar datos
- [x] Tests de datos y predicciones

## Pantalla Home
- [x] Header con logo y badge de precisión
- [x] Banner partido destacado del día
- [x] Sección próximos partidos (lista vertical)
- [x] Stats rápidas del modelo (3 tarjetas)

## Pantalla Partidos
- [x] Filtro por liga (chips horizontales)
- [x] Lista de partidos con MatchCard
- [x] Indicadores de estado (Próximo/En Vivo/Finalizado)

## Pantalla Detalle de Partido
- [x] Header con escudos y nombres de equipos
- [x] Predicción con barras de probabilidad (PredictionBar)
- [x] Estadísticas de forma reciente (FormIndicator)
- [x] Head to Head (historial)
- [x] Estadísticas clave comparativas

## Pantalla Ligas
- [x] Selector de ligas (chips horizontales)
- [x] Tabla de posiciones por liga
- [x] Colores por posición (oro, plata, bronce)

## Pantalla Stats
- [x] Porcentaje de aciertos del modelo (grande)
- [x] Aciertos por liga con barras
- [x] Información del modelo
- [x] Distribución de predicciones

## Componentes
- [x] MatchCard — Card de partido con predicción
- [x] PredictionBar — Barra de probabilidades
- [x] FormIndicator — Forma reciente W/D/L
- [x] SectionHeader — Encabezado de sección
- [x] FeaturedMatchBanner — Banner partido destacado
- [x] SkeletonCard — Loading skeleton

## Diseño y Pulido
- [x] Modo oscuro permanente (verde/azul/negro)
- [x] Gradientes en headers y cards
- [x] Feedback visual en interacciones (opacity)
- [x] Colores semánticos (verde=victoria, rojo=derrota, naranja=empate)

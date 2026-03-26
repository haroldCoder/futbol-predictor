# FutbolPredictor — Plan de Diseño

## Identidad Visual

**Paleta de colores:**
- **Verde principal:** `#00C853` (verde brillante de cancha de fútbol)
- **Azul oscuro:** `#0D1B2A` (fondo principal, profundo)
- **Azul medio:** `#1A3A5C` (superficies / cards)
- **Azul acento:** `#1565C0` (botones, highlights)
- **Negro:** `#050D14` (fondo más oscuro)
- **Blanco / texto:** `#E8F4FD` (texto principal)
- **Gris muted:** `#7B9BB5` (texto secundario)
- **Borde:** `#1E3A55` (divisores)
- **Éxito:** `#00C853` (verde)
- **Advertencia:** `#FF9800`
- **Error:** `#F44336`

**Tipografía:** Sistema nativo (SF Pro en iOS, Roboto en Android)
**Estilo:** Dark mode permanente, glassmorphism sutil, bordes redondeados, gradientes suaves

---

## Pantallas

### 1. Home (Inicio)
**Contenido:**
- Header con logo + nombre de la app + icono de notificaciones
- Banner de "Partido Destacado del Día" con predicción en grande
- Sección "Próximos Partidos" (lista horizontal de cards)
- Sección "Predicciones Recientes" (lista vertical)
- Stats rápidas: porcentaje de aciertos del modelo

**Funcionalidad:**
- Navegar a detalle de partido
- Ver predicción rápida en card
- Pull-to-refresh para actualizar datos

### 2. Partidos (Matches)
**Contenido:**
- Filtro por liga (tabs horizontales: Champions, Premier, LaLiga, etc.)
- Lista de partidos del día / semana
- Card de partido: equipos, hora, liga, predicción con porcentaje
- Indicador de estado: Próximo / En Vivo / Finalizado

**Funcionalidad:**
- Filtrar por liga
- Filtrar por fecha (hoy, mañana, semana)
- Navegar a detalle de partido

### 3. Detalle de Partido
**Contenido:**
- Escudos y nombres de equipos
- Fecha, hora y estadio
- Predicción del resultado con barras de probabilidad
- Estadísticas de forma reciente (últimos 5 partidos)
- Head to Head (historial de enfrentamientos)
- Estadísticas clave: goles por partido, posesión promedio, etc.

**Funcionalidad:**
- Ver análisis detallado
- Ver historial de enfrentamientos
- Compartir predicción

### 4. Ligas (Leagues)
**Contenido:**
- Grid de ligas disponibles con logos
- Tabla de posiciones de la liga seleccionada
- Estadísticas de la liga: goleadores, etc.

**Funcionalidad:**
- Seleccionar liga para ver tabla
- Ver equipos de la liga

### 5. Perfil / Stats
**Contenido:**
- Estadísticas del modelo de predicción
- Porcentaje de aciertos por liga
- Historial de predicciones pasadas
- Configuración de ligas favoritas

---

## Flujos de Usuario Clave

### Flujo 1: Ver predicción de partido
Home → Card de partido → Detalle de partido → Ver probabilidades y análisis

### Flujo 2: Buscar partido por liga
Tab "Partidos" → Seleccionar liga → Filtrar por fecha → Ver partido → Detalle

### Flujo 3: Ver tabla de posiciones
Tab "Ligas" → Seleccionar liga → Ver tabla de posiciones

---

## Navegación

**Tab Bar (4 tabs):**
1. 🏠 Inicio
2. ⚽ Partidos
3. 🏆 Ligas
4. 📊 Stats

**Modales / Stack:**
- Detalle de partido (push desde cualquier tab)

---

## Componentes Clave

- `MatchCard` — Card compacta de partido con predicción
- `PredictionBar` — Barra de probabilidad (Local / Empate / Visitante)
- `TeamBadge` — Escudo de equipo con nombre
- `LeagueChip` — Chip de liga con logo
- `FormIndicator` — Indicador de forma (W/D/L últimos 5)
- `StatsRow` — Fila de estadística con label y valor
- `SectionHeader` — Encabezado de sección con título y acción "Ver todo"

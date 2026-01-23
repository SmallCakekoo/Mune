# 📋 Estado del Proyecto Mune

> **Última actualización:** 22 de enero de 2026

## 🎯 Prioridades

### 1. 🎨 Modo Claro con WCAG (Accesibilidad) - **PENDIENTE**
**Estado:** ⚠️ En desarrollo parcial

El sistema de temas ya soporta los modos `light`, `dark` y `system`, pero falta completar la implementación del modo claro con estándares de accesibilidad WCAG.

**Archivos relacionados:**
- `src/context/ThemeContext.ts` - Define tipos de tema y apariencia
- `src/context/ThemeProvider.tsx` - Implementa el proveedor de temas

**Tareas pendientes:**
- [ ] Completar estilos CSS para el modo claro (`data-appearance="light"`)
- [ ] Asegurar contraste WCAG AA (mínimo 4.5:1 para texto normal)
- [ ] Asegurar contraste WCAG AAA (mínimo 7:1 para texto normal) donde sea posible
- [ ] Verificar todos los componentes en modo claro
- [ ] Añadir indicadores de enfoque visibles para navegación por teclado
- [ ] Probar legibilidad de texto en todos los estados (hover, active, disabled)
- [ ] Validar con herramientas de accesibilidad (axe, WAVE, Lighthouse)

#### 🐛 Problemas Específicos del Modo Claro Detectados

##### 🎨 **Logo y Marca**
- [x] **Logo blanco en fondo blanco** - Aplicar filtro inverso o cambiar color según tema

##### 📄 **Landing Page**
- [x] **"Music Together"** - No funciona ni en modo oscuro ni claro (falta implementación)
- [x] **Colores de íconos** - Bajo contraste y visibilidad
- [x] **"Start Creating" - Números** - Casi invisibles (círculo gris claro sobre fondo claro)
- [x] **Sección "Get Started Free"** - Texto blanco/gris claro en fondo blanco

##### 🔐 **Autenticación (Login/Register/Forgot Password)**
- [x] **Botones GitHub y Google** - Fondo blanco + texto blanco + logo blanco (invisible)
- [x] **Logo de aplicación** - Blanco en fondo blanco
- [x] **Checkbox "Términos y condiciones"** - No visible
- [x] **Texto checkbox hover** - Se vuelve blanco al hacer hover (debería ser negro)
- [x] **Botón "Enviar enlace" (Forgot Password)** - Blanco con letra blanca
  - Solo se ve en hover (se vuelve negro con letra blanca)
  - El estado normal debería ser visible

##### 🏠 **Home Page**
- [x] **Fondo vs Barra de búsqueda** - Ambos gris claro, no se distinguen
- [x] **Cards de salas** - No contrastan con el fondo gris claro
  - Falta contorno suave o sombra para diferenciarlas
- [x] **Modal "Crear Nueva Sala"** - Cuando está seleccionado público/privado:
  - Texto blanco + logo blanco (no se ve)
- [x] **Todo List (Lista de tareas)**:
  - Texto se escribe en blanco sobre fondo blanco (casi invisible)
  - Solo se ve negro cuando se marca como completada
- [x] **Barra de búsqueda** - El texto al escribir aparece en blanco (debería ser negro)

##### 🧭 **Barra de Navegación**
- [x] **Íconos** - Blancos en fondo blanco (no visibles)
- [x] **Página activa** - Ícono aparece blanco
  - Debería ser del color del tema seleccionado (morado, azul, cyan, verde, rojo)

##### 🎵 **Room/Sala**
- [x] **Reproductor de Música**:
  - Íconos blancos en fondo blanco
  - Nombres de canciones en búsqueda: texto blanco
- [x] **Panel de Miembros**:
  - Número total de miembros (colapsado): blanco sobre blanco (invisible)
  - Nombre de usuario (expandido): blanco (debería ser negro o color del tema)
  - En hover se resalta en azul correctamente ✅

##### 🔍 **Explorar/Buscar Salas**
- [x] **Cards de salas** - Mismo problema que Home (no se diferencian del fondo)
- [x] **Barra de búsqueda** - Texto blanco al escribir (debería ser negro)

##### 👤 **Perfil de Usuario**
- [x] **Nombre de usuario grande** - En negro
  - Debería ser blanco para mejor contraste con el banner de fondo

##### ⚙️ **Configuraciones**
- [x] **Texto "Tu tema de preferencia está automáticamente guardado en el local storage"**
  - Baja visibilidad/contraste
- [x] **Tracks - Nombre del artista** - Blanco (debería ser negro)
- [x] **Modal Selección de Canción**:
  - Sin cursor pointer para indicar seleccionable
  - Nombre de canción en blanco sobre fondo blanco
  - Sin contenedor/borde para delimitar cada opción
  - Checkbox casi invisible (blanco hasta que se selecciona)
- [x] **Barra de búsqueda de música** - Texto blanco al escribir

---

#### 🎯 Patrón de Problemas Comunes

**1. Campos de texto/búsqueda:**
- Todos escriben en blanco cuando deberían escribir en negro o color oscuro

**2. Botones y controles:**
- Aparecen blancos en fondos blancos sin contraste suficiente
- Solo funcionan correctamente en estado hover

**3. Íconos:**
- Mayormente blancos en fondos blancos/claros

**4. Cards y contenedores:**
- Falta diferenciación del fondo mediante bordes, sombras o contornos

**5. Estados activos/seleccionados:**
- No usan el color de tema seleccionado
- Aparecen en blanco en lugar de color temático

---

### 2. 🎵 Integración de Música con API - **PENDIENTE**
**Estado:** ⚠️ Sin implementar

Actualmente la música está completamente mockeada con datos estáticos. La integración con Deezer API está pendiente.

**Archivos relacionados:**
- `src/services/api/musicApi.ts` - **VACÍO** (pendiente de implementación)
- `src/components/room/RoomMusicPlayer/RoomMusicPlayer.tsx` - Usa datos mock

**Detalles del mock actual:**
```typescript
// Líneas 93-97 en RoomMusicPlayer.tsx
const mockSongs: Track[] = [
    { id: '1', title: 'BUEN DÍA PORTACIÓN', artist: 'Milo J', duration: 210, ... },
    { id: '2', title: 'RETIRADA', artist: 'Milo J', duration: 172, ... },
    { id: '3', title: 'Cuando El Agua Hirvie', artist: 'Milo J', duration: 177, ... },
];
```

**Tareas pendientes:**
- [ ] Implementar `musicApi.ts` con endpoints de Deezer
- [ ] Crear servicio para búsqueda de canciones
- [ ] Implementar autenticación con Deezer API
- [ ] Integrar reproductor real de audio
- [ ] Sincronizar reproducción entre usuarios de la sala
- [ ] Migrar de datos mock a API real en `RoomMusicPlayer`
- [ ] Implementar caché de búsquedas y canciones
- [ ] Añadir manejo de errores de API

---

## 📊 Estado de Componentes Mockeados

### ✅ Datos de Usuario - **MOCK COMPLETO**
**Archivo:** `src/data/mockUsers.ts`

**Datos mockeados:**
- Usuarios de ejemplo (Snow Cat, Soviet Cat, DJ Meow, etc.)
- Avatares de gatos
- Canciones favoritas
- Estadísticas de usuario (salas creadas, minutos gastados)
- Salas de ejemplo con datos estáticos

**Estado:** 
- ✅ `MOCK_USERS` - Diccionario de usuarios mock
- ✅ `MOCK_USER_ROOMS` - Diccionario de salas por usuario

**Migración pendiente:**
- Reemplazar con datos reales de Firestore una vez se implementen usuarios reales

---

### ⚠️ Reproductor de Música - **MOCK PARCIAL**
**Archivo:** `src/components/room/RoomMusicPlayer/RoomMusicPlayer.tsx`

**Funcionalidad mockeada:**
- ✅ Lista de canciones hardcodeada (3 canciones de Milo J)
- ✅ Controles de reproducción (play/pause/skip) - UI solamente
- ✅ Cola de reproducción - almacenada en estado local
- ✅ Historial de reproducción - almacenado en estado local
- ✅ Barra de búsqueda - filtra solo lista mock
- ❌ No hay reproducción real de audio
- ❌ No hay integración con Deezer API

**Razón del mock:** 
La API de música aún no está implementada. Esperando implementación de `musicApi.ts`.

---

### ✅ Selección de Canción Favorita - **MOCK COMPLETO**
**Archivo:** `src/components/profile/FavoriteSongSelectionModal/FavoriteSongSelectionModal.tsx`

**Comentario en el código (línea 15):**
```typescript
// Mock available songs based on files in src/assets/images/album
```

**Estado:**
- Usa imágenes de álbum almacenadas localmente en `src/assets/images/album`
- Las canciones disponibles están hardcodeadas basándose en archivos locales

---

### 🎨 Elementos de UI de Landing - **MOCK SOLO VISUAL**
**Archivos:**
- `src/components/landing/Hero.tsx` (línea 78) - Mock de elementos de UI
- `src/pages/BehanceShowcase/sections/ShowcaseSection.tsx` (línea 43) - Mock UI Overlay

**Estado:**
- Son solo elementos visuales decorativos
- No tienen funcionalidad backend
- Utilizados únicamente para demostración visual

---

## 🔥 Servicios Backend Implementados

### ✅ Firebase - **IMPLEMENTADO**
Los siguientes servicios están completamente funcionales:

- ✅ **Autenticación** - `src/services/auth.service.ts`
- ✅ **Firestore Database** 
  - `src/services/room.service.ts` - Gestión de salas
  - `src/services/room-members.service.ts` - Gestión de miembros
  - `src/services/room-notes.service.ts` - Gestión de notas
  - `src/services/room-playlist.service.ts` - Gestión de playlists
  - `src/services/user.service.ts` - Gestión de usuarios
  - `src/services/category.service.ts` - Gestión de categorías
  - `src/services/task.service.ts` - Gestión de tareas
- ✅ **Presence** - `src/services/presence.service.ts` - Estado en tiempo real

### ⚠️ Firebase Storage - **PARCIAL**
**Directorio:** `src/services/storage/`

**Estado:** Implementado pero verificar integración completa

---

## 🎵 Recursos de Audio

### ✅ Audios Mock Locales
**Directorio:** `src/assets/audios/`

**Archivos disponibles:**
- `do.wav` (194 KB)
- `mi.wav` (183 KB)
- `sol.wav` (189 KB)

**Estado:** 
- Archivos de audio de demostración
- No se están utilizando actualmente
- Pendiente: Integrar o eliminar según necesidad

---

## 📝 Tareas TODO Detectadas

### TodoList Implementation
**Archivos con implementación de TODO:**
- `src/components/home/TodoList/TodoList.tsx` - ✅ Implementado
- `src/pages/Home/Home.tsx` - ✅ Implementado
- `src/components/room/Note/Note.tsx` - ✅ Implementado (notas tipo todo)
- `src/types/room.types.ts` - ✅ Tipos definidos

**Estado:** ✅ Funcionalidad de lista de tareas implementada

---

## 🔜 Próximos Pasos

### Inmediato (Prioridad Alta)
1. **Completar modo claro con WCAG AA/AAA**
   - Revisar todos los componentes
   - Ajustar colores y contrastes
   - Validar accesibilidad

2. **Implementar API de Música**
   - Configurar credenciales de Deezer
   - Implementar `musicApi.ts`
   - Integrar reproductor real

### Mediano Plazo
3. Migrar datos mock de usuarios a datos reales de Firestore
4. Implementar sincronización de música en tiempo real entre usuarios
5. Añadir más funcionalidades de playlist

### Largo Plazo
6. Optimización de rendimiento
7. Tests automatizados
8. Documentación de API

---

## 📌 Notas Adicionales

### Variables de Entorno Requeridas
Según `README.md`, se necesitan las siguientes variables:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_DEEZER_APP_ID=your_deezer_app_id  # ⚠️ Pendiente para implementar música
```

### Dependencias Clave
- **Firebase**: ✅ Instalado y configurado
- **Deezer API**: ⚠️ Credenciales pendientes
- **TailwindCSS 4**: ✅ Instalado (para estilos de accesibilidad)

---

## 🎨 Resumen de Estado

| Funcionalidad | Estado | Prioridad |
|--------------|--------|-----------|
| 🎨 Modo Claro + WCAG | ⚠️ Parcial | 🔴 Alta |
| 🎵 API de Música | ❌ Pendiente | 🔴 Alta |
| 👤 Datos de Usuario | ✅ Mock | 🟡 Media |
| 🎵 Reproductor UI | ✅ Implementado | ✅ Completo |
| 🔥 Firebase Backend | ✅ Implementado | ✅ Completo |
| 📝 Sistema de Tareas | ✅ Implementado | ✅ Completo |
| 🎨 Sistema de Temas | ✅ Implementado | ✅ Completo |

---

**Leyenda:**
- ✅ Completo / Implementado
- ⚠️ Parcialmente implementado
- ❌ No implementado / Pendiente
- 🔴 Prioridad Alta
- 🟡 Prioridad Media
- 🟢 Prioridad Baja

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type enum - tipos de commits permitidos
    'type-enum': [
      2,
      'always',
      [
        'feat',      // Nueva funcionalidad
        'fix',       // Corrección de bug
        'docs',      // Documentación
        'style',     // Formato, punto y coma faltantes, etc (no cambios de código)
        'refactor',  // Refactorización de código
        'perf',      // Mejoras de rendimiento
        'test',      // Agregar tests
        'build',     // Cambios en el sistema de build o dependencias
        'ci',        // Cambios en CI/CD
        'chore',     // Tareas de mantenimiento
        'revert',    // Revertir commits anteriores
        'wip',       // Work in progress (usar con moderación)
      ],
    ],
    // El scope es opcional pero recomendado
    'scope-enum': [
      2,
      'always',
      [
        'auth',       // Autenticación
        'home',       // Página Home
        'room',       // Sala/Room
        'canvas',     // Canvas tipo Figma
        'music',      // Reproductor musical
        'profile',    // Perfil de usuario
        'theme',      // Temas y estilos
        'api',        // Servicios API
        'firebase',   // Configuración Firebase
        'ui',         // Componentes UI
        'router',     // Enrutamiento
        'hooks',      // Custom hooks
        'utils',      // Utilidades
        'types',      // Tipos TypeScript
        'config',     // Configuración general
        'deps',       // Dependencias
        'landing',    // Landing page
        'playlist',   // Playlist
      ],
    ],
    'scope-case': [2, 'always', 'lower-case'],
    // Longitud del subject
    'subject-max-length': [2, 'always', 72],
    'subject-min-length': [2, 'always', 10],
    'subject-case': [
      2,
      'always',
      ['sentence-case', 'lower-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    // Type y subject son obligatorios
    'type-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    // Header (primera línea) máximo 100 caracteres
    'header-max-length': [2, 'always', 100],
    // Body opcional pero debe tener línea en blanco después del header
    'body-leading-blank': [2, 'always'],
    'body-max-line-length': [2, 'always', 100],
    // Footer opcional
    'footer-leading-blank': [2, 'always'],
  },
}
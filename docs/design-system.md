# Design System

Ce document décrit les composants et les styles de base utilisés dans l'application Darassa Academy.

## Couleurs

### Primaire
- 50: #eef2ff
- 100: #e0e7ff
- 200: #c7d2fe
- 300: #a5b4fc
- 400: #818cf8
- 500: #6366f1
- 600: #4f46e5
- 700: #4338ca
- 800: #3730a3
- 900: #312e81

### Gris
- 50: #f9fafb
- 100: #f3f4f6
- 200: #e5e7eb
- 300: #d1d5db
- 400: #9ca3af
- 500: #6b7280
- 600: #4b5563
- 700: #374151
- 800: #1f2937
- 900: #111827

### Succès
- 50: #f0fdf4
- 100: #dcfce7
- 200: #bbf7d0
- 300: #86efac
- 400: #4ade80
- 500: #22c55e
- 600: #16a34a
- 700: #15803d
- 800: #166534
- 900: #14532d

### Erreur
- 50: #fef2f2
- 100: #fee2e2
- 200: #fecaca
- 300: #fca5a5
- 400: #f87171
- 500: #ef4444
- 600: #dc2626
- 700: #b91c1c
- 800: #991b1b
- 900: #7f1d1d

## Typographie

### Familles de polices
- Sans-serif: Inter, system-ui
- Serif: Georgia
- Mono: Menlo, Monaco, Courier New

### Tailles de police
- xs: 0.75rem
- sm: 0.875rem
- base: 1rem
- lg: 1.125rem
- xl: 1.25rem
- 2xl: 1.5rem
- 3xl: 1.875rem
- 4xl: 2.25rem
- 5xl: 3rem
- 6xl: 3.75rem

### Poids de police
- thin: 100
- extralight: 200
- light: 300
- normal: 400
- medium: 500
- semibold: 600
- bold: 700
- extrabold: 800
- black: 900

## Composants

### Button
```tsx
<Button
  variant="primary" // 'primary' | 'secondary' | 'outline' | 'ghost'
  size="md" // 'sm' | 'md' | 'lg'
  isLoading={false}
  leftIcon={<Icon />}
  rightIcon={<Icon />}
  fullWidth={false}
>
  Button Text
</Button>
```

### Input
```tsx
<Input
  label="Label"
  error="Error message"
  leftIcon={<Icon />}
  rightIcon={<Icon />}
  fullWidth={false}
  placeholder="Placeholder"
/>
```

### Select
```tsx
<Select
  label="Label"
  error="Error message"
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]}
  leftIcon={<Icon />}
  rightIcon={<Icon />}
  fullWidth={false}
  size="md" // 'sm' | 'md' | 'lg'
/>
```

### Badge
```tsx
<Badge
  variant="primary" // 'primary' | 'secondary' | 'success' | 'error' | 'warning'
  size="md" // 'sm' | 'md' | 'lg'
>
  Badge Text
</Badge>
```

### Card
```tsx
<Card
  padding="md" // 'none' | 'sm' | 'md' | 'lg'
  variant="elevated" // 'elevated' | 'outlined' | 'filled'
>
  <CardHeader>Header Content</CardHeader>
  <CardBody>Body Content</CardBody>
  <CardFooter>Footer Content</CardFooter>
</Card>
```

## Espacement

Les espacements sont basés sur un système de 4px (0.25rem) :

- px: 1px
- 0: 0
- 0.5: 0.125rem
- 1: 0.25rem
- 1.5: 0.375rem
- 2: 0.5rem
- 2.5: 0.625rem
- 3: 0.75rem
- 3.5: 0.875rem
- 4: 1rem
- 5: 1.25rem
- 6: 1.5rem
- 7: 1.75rem
- 8: 2rem
- 9: 2.25rem
- 10: 2.5rem
- 12: 3rem
- 14: 3.5rem
- 16: 4rem
- 20: 5rem
- 24: 6rem
- 28: 7rem
- 32: 8rem
- 36: 9rem
- 40: 10rem
- 44: 11rem
- 48: 12rem
- 52: 13rem
- 56: 14rem
- 60: 15rem
- 64: 16rem
- 72: 18rem
- 80: 20rem
- 96: 24rem

## Breakpoints

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Ombres

- sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- DEFAULT: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
- md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
- lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
- xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
- 2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
- inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)
- none: none 
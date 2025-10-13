# Guía Completa de Markdown

## Índice

1. [Encabezados](#encabezados)
2. [Formato de texto](#formato-de-texto)
3. [Listas](#listas)
4. [Enlaces y referencias](#enlaces-y-referencias)
5. [Imágenes](#imágenes)
6. [Código](#código)
7. [Tablas](#tablas)
8. [Citas](#citas)
9. [Líneas horizontales](#líneas-horizontales)
10. [Texto tachado y subrayado](#texto-tachado-y-subrayado)
11. [Listas de tareas](#listas-de-tareas)
12. [Escapes y caracteres especiales](#escapes-y-caracteres-especiales)

---

## Encabezados

Los encabezados se crean usando el símbolo `#`. Puedes usar de 1 a 6 niveles:

# Encabezado Nivel 1
## Encabezado Nivel 2
### Encabezado Nivel 3
#### Encabezado Nivel 4
##### Encabezado Nivel 5
###### Encabezado Nivel 6

También puedes usar el formato alternativo para los niveles 1 y 2:

Encabezado Alternativo Nivel 1
==============================

Encabezado Alternativo Nivel 2
------------------------------

## Formato de texto

Markdown ofrece varias opciones para formatear texto:

- **Texto en negrita** usando `**texto**` o `__texto__`
- *Texto en cursiva* usando `*texto*` o `_texto_`
- ***Texto en negrita y cursiva*** usando `***texto***`
- `Texto de código inline` usando backticks
- ~~Texto tachado~~ usando `~~texto~~`

También puedes combinar formatos: **Este texto está en *negrita y cursiva* a la vez**.

## Listas

### Listas no ordenadas

Puedes crear listas usando `-`, `*` o `+`:

- Elemento 1
- Elemento 2
  - Subelemento 2.1
  - Subelemento 2.2
    - Subelemento 2.2.1
- Elemento 3

### Listas ordenadas

Las listas numeradas usan números seguidos de un punto:

1. Primer elemento
2. Segundo elemento
   1. Subelemento 2.1
   2. Subelemento 2.2
3. Tercer elemento

### Listas mixtas

También puedes mezclar tipos de lista:

1. Elemento numerado
   - Subelemento con viñeta
   - Otro subelemento
2. Segundo elemento numerado
   * Subelemento con asterisco

## Enlaces y referencias

### Enlaces directos

[Este es un enlace a Google](https://www.google.com)

[Este enlace tiene título](https://www.github.com "GitHub - Donde vive el código")

### Enlaces de referencia

[Este es un enlace de referencia][1]

[También puedes usar texto como referencia][enlace personalizado]

### Enlaces automáticos

<https://www.example.com>

<correo@ejemplo.com>

### URLs y emails automáticos

www.ejemplo.com se convierte automáticamente en enlace en algunos procesadores.

## Imágenes

### Imagen básica
![Texto alternativo](https://via.placeholder.com/300x200/0066CC/FFFFFF?text=Imagen+de+ejemplo)

### Imagen con título
![Otra imagen](https://via.placeholder.com/200x150/FF6600/FFFFFF?text=Con+título "Este es el título de la imagen")

### Imagen de referencia
![Imagen de referencia][imagen-ref]

## Código

### Código inline
Usa `console.log()` para imprimir en JavaScript.

### Bloques de código

Código sin especificar lenguaje:
```
function holaMundo() {
    return "¡Hola, mundo!";
}
```

Código con sintaxis resaltada:

```javascript
function saludar(nombre) {
    if (!nombre) {
        throw new Error("El nombre es requerido");
    }
    return `¡Hola, ${nombre}!`;
}

const mensaje = saludar("Markdown");
console.log(mensaje);
```

```python
def calcular_factorial(n):
    """Calcula el factorial de un número."""
    if n <= 1:
        return 1
    return n * calcular_factorial(n - 1)

# Ejemplo de uso
resultado = calcular_factorial(5)
print(f"5! = {resultado}")
```

```css
.contenedor {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
}

.titulo {
    color: #333;
    border-bottom: 2px solid #0066cc;
    padding-bottom: 10px;
}
```

### Código indentado

También puedes usar indentación de 4 espacios:

    function ejemplo() {
        return "Esto también es código";
    }

## Tablas

| Encabezado 1 | Encabezado 2 | Encabezado 3 |
|--------------|--------------|--------------|
| Celda 1      | Celda 2      | Celda 3      |
| Fila 2       | Datos        | Más datos    |

### Tabla con alineación

| Izquierda | Centrado | Derecha |
|:----------|:--------:|--------:|
| Texto     | Centrado | €123.45 |
| Más texto | Medio    | €67.89  |
| Final     | Centro   | €999.99 |

### Tabla compleja

| Característica | Básico | Premium | Enterprise |
|----------------|--------|---------|------------|
| Usuarios       | 5      | 50      | Ilimitado  |
| Almacenamiento | 1 GB   | 100 GB  | 1 TB       |
| Soporte        | Email  | 24/7    | Dedicado   |
| Precio         | Gratis | €9.99   | €49.99     |

## Citas

### Cita simple
> Esta es una cita en Markdown. Las citas son útiles para destacar texto importante o para citar a otras fuentes.

### Cita anidada
> Esta es una cita de primer nivel.
> 
> > Esta es una cita anidada dentro de la anterior.
> 
> Y volvemos al primer nivel de cita.

### Cita con formato
> **Nota importante:** Las citas pueden contener *cualquier* formato de Markdown, incluyendo:
> 
> - Listas
> - `Código`
> - [Enlaces](https://example.com)
> 
> > Y hasta citas anidadas con formato.

## Líneas horizontales

Puedes crear líneas horizontales de varias maneras:

---

***

___

- - -

## Texto tachado y subrayado

~~Este texto está tachado~~ usando `~~texto~~`.

En algunos procesadores de Markdown extendido también puedes usar:
- ==Texto resaltado== con `==texto==`
- ++Texto subrayado++ con `++texto++`

## Listas de tareas

- [x] Tarea completada
- [ ] Tarea pendiente
- [x] Otra tarea completada
  - [x] Subtarea completada
  - [ ] Subtarea pendiente
- [ ] Tarea final pendiente

## Escapes y caracteres especiales

Para mostrar caracteres especiales de Markdown, usa la barra invertida `\`:

- \*Este asterisco no cursiva el texto\*
- \[Esto no es un enlace\]
- \# Esto no es un encabezado
- \`Esto no es código\`

### Caracteres que requieren escape:

```
\ ` * _ { } [ ] ( ) # + - . !
```

---

## Referencias

[1]: https://www.markdown.org "Sitio oficial de Markdown"
[enlace personalizado]: https://daringfireball.net/projects/markdown/
[imagen-ref]: https://via.placeholder.com/400x200/009900/FFFFFF?text=Imagen+de+referencia

# MANUÁLNĚ PŘIDEJ DO PACKAGE.JSON

Lovable vyžaduje tento script v `package.json`:

```json
{
  "scripts": {
    "build:dev": "vite build --mode development"
  }
}
```

**Způsoby přidání:**

1. **V editoru:** Otevři `package.json` → najdi sekci `"scripts"` → přidej řádek
2. **V terminálu:** Spusť `npm pkg set scripts.build:dev="vite build --mode development"`

Po přidání scriptu bude projekt fungovat s nejnovší Lovable template.
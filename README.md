# Шкала краси

Односторінковий сайт-інфографіка, що візуалізує градацію української лексики
краси — від м'якої «миловидної» до майже неземної «неймовірної». Це візуальний
словник відтінків мови, а не інструмент оцінювання людей.

## Стек

- React 18 + Vite + TypeScript
- Tailwind CSS (кастомна дизайн-система: кольори тірів, шрифти, радіуси)
- Framer Motion (анімації появи, «дихання» акварельних плям)
- Шрифти: Cormorant Garamond (display) + Manrope (body), обидва з Cyrillic subset

## Запуск

```bash
npm i          # встановити залежності
npm run dev    # дев-сервер (http://localhost:5173)
npm run build  # продакшн-збірка в dist/
npm run preview # переглянути продакшн-збірку локально
```

## Структура

```
src/
  components/     # Hero, Intro, SpectrumBar, TierScale, TierCard,
                  # ComparisonGrid, Footer, WatercolorBlob
  data/tiers.ts   # контент шкали (6 тірів)
  App.tsx
  index.css       # Tailwind + CSS-змінні дизайн-системи
```

Контент шкали редагується в одному місці — `src/data/tiers.ts`.

## Деплой

Статичний білд без бекенду — підходить Vercel, Netlify або GitHub Pages
(команда збірки `npm run build`, директорія публікації `dist`).

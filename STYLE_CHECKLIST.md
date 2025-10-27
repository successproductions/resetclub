# Reset Club - Quick Style Reference

## 🎨 Colors

### Main Colors
- **Primary Brown**: `#524029` (text, headings)
- **Dark**: `#2c2c2c` (buttons)
- **Hover**: `#3c3c3c` (button hover)
- **Coral**: `#c26d4c` (accents)
- **Beige**: `#ccbaa8` (backgrounds)
- **Teal**: `#98d1d2` (highlights)

### Backgrounds
- Light: `#f5efe8`
- Soft: `#e4ded5`
- Cards: `bg-gray-50`

---

## 📝 Text Sizes

| Size | Class | Usage |
|------|-------|-------|
| 12px | `text-xs` | Fine print, labels |
| 14px | `text-sm` | Descriptions |
| 16px | `text-base` | Body text |
| 18px | `text-lg` | Emphasis |
| 20px | `text-xl` | Small headings |
| 24px | `text-2xl` | Section headings |
| 30px | `text-3xl` | Major headings |
| 36px | `text-4xl` | Hero titles |
| 48px | `text-5xl` | Large hero |
| 60px | `text-6xl` | Extra large |

### Responsive Patterns
```css
Mobile → Desktop
text-sm md:text-lg          /* Small to large */
text-2xl md:text-4xl        /* Medium heading */
text-3xl md:text-5xl        /* Hero heading */
```

---

## 🔤 Typography

**Fonts:**
- Primary: `font-graphik` (UI, buttons, body)
- Secondary: `font-serif` (elegant headings)

**Common Classes:**
- Headings: `text-[#524029] font-graphik`
- Body: `text-base font-graphik text-[#524029]`

---

## 🔘 Buttons

**Primary:**
```css
bg-[#2c2c2c] hover:bg-[#3c3c3c]
text-white text-lg font-graphik
px-8 py-4
```

**Secondary:**
```css
bg-transparent border border-[#524029]
text-[#524029] hover:text-white
```

---

## 📥 Form Inputs

```css
border border-[#524029]
px-6 py-3 (desktop) | px-4 py-2 (mobile)
text-[#524029] font-graphik
placeholder-gray-400
focus:outline-none focus:border-gray-400
```

---

## 📏 Spacing

**Padding:** `p-4` to `p-6` (mobile) | `p-8` to `p-12` (desktop)
**Margins:** `mb-2 md:mb-4` (small) | `mb-6 md:mb-8` (large)
**Gaps:** `gap-4` to `gap-6`

---

## ✨ Effects

**Transitions:** `duration-300` (standard) | `duration-700` (slow)
**Hover:** `hover:scale-105` `shadow-lg hover:shadow-xl`
**Video/Images:** `blur-sm opacity-40 bg-black/30`

---

## 📱 Key Rules

✓ **No rounded corners** on major elements
✓ **Font**: Graphik (primary), Serif (headings)
✓ **Color**: #524029 for text
✓ **Mobile-first** responsive design

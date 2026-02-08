# Theme Implementation - No Flicker Solution

## Overview
This implementation prevents the "flash of light mode" issue that occurs when the page loads in dark mode by applying the theme immediately before the page renders.

## How It Works

### 1. Inline Theme Script (`ThemeScript.tsx`)
- **Location**: `src/components/providers/ThemeScript.tsx`
- **Purpose**: Executes immediately in the `<head>` before any rendering occurs
- **Key Features**:
  - Reads saved theme from localStorage
  - Falls back to system preference
  - Applies `data-theme` attribute to `<html>` element
  - Adds/removes `.dark` and `.light` classes for Tailwind CSS
  - Listens for system preference changes
  - Prevents FOUC (Flash of Unstyled Content)

### 2. CSS Updates (`globals.css`)
- **Pre-render hiding**: Content is hidden until theme is applied
  ```css
  html:not([data-theme]) {
    visibility: hidden;
  }
  ```
- **Post-theme showing**: Content becomes visible after theme is set
  ```css
  html[data-theme] {
    visibility: visible;
  }
  ```
- **Transition control**: Disables transitions during initial load
  ```css
  html.theme-loading *,
  html.theme-loading *::before,
  html.theme-loading *::after {
    transition: none !important;
  }
  ```

### 3. Layout Integration (`layout.tsx`)
- Adds `ThemeScript` component in `<head>` for immediate execution
- Adds `theme-loading` class to `<body>` initially
- Removes `theme-loading` class after React hydrates

### 4. ThemeProvider Enhancements
- Maintains `.dark` and `.light` classes alongside `data-theme` attribute
- Removes `theme-loading` class after initial render
- Ensures both attribute and class-based theming work together

## Implementation Steps

### Step 1: ThemeScript Component
The inline script runs synchronously before any React rendering:
```javascript
(function() {
  // Read localStorage
  var stored = localStorage.getItem("azm-fintech-theme");
  var theme = stored || "system";
  
  // Apply immediately
  document.documentElement.setAttribute("data-theme", resolvedTheme);
  document.documentElement.classList.add(resolvedTheme);
  
  // Show content
  document.documentElement.style.visibility = "visible";
})();
```

### Step 2: CSS Protection
Hide content until theme is determined:
```css
html:not([data-theme]) {
  visibility: hidden;
}
```

This ensures no content is visible with wrong colors.

### Step 3: React Integration
After React hydrates, remove loading class to enable smooth transitions:
```javascript
requestAnimationFrame(() => {
  document.documentElement.classList.remove("theme-loading");
  document.body.classList.remove("theme-loading");
});
```

## Theme Resolution Priority

1. **User's saved preference** (localStorage)
2. **System preference** (prefers-color-scheme)
3. **Default** (system)

## Browser Compatibility

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ Mobile browsers
- ✅ localStorage available
- ✅ prefers-color-scheme supported

## Performance Impact

- **No additional HTTP requests**: Script is inline
- **No layout shift**: Content hidden until ready
- **Minimal execution time**: Simple synchronous code
- **No hydration mismatches**: Uses `suppressHydrationWarning`

## Testing Checklist

### No Flicker Tests
- [ ] Hard refresh (Ctrl+Shift+R) with dark mode
- [ ] Hard refresh with light mode
- [ ] System theme change with "system" mode
- [ ] Navigate between pages
- [ ] Browser close/reopen

### Theme Persistence Tests
- [ ] Select dark mode → refresh → still dark
- [ ] Select light mode → refresh → still light
- [ ] Select system mode → change OS theme → updates

### Transition Tests
- [ ] Initial load: no animations (theme-loading)
- [ ] After load: smooth theme switch
- [ ] Manual toggle: smooth transition
- [ ] System change: smooth transition

## Customization

### Change Storage Key
```tsx
<ThemeScript storageKey="your-custom-key" />
```

### Change Default Theme
```tsx
<ThemeScript defaultTheme="dark" />
```

### Modify Transition Timing
```css
/* In globals.css */
html.theme-loading * {
  transition: none !important;
}
```

## Troubleshooting

### Still seeing flicker?
1. Check browser console for localStorage errors
2. Verify `ThemeScript` is in `<head>`
3. Ensure CSS rule `html:not([data-theme])` exists
4. Check for competing CSS that sets visibility

### Theme not persisting?
1. Check localStorage quota
2. Verify storage key matches between script and provider
3. Check browser privacy settings

### Transitions not working?
1. Verify `theme-loading` class is removed
2. Check for CSS specificity issues
3. Ensure no `!important` overriding transitions

## Related Files

- `src/components/providers/ThemeScript.tsx` - Inline theme script
- `src/components/providers/ThemeProvider.tsx` - React theme provider
- `src/app/globals.css` - Theme CSS
- `src/app/[locale]/layout.tsx` - Layout integration
- `src/components/ui/ThemeToggle.tsx` - Theme toggle button

## Best Practices

1. **Always use ThemeScript in `<head>`**: Ensures early execution
2. **Keep theme script simple**: Avoid complex logic that delays execution
3. **Use both data-theme and classes**: Maximum compatibility
4. **Remove theme-loading class**: Enable transitions after initial load
5. **Test across browsers**: Different browsers handle localStorage differently
6. **Handle localStorage errors**: Fallback to system/default if unavailable

## Future Enhancements

- [ ] Add cookie-based fallback for private browsing
- [ ] Add theme preference sync across tabs
- [ ] Add animation preference (disable transitions permanently)
- [ ] Add custom theme support
- [ ] Add theme analytics tracking

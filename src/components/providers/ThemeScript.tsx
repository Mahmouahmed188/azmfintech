interface ThemeScriptProps {
  storageKey?: string;
  defaultTheme?: "light" | "dark" | "system";
}

export function ThemeScript({
  storageKey = "azm-fintech-theme",
  defaultTheme = "system",
}: ThemeScriptProps) {
  const code = `
    (function() {
      try {
        var storageKey = "${storageKey}";
        var defaultTheme = "${defaultTheme}";
        
        function getSystemTheme() {
          return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        }
        
        function getTheme() {
          try {
            var stored = localStorage.getItem(storageKey);
            if (stored) return stored;
          } catch (e) {
            console.warn("Failed to read theme from localStorage:", e);
          }
          return defaultTheme;
        }
        
        function applyTheme(theme) {
          var resolvedTheme = theme === "system" ? getSystemTheme() : theme;
          
          if (resolvedTheme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
          } else {
            document.documentElement.setAttribute("data-theme", "light");
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
          }
        }
        
        // Apply theme immediately
        var theme = getTheme();
        applyTheme(theme);
        
        // Listen for system preference changes
        if (theme === "system") {
          var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
          var handleSystemChange = function() {
            applyTheme("system");
          };
          mediaQuery.addEventListener("change", handleSystemChange);
        }
        
        // Prevent flash of unstyled content
        document.documentElement.style.visibility = "visible";
      } catch (e) {
        console.error("Error applying theme:", e);
        // Fallback to light mode if anything fails
        document.documentElement.setAttribute("data-theme", "light");
        document.documentElement.style.visibility = "visible";
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: code }}
      suppressHydrationWarning
    />
  );
}

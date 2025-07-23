
document.addEventListener("DOMContentLoaded", function () {
  // Sauvegarde et restauration des textarea
  const textareas = document.querySelectorAll("textarea");
  textareas.forEach((textarea, index) => {
    const key = "textarea_" + index;
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      textarea.value = saved;
    }
    textarea.addEventListener("input", () => {
      localStorage.setItem(key, textarea.value);
    });
  });

  // Sauvegarde et restauration des cases à cocher
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox, index) => {
    const key = "checkbox_" + index;
    const checked = localStorage.getItem(key);
    if (checked !== null) {
      checkbox.checked = checked === "true";
    }
    checkbox.addEventListener("change", () => {
      localStorage.setItem(key, checkbox.checked);
    });
  });
});

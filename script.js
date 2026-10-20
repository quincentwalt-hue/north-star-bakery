/* North Star Bakery — Touchstone 4 client-side interactivity */
"use strict";

const CATEGORY_STORAGE_KEY = "northStarBakery.selectedCategory";

/* Two arrays of objects organize category and product information. */
const productCategories = [
  { id: "all", label: "all products" },
  { id: "breads", label: "breads" },
  { id: "pastries", label: "pastries" },
  { id: "cakes", label: "cakes" }
];

const bakeryProducts = [
  { name: "Breads", category: "breads", description: "Rustic artisan loaves." },
  { name: "Pastries", category: "pastries", description: "Croissants, danishes, and muffins." },
  { name: "Cakes and celebration bakes", category: "cakes", description: "Custom cakes for special gatherings." }
];

function getSavedCategory() {
  try {
    const saved = localStorage.getItem(CATEGORY_STORAGE_KEY);
    return productCategories.some(category => category.id === saved) ? saved : "all";
  } catch (error) {
    return "all";
  }
}

function saveCategory(category) {
  try {
    localStorage.setItem(CATEGORY_STORAGE_KEY, category);
  } catch (error) {
    // Filtering still works if browser storage is unavailable.
  }
}

function updateProductFilter(categoryId) {
  const cards = document.querySelectorAll("#product-grid [data-category]");
  const status = document.getElementById("filter-status");
  const chosenCategory = productCategories.find(category => category.id === categoryId) || productCategories[0];
  let visibleCount = 0;

  cards.forEach(card => {
    const shouldShow = categoryId === "all" || card.dataset.category === categoryId;
    card.hidden = !shouldShow;
    if (shouldShow) visibleCount += 1;
  });

  document.querySelectorAll("[data-filter]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === categoryId));
  });

  if (status) {
    status.textContent = "Showing " + chosenCategory.label + " (" + visibleCount + " categories).";
  }
}

function initializeProductFilter() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  if (!filterButtons.length) return;

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;
      updateProductFilter(selectedCategory);
      saveCategory(selectedCategory);
    });
  });

  updateProductFilter(getSavedCategory());
}

function setFieldError(field, message) {
  const errorElement = document.getElementById(field.id + "-error");
  field.setAttribute("aria-invalid", String(Boolean(message)));
  if (errorElement) errorElement.textContent = message;
}

function validateField(field) {
  const value = field.value.trim();
  let message = "";

  if (field.required && !value) {
    message = "Please complete this required field.";
  } else if (field.id === "name" && value.length < 2) {
    message = "Please enter your name using at least 2 characters.";
  } else if (field.id === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    message = "Enter a valid email address, such as name@example.com.";
  } else if (field.id === "pickup-date" && value) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pickedDate = new Date(value + "T00:00:00");
    if (pickedDate < today) message = "Choose today or a future pickup date.";
  } else if (field.id === "item-details" && value.length < 10) {
    message = "Please provide at least 10 characters describing your request.";
  }

  setFieldError(field, message);
  return !message;
}

function initializeFormValidation() {
  const form = document.getElementById("preorder-form");
  if (!form) return;

  const fields = Array.from(form.querySelectorAll("input[required], select[required], textarea[required]"));
  const status = document.getElementById("form-status");
  const pickupDate = document.getElementById("pickup-date");

  if (pickupDate) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    pickupDate.min = localToday;
  }

  fields.forEach(field => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
    field.addEventListener("change", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    const results = fields.map(validateField);
    const firstInvalidField = fields.find((field, index) => !results[index]);

    if (firstInvalidField) {
      if (status) {
        status.hidden = false;
        status.textContent = "Please correct the highlighted fields before continuing.";
      }
      firstInvalidField.focus();
      return;
    }

    if (status) {
      status.hidden = false;
      status.textContent = "Your entries passed validation. This demonstration form does not send an order because a form-processing service is not connected.";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeProductFilter();
  initializeFormValidation();
});

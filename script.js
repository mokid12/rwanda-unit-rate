document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // 1) Login form validation
  // =========================
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const messageBox = document.getElementById("loginMessage");

      const result = auth.login(email, password);

      messageBox.textContent = result.message;
      messageBox.style.color = result.success ? "#0a7a5a" : "#b42318";

      if (result.success) {
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1200);
      }
    });
  }

  // =========================
  // 2) Signup form validation
  // =========================
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const fullname = document.getElementById("fullname").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value.trim();
      const messageBox = document.getElementById("signupMessage");

      const result = auth.register(fullname, email, password);

      messageBox.textContent = result.message;
      messageBox.style.color = result.success ? "#0a7a5a" : "#b42318";

      if (result.success) {
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1200);
      }
    });
  }

  // =========================
  // 3) Currency converter
  // =========================
  const currencyForm = document.getElementById("currencyForm");
  if (currencyForm) {
    const rates = {
      RWF: 1,
      USD: 1260,
      EUR: 1370,
      GBP: 1560,
    };

    const amountInput = document.getElementById("amount");
    const fromSelect = document.getElementById("from");
    const toSelect = document.getElementById("to");
    const resultText = document.getElementById("resultText");

    const formatMoney = (value) => {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    };

    function convertCurrency() {
      const amount = Number(amountInput.value) || 0;
      const from = fromSelect.value;
      const to = toSelect.value;

      if (from === to) {
        resultText.textContent = `${formatMoney(amount)} ${to}`;
        return;
      }

      const converted = (amount / rates[from]) * rates[to];
      resultText.textContent = `${formatMoney(converted)} ${to}`;
    }

    amountInput.addEventListener("input", convertCurrency);
    fromSelect.addEventListener("change", convertCurrency);
    toSelect.addEventListener("change", convertCurrency);

    convertCurrency();
  }

  // =========================
  // 4) Province / district filter
  // =========================
  const provinceFilter = document.getElementById("provinceFilter");
  const districtFilter = document.getElementById("districtFilter");
  const materialFilter = document.getElementById("materialFilter");
  const searchInput = document.getElementById("searchInput");
  const tableRows = document.querySelectorAll("#rateTableBody tr");

  if (provinceFilter && districtFilter && materialFilter && searchInput) {
    function applyFilters() {
      const selectedProvince = provinceFilter.value;
      const selectedDistrict = districtFilter.value;
      const selectedMaterial = materialFilter.value;
      const searchText = searchInput.value.trim().toLowerCase();

      tableRows.forEach((row) => {
        const province = row.dataset.province.toLowerCase();
        const district = row.dataset.district.toLowerCase();
        const material = row.dataset.material.toLowerCase();

        const matchesProvince =
          selectedProvince === "all" || province === selectedProvince.toLowerCase();
        const matchesDistrict =
          selectedDistrict === "all" ||
          district === selectedDistrict.toLowerCase();
        const matchesMaterial =
          selectedMaterial === "all" ||
          material === selectedMaterial.toLowerCase();
        const matchesSearch =
          !searchText ||
          province.includes(searchText) ||
          district.includes(searchText) ||
          material.includes(searchText);

        if (matchesProvince && matchesDistrict && matchesMaterial && matchesSearch) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    }

    provinceFilter.addEventListener("change", applyFilters);
    districtFilter.addEventListener("change", applyFilters);
    materialFilter.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);
  }

  // =========================
  // 5) Admin form and saved rates
  // =========================
  const adminForm = document.getElementById("adminForm");

  if (adminForm) {
    // Protect admin page - require login
    if (!protectRoute("login.html")) return;

    const tableBody = document.getElementById("adminTableBody");

    function getSavedRates() {
      const savedRates = localStorage.getItem("rwandaUnitRates");
      return !savedRates ? [] : JSON.parse(savedRates);
    }

    function saveRates(rates) {
      localStorage.setItem("rwandaUnitRates", JSON.stringify(rates));
    }

    function createRateRow(rateData) {
      const newRow = document.createElement("tr");

      const provinceCell = document.createElement("td");
      provinceCell.textContent = rateData.province;

      const districtCell = document.createElement("td");
      districtCell.textContent = rateData.district;

      const materialCell = document.createElement("td");
      materialCell.textContent = rateData.material;

      const unitCell = document.createElement("td");
      unitCell.textContent = rateData.unit;

      const rateCell = document.createElement("td");
      rateCell.textContent = `${Number(rateData.rate).toLocaleString()} ${rateData.currency}`;

      const statusCell = document.createElement("td");
      const statusBadge = document.createElement("span");
      statusBadge.textContent = rateData.status || "Pending";
      statusBadge.className = `status ${(rateData.status || "pending").toLowerCase()}`;
      statusCell.appendChild(statusBadge);

      newRow.appendChild(provinceCell);
      newRow.appendChild(districtCell);
      newRow.appendChild(materialCell);
      newRow.appendChild(unitCell);
      newRow.appendChild(rateCell);
      newRow.appendChild(statusCell);

      return newRow;
    }

    function displaySavedRates() {
      const savedRates = getSavedRates();
      savedRates.reverse().forEach((rateData) => {
        const row = createRateRow(rateData);
        tableBody.prepend(row);
      });
    }

    adminForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const province = document.getElementById("province").value;
      const district = document.getElementById("district").value;
      const material = document.getElementById("material").value.trim();
      const unit = document.getElementById("unit").value;
      const rate = document.getElementById("rate").value;
      const currency = document.getElementById("currency").value;
      const status = document.getElementById("status").value;

      if (!material || !unit || !rate) {
        alert("Please complete all fields.");
        return;
      }

      const newRate = {
        province,
        district,
        material,
        unit,
        rate,
        currency,
        status,
      };

      const savedRates = getSavedRates();
      savedRates.push(newRate);
      saveRates(savedRates);

      const newRow = createRateRow(newRate);
      tableBody.prepend(newRow);

      adminForm.reset();
      alert("Rate saved successfully.");
    });

    displaySavedRates();
  }

  // =========================
  // 6) Protect dashboard button
  // =========================
  const dashboardBtn = document.getElementById("dashboardBtn");

  if (dashboardBtn) {
    dashboardBtn.addEventListener("click", (e) => {
      if (!auth.isLoggedIn()) {
        e.preventDefault();
        window.location.href = "login.html";
      }
    });
  }

  // =========================
  // 7) Protect dashboard page
  // =========================
  const dashboardPage = document.querySelector(".dashboard-page");
  if (dashboardPage) {
    protectRoute("login.html");
  }

  // =========================
  // 8) CTA Buttons
  // =========================
  const ctaButtons = document.querySelectorAll(".cta-buttons .btn-primary");
  ctaButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!auth.isLoggedIn()) {
        window.location.href = "signup.html";
      } else {
        window.location.href = "dashboard.html";
      }
    });
  });

  // =========================
  // 9) Rate Card Hover Effects
  // =========================
  document.querySelectorAll(".rate-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.cursor = "pointer";
    });

    card.addEventListener("click", function () {
      window.location.href = "dashboard.html";
    });
  });

  // =========================
  // 10) Province Card Effects
  // =========================
  document.querySelectorAll(".province-card").forEach((card) => {
    card.addEventListener("click", function () {
      window.location.href = "province.html";
    });
  });
});

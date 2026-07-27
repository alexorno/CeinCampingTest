# CeinCamping E2E Automation Framework

An End-to-End (E2E) test automation suite built for the [CeinCamping](https://cein-camping.vercel.app) web application using **Playwright**, **TypeScript**, and the **Page Object Model (POM)** design pattern. Features automated CI/CD pipeline integration with **GitHub Actions** and **Vercel Preview Deployments**.

## Tech Stack
- **Language:** TypeScript
- **Framework:** Playwright
- **Design Pattern:** Page Object Model (POM)
- **Data Generation:** `@faker-js/faker`
- **CI/CD:** GitHub Actions (Cross-repository dispatch on Vercel preview builds)

---

## Framework Architecture & Highlights
- **Page Object Model (POM):** UI locators and action methods are isolated inside dedicated page classes (`DashboardPage.ts`, `ProductsPage.ts`), ensuring test specs contain zero selector clutter.
- **Session Authentication Reuse:** Utilizes Playwright's `setup` project dependency to log in once, save the session state (`storageState`), and automatically reuse credentials across tests.
- **Dynamic File Uploads:** Downloaded dynamic test images and assets are managed securely within the local `test-data/` directory during test runs.
- **Cross-Repo CI/CD:** Automatically triggers E2E test runs against dynamic Vercel Preview URLs whenever a pull request or commit occurs on the main website repository.

---

## Project Structure

```text
├── .github/
│   └── workflows/
│       └── playwright.yml      # CI/CD pipeline workflow
├── test-data/                  # Folder for temp-files (like images)
├── pages/
│   ├── DashboardPage.ts        # POM class for dashboard locators & methods
│   └── ProductsPage.ts         # POM class for products locators & methods
├── tests/
│   ├── auth.spec.ts            # Authentication setup spec
│   └── login.spec.ts           # Core product creation and control tests
├── .env.example                # Local environment variable template
├── playwright.config.ts        # Playwright configuration & project setups
└── package.json

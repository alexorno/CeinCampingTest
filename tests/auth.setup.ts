import { test as setup, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import path = require("node:path");


const authDir = path.resolve(__dirname, '../playwright/.auth');
const authFile = path.join(authDir, 'user.json');

setup('remember authenticate user', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.gotoDashboard();
    await dashboardPage.login("123", "123");

    // Verifing login succeeded before saving the session
    await expect(page.locator('form.admin-login:nth-child(1) input[name="file"]')).toBeVisible();


    // if (!fs.existsSync(authDir)) {
    //     fs.mkdirSync(authDir, { recursive: true });
    // }
    // Saving cookies
    await page.context().storageState({ path: authFile });
});
import {test} from "@playwright/test";
import {DashboardPage} from "../pages/DashboardPage";


test('successfully added item', async ({page}) => {
    const {faker} = await import('@faker-js/faker');
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.gotoDashboard();
    const randomName = faker.image.url({width:1000, height:500})
    console.log(randomName)
    await dashboardPage.addProduct(
       String(faker.image.url({width:1000, height:500})),
        String(faker.commerce.productName()),
        String(faker.commerce.productDescription()),
        'blue',
        String(faker.commerce.productMaterial()),
        (faker.number.int({min:1, max:20})),
        '123x884x12cm',
        Number((faker.commerce.price({min: 10, max: 500}))),
        'Fire',
        'Summer',
        );

    const successMessageLocator = page.locator('form.admin-login:nth-child(1) p:last-child')
    await successMessageLocator.waitFor({ state: 'visible', timeout:10000})
    const text = await successMessageLocator.textContent();

    if (!text || text.trim() === '') {
        throw new Error('Test Failed: The success message paragraph <p> is empty!');
    }

    console.log(`Success message received: ${text}`);
})


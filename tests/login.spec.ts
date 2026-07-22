import {expect, Locator, test} from "@playwright/test";
import {DashboardPage} from "../pages/DashboardPage";
import {ProductsPage} from "../pages/ProductsPage";

test.describe.configure({mode: 'serial'})
let product: {
    imageUrl: string;
    name: string;
    description: string;
    color: string;
    material: string;
    occupcapacity: number;
    dimensions: string;
    price: number;
    category: string;
    season: string;
};

test('Successfully added item', async ({page}) => {
    const {faker} = await import('@faker-js/faker');
    const dashboardPage = new DashboardPage(page);
    product = {
        imageUrl: faker.image.url({ width: 1000, height: 500 }),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        color: 'blue',
        material: faker.commerce.productMaterial(),
        occupcapacity: faker.number.int({ min: 1, max: 20 }),
        dimensions: '123x884x12cm',
        price: Number(faker.commerce.price({ min: 10, max: 500 })),
        category: 'Fire',
        season: 'Summer',
    };
    await dashboardPage.gotoDashboard();
    await dashboardPage.addProduct(product);

    const successMessageLocator:Locator = page.locator('form.admin-login:nth-child(1) p:last-child')
    const successText:boolean = await expect(successMessageLocator).toBeVisible({timeout: 5000})
        .then(()=> true)
        .catch(() => false)
    const successMessage:string = await successMessageLocator.textContent();

    if (!successText) {
        expect(successText, 'Success message did not appear; Message contained: ' + successMessage).toBe(true)
    }
})

// test('Successfully changed sort option', async({page}) => {
//     const productsPage = new ProductsPage(page);
//
//     await productsPage.gotoProductsPage()
//     const sortOption = 'descDate';
//     await productsPage.setSort(sortOption)
//
//     console.log("changed to ", sortOption, " successfully")
//     })

test('Added product is shown successfully across 3 last added products on products page', async({page}) => {
    const productsPage = new ProductsPage(page);
    await productsPage.gotoProductsPage();
    expect(await productsPage.checkLastThreeProductPresent(product), `Product '${product.name}' was not found in 3 last added products`).toBe(true)
})
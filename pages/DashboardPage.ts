import { Locator, Page} from '@playwright/test';
import path = require("path");
import * as fs from "node:fs";

export class DashboardPage {
    readonly page: Page;
    readonly userInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly imageUpload: Locator;
    readonly name: Locator;
    readonly descriptionInput: Locator;
    readonly seasonsSelect: Locator;
    readonly price: Locator;
    readonly colorSelect: Locator;
    readonly material: Locator;
    readonly occupcapacitySelect: Locator;
    readonly dimensions: Locator;
    readonly categorySelect: Locator;
    readonly submitAddedProduct: Locator;


    constructor(page: Page){
        this.page = page;
        this.userInput = page.getByLabel('username')
        this.passwordInput = page.getByLabel('password')
        this.submitButton = page.locator('input[type="submit"]')
        this.imageUpload = page.locator(`form.admin-login:nth-child(1) input[name="file"]`)
        this.name = page.locator('input[name="name"]')
        this.descriptionInput = page.locator('form.admin-login:nth-child(1) textarea[name="description"]')
        this.colorSelect = page.locator('form.admin-login:nth-child(1) select[name="color"]')
        this.material = page.locator('input[name="material"]')
        this.occupcapacitySelect = page.locator('input[name="occupcapacity"]')
        this.dimensions = page.locator('input[name="dimensions"]')
        this.price = page.locator('input[name="price"]')
        this.categorySelect = page.locator('select[name="categoryId"]')
        this.seasonsSelect = page.locator('select[name="seasons"]')
        this.submitAddedProduct = page.locator('body > div:nth-child(2) > form:nth-child(1) > input[type="submit"]:nth-child(24)');

    }

    async gotoDashboard(){
        await this.page.goto('https://cein-camping.vercel.app/dashboard')
    }

    async login(email: string, password: string){
        await this.userInput.fill(email)
        await this.passwordInput.fill(password)
        await this.submitButton.click();
    }


    async addProduct(fileName: string, name: string, description: string, color: string, material: string,occupcapacity: number, dimensions:string, price: number, categories:string, seasons: string){

        const downloadAndUploadImage = async (page, imageUrl, fileInputLocator) => {
            const localPath = path.resolve(__dirname, '../test-data/temp-image.jpg');

            // 1. Download the image
            const response = await fetch(imageUrl);
            const buffer = Buffer.from(await response.arrayBuffer());
            fs.writeFileSync(localPath, buffer);
            // 2. Upload using the passed Locator
            await fileInputLocator.waitFor({state: 'attached' })
            await fileInputLocator.setInputFiles(localPath);
        };

        await downloadAndUploadImage(this.page, fileName, this.imageUpload);
        await this.name.fill(name);
        await this.descriptionInput.fill(description);
        await this.colorSelect.waitFor()
        await this.colorSelect.selectOption({label: color});
        await this.material.fill(material);
        await this.occupcapacitySelect.fill(String(occupcapacity));
        await this.dimensions.fill(dimensions);
        await this.price.fill(String(price));
        await this.categorySelect.selectOption({label: categories});
        await this.seasonsSelect.selectOption({label: seasons});
        await this.submitAddedProduct.click();
    }
}
